import { access, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const relativeDirectory = process.argv[2] ?? "demo/aurasearch";
const directory = path.resolve(root, relativeDirectory);
const requiredFiles = ["index.html", "styles.css", "app.js"];
const errors = [];

const files = Object.fromEntries(
  await Promise.all(
    requiredFiles.map(async (file) => {
      try {
        return [file, await readFile(path.join(directory, file), "utf8")];
      } catch (error) {
        errors.push(`${relativeDirectory}/${file}: ${error.code === "ENOENT" ? "missing" : error.message}`);
        return [file, ""];
      }
    })
  )
);

const html = files["index.html"];
const css = files["styles.css"];
const javascript = files["app.js"];

const requirePattern = (source, pattern, message) => {
  if (!pattern.test(source)) errors.push(message);
};

requirePattern(html, /<html\b[^>]*lang=["']zh-CN["']/i, "index.html: missing zh-CN language");
requirePattern(html, /<meta\b[^>]*name=["']viewport["']/i, "index.html: missing viewport meta");
requirePattern(html, /<main\b[^>]*id=["']app-content["']/i, "index.html: missing app-content main landmark");
requirePattern(html, /href=["']\.\/styles\.css["']/i, "index.html: styles.css is not linked locally");
requirePattern(html, /src=["']\.\/app\.js["']/i, "index.html: app.js is not linked locally");
requirePattern(css, /html\[data-mode=["']dark["']\]/, "styles.css: missing dark mode selectors");
requirePattern(css, /prefers-reduced-motion/, "styles.css: missing reduced-motion handling");
for (const breakpoint of ["1240px", "1024px", "768px", "520px"]) {
  requirePattern(css, new RegExp(`max-width:\\s*${breakpoint.replace("px", "px")}`), `styles.css: missing ${breakpoint} breakpoint`);
}
for (const route of ["dashboard", "prompts", "competitors", "reports", "settings"]) {
  requirePattern(javascript, new RegExp(`\\b${route}\\b`), `app.js: missing ${route} route`);
}

if (/\son[a-z]+=["']/i.test(html)) errors.push("index.html: inline event handler found");
if (/<script\b[^>]*src=["']https?:/i.test(html)) errors.push("index.html: external script found");
if (/<link\b[^>]*href=["']https?:/i.test(html)) errors.push("index.html: external stylesheet found");
if (/(?:@import\s+|url\()["']?https?:/i.test(css)) errors.push("styles.css: external dependency found");
if (/\b(?:fetch|import)\s*\(\s*["']https?:/i.test(javascript)) errors.push("app.js: external runtime dependency found");
if (/https?:\/\/(?:www\.)?figma\.com\/api\/mcp\/asset/i.test(`${html}\n${css}\n${javascript}`)) {
  errors.push("standalone source: temporary Figma asset URL found");
}

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) errors.push(`index.html: duplicate ids ${duplicateIds.join(", ")}`);

try {
  new Function(javascript);
} catch (error) {
  errors.push(`app.js: syntax error (${error.message})`);
}

const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, "");
const openingBraces = (cleanCss.match(/{/g) ?? []).length;
const closingBraces = (cleanCss.match(/}/g) ?? []).length;
if (openingBraces !== closingBraces) {
  errors.push(`styles.css: unbalanced braces (${openingBraces} opening, ${closingBraces} closing)`);
}

const directAssetPaths = [
  ...`${html}\n${css}\n${javascript}`.matchAll(/(?:src=|url\()["']?(\.\/assets\/[^"')\s]+)/gi),
]
  .map((match) => match[1])
  .filter((assetPath) => !assetPath.includes("${"));
const iconAssetPaths = [
  ...javascript.matchAll(/\bicon\s*:\s*["']([^"']+)["']/g),
  ...javascript.matchAll(/\bicon\(\s*["']([^"']+)["']/g),
].map((match) => `./assets/${match[1]}.svg`);
directAssetPaths.push(...iconAssetPaths);
for (const assetPath of new Set(directAssetPaths)) {
  try {
    await access(path.resolve(directory, assetPath));
  } catch {
    errors.push(`${assetPath}: referenced asset is missing`);
  }
}

let assetFiles = [];
try {
  assetFiles = await readdir(path.join(directory, "assets"));
} catch {
  errors.push(`${relativeDirectory}/assets: missing asset directory`);
}
if (assetFiles.length < 10) errors.push(`${relativeDirectory}/assets: expected a local design asset set`);

if (errors.length) {
  console.error(`Standalone demo validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Standalone demo valid: ${relativeDirectory}, ${ids.length} ids, ${assetFiles.length} local assets, light/dark and 4 responsive breakpoints.`
  );
}
