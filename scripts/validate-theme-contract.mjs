import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "assets/theme-registry.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const errors = [];

const requiredThemeTokens = [
  "--admin-theme-name",
  "--admin-font-body",
  "--admin-font-display",
  "--admin-font-mono",
  "--admin-color-primary",
  "--admin-color-primary-hover",
  "--admin-color-primary-subtle",
  "--admin-color-on-primary",
  "--admin-color-ai",
  "--admin-color-ai-subtle",
  "--admin-color-text",
  "--admin-color-text-secondary",
  "--admin-color-text-muted",
  "--admin-color-text-disabled",
  "--admin-color-bg-page",
  "--admin-color-bg-surface",
  "--admin-color-bg-hover",
  "--admin-color-bg-elevated",
  "--admin-color-border",
  "--admin-color-border-strong",
  "--admin-color-success",
  "--admin-color-success-subtle",
  "--admin-color-warning",
  "--admin-color-warning-subtle",
  "--admin-color-danger",
  "--admin-color-danger-subtle",
  "--admin-diagram-grid",
  "--admin-diagram-group-bg",
  "--admin-diagram-edge",
  "--admin-focus-ring"
];

const requiredSemanticTokens = [
  "--nebula-ui-page",
  "--nebula-ui-surface",
  "--nebula-ui-border",
  "--nebula-ui-text",
  "--nebula-action-primary",
  "--nebula-selection-border",
  "--nebula-selection-bg",
  "--nebula-selection-ring",
  "--nebula-state-running",
  "--nebula-state-success",
  "--nebula-state-warning",
  "--nebula-state-error",
  "--nebula-state-paused",
  "--nebula-state-disabled",
  "--nebula-ai",
  "--nebula-node-fill",
  "--nebula-node-border-selected",
  "--nebula-edge",
  "--nebula-data-series-1",
  "--nebula-data-series-6"
];

const readProjectFile = async (relativePath, context) => {
  try {
    return await readFile(path.join(root, relativePath), "utf8");
  } catch {
    errors.push(`${context}: missing ${relativePath}`);
    return "";
  }
};

if (registry.schemaVersion !== 1) errors.push("registry: schemaVersion must be 1");
if (!Array.isArray(registry.themes) || registry.themes.length === 0) {
  errors.push("registry: themes must be a non-empty array");
}

const themeIds = registry.themes.map((theme) => theme.id);
if (new Set(themeIds).size !== themeIds.length) errors.push("registry: duplicate theme id");
if (!themeIds.includes(registry.defaultTheme)) errors.push("registry: defaultTheme is not registered");

for (const theme of registry.themes) {
  for (const field of [
    "id",
    "label",
    "colorScheme",
    "tokens",
    "productReference",
    "marketingReference"
  ]) {
    if (!theme[field]) errors.push(`${theme.id || "unknown theme"}: missing ${field}`);
  }
  if (!["light", "dark"].includes(theme.colorScheme)) {
    errors.push(`${theme.id}: colorScheme must be light or dark`);
  }

  const css = await readProjectFile(theme.tokens, theme.id);
  await readProjectFile(theme.productReference, theme.id);
  await readProjectFile(theme.marketingReference, theme.id);
  for (const token of requiredThemeTokens) {
    if (!css.includes(`${token}:`)) errors.push(`${theme.id}: missing ${token}`);
  }
  if (!new RegExp(`color-scheme:\\s*${theme.colorScheme}\\s*;`).test(css)) {
    errors.push(`${theme.id}: color-scheme does not match registry`);
  }
  if (!new RegExp(`--admin-theme-name:\\s*["']${theme.id}["']\\s*;`).test(css)) {
    errors.push(`${theme.id}: --admin-theme-name does not match registry id`);
  }

  if (css) console.log(`✓ ${theme.id}: theme contract`);
}

const semanticCss = await readProjectFile(
  registry.semanticStateTokens,
  "semantic state tokens"
);
for (const token of requiredSemanticTokens) {
  if (!semanticCss.includes(`${token}:`)) errors.push(`semantic tokens: missing ${token}`);
}

const diagramCss = await readProjectFile("assets/diagram-tokens.css", "diagram tokens");
for (const token of [
  "--nebula-node-border-selected",
  "--nebula-selection-ring",
  "--nebula-state-running",
  "--nebula-state-success",
  "--nebula-state-warning",
  "--nebula-state-error"
]) {
  if (!diagramCss.includes(token)) errors.push(`diagram tokens: does not consume ${token}`);
}

const skill = await readProjectFile("SKILL.md", "skill routing");
for (const requiredPath of [
  "assets/theme-registry.json",
  "assets/semantic-state-tokens.css",
  "references/color-strategy.md",
  "references/theme-quality-gates.md"
]) {
  if (!skill.includes(requiredPath)) errors.push(`SKILL.md: does not route to ${requiredPath}`);
}

if (errors.length) {
  console.error(`\nTheme contract failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `\nTheme contract valid: ${registry.themes.length} themes, default ${registry.defaultTheme}.`
  );
}
