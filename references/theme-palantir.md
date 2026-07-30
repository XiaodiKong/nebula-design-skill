# Palantir 风格：产品应用适配

用于关键运营、数据融合、风控、调度、态势感知、Ontology 关系建模和用户明确选择 Palantir 风格的产品应用。

## 官方研究来源

- [Palantir 官方文档](https://www.palantir.com/docs/)
- [Workshop 应用设计最佳实践](https://www.palantir.com/docs/foundry/workshop/application-design-best-practices)
- [Workshop 布局与样式](https://www.palantir.com/docs/foundry/workshop/concepts-layouts)
- [Palantir Blueprint](https://github.com/palantir/blueprint)
- [Blueprint 文档](https://blueprintjs.com/docs/)

研究日期：2026-07-30。产品规则以 Palantir 官方文档和官方开源 Blueprint 为依据；这是非官方适配，不代表 Palantir 产品界面的完整复刻。

## 核心气质

- 面向桌面端、复杂任务和高密度数据；首先保证判断速度、操作可追溯和异常可见。
- 深灰层级、细边界、紧凑控件和有限圆角构成“任务控制台”，不是霓虹科幻大屏。
- 信息架构围绕对象、关系、动作、时间和负责人组织，适合把业务 Ontology 映射为可操作界面。
- 主要动作使用 Blueprint 蓝；紫色只用于 AI、模型或推理能力，不替代业务状态色。
- 图表、地图、时间线、对象列表和详情面板优先直接拼接，减少无意义的大卡片与悬浮阴影。

## 产品应用实现

- 默认交付暗色：页面 `#111418`，主要表面 `#1c2127`，悬停或抬升表面 `#252a31`。
- 正文使用 Source Sans Pro / Source Sans 3 风格回退；代码、对象 ID 和坐标使用 IBM Plex Mono 或 JetBrains Mono。
- 控件高度以 30–36px 为主，圆角 2–4px；紧凑不等于缩小点击目标或降低文字对比度。
- 侧栏承担全局模块，顶栏承担环境、搜索、时间范围和用户上下文；页面内工具栏只放当前任务操作。
- 表格、树、关系图和多面板工作台允许更高密度，但必须提供选中态、悬停态、键盘焦点和清楚的空态。
- 用五种意图色表达主要动作、成功、警告、危险和 AI；颜色必须同时配合图标、标签或文字。
- 对象详情应展示来源、更新时间、负责人、关联对象与可执行动作，避免只有静态指标。

## 布局建议

- 典型桌面结构：全局侧栏 / 任务工具栏 / 主工作区 / 可折叠详情面板。
- 关系与态势页面：列表或过滤器在左，图形或地图在中，证据与操作在右。
- 移动端提供查看、确认和轻操作降级；不要强行压缩桌面级多面板工作台。
- 复杂列表优先虚拟化或分页，不一次渲染不可控的数据量。

## 避免

- 不把 Palantir 误做成绿色终端、军事 HUD、霓虹紫赛博朋克或满屏雷达。
- 不因深色背景而隐藏层级；正文、次要文字、禁用态和边界仍要可辨。
- 不复制 Palantir Logo、产品截图、客户数据或受限品牌字体。
- 不声称使用官方 Blueprint 组件，除非项目实际安装并遵守其 Apache-2.0 许可。
