# 主题选择与切换

本 Skill 提供四套视觉主题。主题只改变视觉语言、密度和组件表面，不改变业务模型、信息架构、权限、状态或可访问性要求。

## 选择矩阵

| 主题 | 视觉关键词 | 适合场景 | 不适合 |
|---|---|---|---|
| Clarity | 深蓝导航、企业蓝、紧凑、清晰 | 风控、数据平台、权限、运营后台 | 强品牌营销页 |
| Cal.com | 黑白中性、留白、柔和卡片、友好 SaaS | 表单、预约、客户成功、轻量工作台 | 极高密度监控大盘 |
| Notion | 暖灰、编辑感、柔和色块、内容优先 | 知识、项目、内容、协作工作区 | 需要强烈告警氛围的监控中心 |
| Linear | 近黑画布、薰衣草蓝、精密、低噪声 | 工程、研发、自动化、技术运维 | 强日照环境或用户明确要求浅色 |

## 决策规则

1. 用户明确指定主题时直接使用，不混入其他主题的标志性表面。
2. 用户要求提供选择时，给出四个同结构的小型预览或实现主题切换器。
3. 用户未指定时，中文企业中后台默认使用 Clarity。
4. 内容、知识和协作工具可优先建议 Notion；轻量 SaaS 可建议 Cal.com；暗色工程工具可建议 Linear。
5. 主题选择不会删除业务语义色。Linear 等低彩度主题仍要为错误、警告和成功提供可辨识状态，但把颜色限制在状态组件内。
6. 自定义字体只有在项目已有合法字体资产时使用；否则采用主题文件中的系统字体回退。

## 实现契约

新项目优先复制一套主题令牌：

- Clarity：[assets/clarity-tokens.css](../assets/clarity-tokens.css)
- Cal.com：[assets/cal-tokens.css](../assets/cal-tokens.css)
- Notion：[assets/notion-tokens.css](../assets/notion-tokens.css)
- Linear：[assets/linear-tokens.css](../assets/linear-tokens.css)

四套文件都暴露同一组 `--admin-*` 语义变量。组件只依赖语义变量，不依赖主题名称：

```css
.primary-button {
  color: var(--admin-color-on-primary);
  background: var(--admin-color-primary);
  border-radius: var(--admin-radius-control);
}
```

需要运行时切换时：

1. 把四套令牌放在 `[data-admin-theme="..."]` 作用域，或把选中的令牌样式表启用。
2. 把选择持久化到 `localStorage`；首次加载尊重产品默认值。
3. 同步设置 `color-scheme`，避免 Linear 暗色主题出现错误的系统控件。
4. 切换后检查图表、弹层、滚动条、空态和焦点环，不只检查按钮颜色。
5. 避免让主题切换引起布局尺寸大幅变化；字体、圆角和密度变化应保持主任务位置稳定。

已有设计系统时，把 `--admin-*` 映射到现有令牌，不并行维护两套组件变量。

## 图形工作台

图形页面继续加载 [assets/diagram-tokens.css](../assets/diagram-tokens.css)。该文件从 `--admin-*` 读取画布、节点、边、选中和状态色，因此会随主题自动变化。

主题不能改变图的结构语义：

- 节点分组、关系方向和状态必须保持稳定。
- 不用主题色替代业务分组色。
- 暗色主题需要重新检查边、网格、节点文字和选中态对比度。
- 多主题预览使用相同数据和布局，便于比较视觉风格而不是比较内容。

## 来源说明

Cal.com、Notion 和 Linear 的视觉资料改编自
[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 中的公开页面分析，仓库采用 MIT License。
这些主题是面向本 Skill 的中后台适配，不是相关品牌的官方设计系统、商标授权或像素级复刻。
