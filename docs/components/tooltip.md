# Tooltip 提示

文字提示，在鼠标 hover 时显示提示文字。

## 基础用法

提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。由 `placement`属性决定展示效果。`placement`属性的值为：`[方向]-[对齐位置]`；四个方向：`top`、`bottom`、`left`、`right`。对齐位置：`start`、`end`，默认为空。如：`placement="top-start"`。

:::preview

demo-preview=../demo/tooltip/Basic.vue

:::

## 主题

Tooltip 组件内置了两个主题：`dark`和`light`。默认主题为`dark`。

:::preview

demo-preview=../demo/tooltip/Effect.vue

:::

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式，可以使用具名 slot `content`，代替`tooltip`中的`content`属性。

:::preview

demo-preview=../demo/tooltip/Content.vue

:::

## Tooltip API

### Props

| 名称      | 说明                                        | 类型      | 默认值 |
| :-------- | :------------------------------------------ | :-------- | :----- |
| content   | 显示的内容，也可被 slot#content 覆盖        | `string`  | ''     |
| placement | Tooltip 组件出现位置                        | `enum`    | bottom |
| effect    | Tooltip 主题，内置了 `dark` 和 `light` 两种 | `enum`    | dark   |
| trigger   | 提示框的触发方式                            | `enum`    | hover  |
| disabled  | Tooltip 组件是否禁用                        | `boolean` | false  |
| manual    | 是否手动控制Tooltip 组件                    | `boolean` | false  |

### Events

| 名称  | 说明                    | 类型     |
| :---- | :---------------------- | :------- |
| close | 关闭 Alert 时触发的事件 | Function |
