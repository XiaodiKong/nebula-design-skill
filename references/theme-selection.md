# 主题选择与切换

本 Skill 提供七套视觉主题，可应用于产品应用与营销官网。主题只改变视觉语言、字体、密度和组件表面，不决定设计表面，也不改变业务模型、信息架构、权限、状态、转化目标或可访问性要求。

## 选择矩阵

| 主题 | 视觉关键词 | 产品应用倾向 | 营销官网倾向 |
|---|---|---|---|
| Clarity | 深蓝、企业蓝、紧凑、清晰 | 风控、数据平台、权限、运营后台 | 企业服务、治理、安全与咨询转化 |
| Cal.com | 黑白中性、留白、友好 SaaS | 表单、预约、客户成功、轻量工作台 | 通用 SaaS 首页、功能与定价页 |
| Notion | 暖灰、编辑感、柔和色块、内容优先 | 知识、项目、内容、协作工作区 | 内容产品、模板与协作叙事 |
| Linear | 近黑画布、薰衣草蓝、精密、低噪声 | 工程、研发、自动化、技术运维 | 开发者产品、发布与功能展示 |
| Claude | 暖黑或奶油画布、陶土色、衬线标题、人文编辑感 | AI、研究、内容、知识分析 | AI、研究与内容产品叙事 |
| OpenCode AI | 全局等宽、终端黑、高对比、锐利 | AI 编码、研发、日志、终端工作台 | 开发者工具、文档与快速开始 |
| Palantir | 近黑任务画布、Blueprint 蓝、细边界、高密度 | Ontology、关键运营、态势感知、关系与调度 | 企业 AI、工业平台、任务与影响叙事 |

## 决策规则

1. 用户明确指定主题时直接使用，不混入其他主题的标志性表面。
2. 用户要求提供选择时，给出七个同结构的小型预览或实现主题切换器。
3. 用户未指定时默认使用 Cal.com。
4. 只有用户明确要求推荐、比较或选择最合适主题时，才按场景建议：高密度风控与数据后台使用 Clarity；内容、知识和协作工具使用 Notion；暗色工程工具使用 Linear；人文 AI 产品使用 Claude；终端与编码工具使用 OpenCode AI；关键运营、Ontology、态势感知和多面板任务控制台使用 Palantir。业务类型本身不能自动覆盖 Cal.com 默认值。
5. 先按 [surface-selection.md](surface-selection.md) 判断产品应用或营销官网，再套用主题；主题不决定导航结构或页面类型。
6. 营销官网按 [marketing-theme-adaptation.md](marketing-theme-adaptation.md) 转译主题，不直接复用后台侧栏、高密度表格或工具栏。
7. 主题选择不会删除业务语义色。Linear 等低彩度主题仍要为错误、警告和成功提供可辨识状态，但把颜色限制在状态组件内。
8. 字体遵守 [typography-system.md](typography-system.md)。自定义字体只有在项目已有合法字体资产时使用；否则采用主题文件中的系统与开源字体回退。
9. 当主题文件中的字体、颜色、圆角、控件或导航尺寸与 [visual-system.md](visual-system.md) 的通用默认值不同，主题专属值优先；通用文件继续约束语义、布局、可访问性和交互底线。

## 实现契约

新项目未指定主题时优先复制 Cal.com 令牌；用户指定或选择其他主题时复制对应令牌：

- Clarity：[assets/clarity-tokens.css](../assets/clarity-tokens.css)
- Cal.com：[assets/cal-tokens.css](../assets/cal-tokens.css)
- Notion：[assets/notion-tokens.css](../assets/notion-tokens.css)
- Linear：[assets/linear-tokens.css](../assets/linear-tokens.css)
- Claude：[assets/claude-tokens.css](../assets/claude-tokens.css)
- OpenCode AI：[assets/opencode-tokens.css](../assets/opencode-tokens.css)
- Palantir：[assets/palantir-tokens.css](../assets/palantir-tokens.css)

七套文件都暴露同一组 `--admin-*` 语义变量，包括分离的中英文字体令牌。组件只依赖语义变量，不依赖主题名称：

```css
.primary-button {
  color: var(--admin-color-on-primary);
  background: var(--admin-color-primary);
  border-radius: var(--admin-radius-control);
}
```

需要运行时切换时：

1. 把七套令牌放在 `[data-admin-theme="..."]` 作用域，或把选中的令牌样式表启用。
2. 把选择持久化到 `localStorage`；首次加载尊重产品默认值。
3. 同步设置 `color-scheme`，避免 Linear、Palantir 等暗色主题出现错误的系统控件。
4. 切换后检查图表、弹层、滚动条、空态和焦点环，不只检查按钮颜色。
5. 避免让主题切换引起布局尺寸大幅变化；字体、圆角和密度变化应保持主任务位置稳定。

已有设计系统时，把 `--admin-*` 映射到现有令牌，不并行维护两套组件变量。`--admin-*` 是为兼容既有版本保留的历史前缀，不表示这些令牌只能用于中后台；后续大版本再考虑无破坏迁移到品牌中性的命名。

## 图形工作台

图形页面继续加载 [assets/diagram-tokens.css](../assets/diagram-tokens.css)。该文件从 `--admin-*` 读取画布、节点、边、选中和状态色，因此会随主题自动变化。

主题不能改变图的结构语义：

- 节点分组、关系方向和状态必须保持稳定。
- 不用主题色替代业务分组色。
- 暗色主题需要重新检查边、网格、节点文字和选中态对比度。
- 多主题预览使用相同数据和布局，便于比较视觉风格而不是比较内容。

## 来源说明

Cal.com、Notion、Linear、Claude 和 OpenCode AI 产品主题参考
[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 中的公开页面分析；Palantir 产品主题参考官方
[Blueprint](https://github.com/palantir/blueprint) 与
[Workshop 设计实践](https://www.palantir.com/docs/foundry/workshop/application-design-best-practices)；营销主题按
[marketing-theme-adaptation.md](marketing-theme-adaptation.md) 路由研究各官方公开网站。
这些主题是面向本 Skill 前端场景的非官方适配，不是相关品牌的官方设计系统、商标授权或像素级复刻。
