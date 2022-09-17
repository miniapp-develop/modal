# miniapp modal

自定义小程序的模态框。

## 使用

安装：

```shell script
npm install @mini-dev/modal
```

引用组件：

```json
{
  "usingComponents": {
    "modal": "@mini-dev/modal"
  }
}
```
在页面配置模态框：

```html
    <modal mask="{{false}}"
           visible="{{modal.center}}"
           gravity="center"
           z-index="{{200}}"
           anim-duration=".3s"
           bindtapMask="handleClose"
           data-gravity="center"
           mini-class="center-ui-class">
        <view class="content center">
            <view>没有蒙层，动画时长：0.3s</view>
            <input class="modal__input"
                   placeholder="输入搜索值"/>
            <button bind:tap="handleClose" data-gravity="center">关闭</button>
        </view>
    </modal>
```
可选配置项：

    visible:bool[true|false]，控制模态框的显示与隐藏
    gravity:string[left|right|bottom|top|center]，控制模态框显示位置，默认center居中显示
    z-index:int，控制模态框的z-index
    anim-duration:string，控制模态框的动画时长
    bindtapMask:event-handler，配置蒙层的点击事件
    mini-class:string，覆盖组件内部的css
    
demo 参见：[./pages/index/index.wxml](./pages/index/index.wxml)

## 说明

如果 slot 中含有原生组件，在部分 ios 系统里面，会存在初始化样式的显示问题，比如：input 无法hidden，
所以这里采取了把 center 隐藏到视界外的方式。

## Changelog

### 0.0.5
1. 支持 mini-class
2. 默认动画时长调整为 0.2s
3. 增加了 virtualHost: true 配置


