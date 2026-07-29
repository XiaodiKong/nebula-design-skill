# 中英文字体系统

主题令牌把中文、英文、标题、正文和代码字体分开定义。不要只配置一个通用 `font-family`，否则未加载品牌字体时所有主题都会回退到相同系统字体。

## 字体令牌

每套主题必须提供：

| 令牌 | 用途 |
|---|---|
| `--admin-font-latin-body` | 英文正文、按钮、导航、表格 |
| `--admin-font-cjk-body` | 中文正文、按钮、导航、表格 |
| `--admin-font-latin-display` | 英文页面标题和重点标题 |
| `--admin-font-cjk-display` | 中文页面标题和重点标题 |
| `--admin-font-mono` | ID、代码、终端、版本和技术元数据 |
| `--admin-font-body` | 已组合的正文栈 |
| `--admin-font-display` | 已组合的标题栈 |

混合中英文文本会自动逐字形回退。把拉丁字体放在前面；当它缺少中文字形时，浏览器会继续使用后面的中文字体：

```css
:root {
  --admin-font-latin-body: Inter, "SF Pro Text";
  --admin-font-cjk-body: "PingFang SC", "Microsoft YaHei",
    "Noto Sans CJK SC";
  --admin-font-body:
    var(--admin-font-latin-body),
    var(--admin-font-cjk-body),
    sans-serif;
}

body,
button,
input,
select {
  font-family: var(--admin-font-body);
}

h1,
h2,
.display-title {
  font-family: var(--admin-font-display);
}

code,
kbd,
pre,
.technical-id {
  font-family: var(--admin-font-mono);
}
```

通用族 `sans-serif`、`serif`、`monospace` 只能放在最终组合栈末尾。若把它写在英文子栈末尾，浏览器可能先用系统通用字体完成中文字形回退，使后面的指定中文字体无法命中。

## 字体来源与授权

- 不把专有字体直接加入 Skill。Cal Sans、Notion Sans、Linear、Copernicus、StyreneB、Berkeley Mono 等字体只有在项目已有合法资产或许可时才能使用。
- 没有品牌字体资产时，使用主题令牌中的系统与开源回退。
- 需要稳定跨平台显示时，用户可提供 `.woff2` 文件；将它们放入项目字体目录并用 `@font-face` 声明。
- 不从第三方站点抓取字体文件，不把网页缓存字体视为可再分发资产。

推荐开源替代：

| 风格 | 英文 | 中文 |
|---|---|---|
| Clarity | Inter | Noto Sans SC / 思源黑体 |
| Cal.com | Manrope / Inter | HarmonyOS Sans SC / Noto Sans SC |
| Notion | Inter | Noto Sans SC / 思源黑体 |
| Linear | Inter / Geist | Noto Sans SC / 思源黑体 |
| Claude | Cormorant Garamond / EB Garamond；正文 Inter | Noto Serif SC / 思源宋体；正文 Noto Sans SC |
| OpenCode | JetBrains Mono / IBM Plex Mono | Sarasa Mono SC / Noto Sans Mono CJK SC |

## 中文排版规则

- 中文正文不要使用负字距；默认 `letter-spacing: 0`。
- 中文衬线标题使用 500–600 字重，避免过细笔画影响屏幕可读性。
- 中文等宽主题仍要保证 `1.55–1.7` 行高；不要为了终端感压缩行距。
- 表格和高密度工作台优先可读性。即使 Claude 使用衬线标题，表格、筛选和输入框仍使用无衬线正文。
- OpenCode 可以全局使用等宽字体，但中文回退字体必须覆盖常用汉字，并检查控件宽度和长文案截断。

## 字体加载验证

浏览器验收时检查：

1. `getComputedStyle` 中标题、正文和代码区的 `font-family` 是否符合主题角色；Claude 等主题应有差异，OpenCode 允许三者使用同一等宽家族。
2. 中文标题、英文标题、数字、ID 和混合文案是否使用预期回退。
3. 字体未加载时布局是否稳定，按钮和表格是否溢出。
4. `document.fonts.check()` 只能用于诊断，不得把字体名称已声明误认为字体文件已加载。
5. 字体切换后重新检查 1024px 与窄屏布局。
