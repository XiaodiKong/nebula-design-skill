import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(
  await readFile(path.join(root, "assets/theme-registry.json"), "utf8")
);
const expectedThemes = registry.themes.map((theme) => theme.id);
const errors = [];

const extractAttribute = (tag, attribute) =>
  tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"))?.[1] ?? null;

for (const relativePath of ["demo/index.html", "demo/marketing.html"]) {
  const html = await readFile(path.join(root, relativePath), "utf8");
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const defaultTheme = extractAttribute(htmlTag, "data-theme");
  if (defaultTheme !== registry.defaultTheme) {
    errors.push(`${relativePath}: data-theme must be ${registry.defaultTheme}`);
  }
  if (!/lang=["']zh-CN["']/i.test(htmlTag)) errors.push(`${relativePath}: missing zh-CN lang`);
  if (!/<meta\b[^>]*name=["']viewport["']/i.test(html)) {
    errors.push(`${relativePath}: missing viewport meta`);
  }
  if (!/<main\b/i.test(html)) errors.push(`${relativePath}: missing main landmark`);
  if (!/<h1\b/i.test(html)) errors.push(`${relativePath}: missing h1`);
  if (!/prefers-reduced-motion/.test(html)) {
    errors.push(`${relativePath}: missing reduced-motion handling`);
  }
  if (/<script\b[^>]*\bsrc=/i.test(html)) errors.push(`${relativePath}: external script found`);
  if (/<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=/i.test(html)) {
    errors.push(`${relativePath}: external stylesheet found`);
  }
  if (/<img\b[^>]*\bsrc=["']https?:/i.test(html)) {
    errors.push(`${relativePath}: external image found`);
  }
  if (/\son[a-z]+=["']/i.test(html)) errors.push(`${relativePath}: inline event handler found`);

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) {
    errors.push(`${relativePath}: duplicate ids ${duplicateIds.join(", ")}`);
  }
  const idSet = new Set(ids);
  for (const match of html.matchAll(/\bhref=["']#([^"']+)["']/gi)) {
    if (match[1] && !match[1].includes("${") && !idSet.has(match[1])) {
      errors.push(`${relativePath}: missing anchor target #${match[1]}`);
    }
  }

  const selectorId = relativePath.endsWith("index.html") ? "themeSwitcher" : "theme-select";
  const selectPattern = new RegExp(
    `<select\\b[^>]*id=["']${selectorId}["'][^>]*>([\\s\\S]*?)<\\/select>`,
    "i"
  );
  const selectBody = html.match(selectPattern)?.[1] ?? "";
  const optionThemes = [...selectBody.matchAll(/<option\b[^>]*value=["']([^"']+)["']/gi)].map(
    (match) => match[1]
  );
  if (JSON.stringify(optionThemes) !== JSON.stringify(expectedThemes)) {
    errors.push(`${relativePath}: theme selector is out of registry order`);
  }
  for (const themeId of expectedThemes) {
    if (!html.includes(`data-theme="${themeId}"`)) {
      errors.push(`${relativePath}: missing CSS selector for theme ${themeId}`);
    }
  }

  const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [index, match] of inlineScripts.entries()) {
    try {
      new Function(match[1]);
    } catch (error) {
      errors.push(`${relativePath}: script ${index + 1} does not parse (${error.message})`);
    }
  }

  const inlineStyles = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)];
  for (const [index, match] of inlineStyles.entries()) {
    const css = match[1].replace(/\/\*[\s\S]*?\*\//g, "");
    const openingBraces = (css.match(/{/g) ?? []).length;
    const closingBraces = (css.match(/}/g) ?? []).length;
    if (openingBraces !== closingBraces) {
      errors.push(`${relativePath}: style ${index + 1} has unbalanced braces`);
    }
  }

  console.log(
    `✓ ${relativePath}: ${ids.length} ids, ${inlineStyles.length} style(s), ${inlineScripts.length} script(s)`
  );
}

if (errors.length) {
  console.error(`\nDemo validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `\nDemo validation passed for ${expectedThemes.length} registered themes.`
  );
}
