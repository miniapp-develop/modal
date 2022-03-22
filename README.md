# miniapp modal

自定义小程序的模态框。

### 使用方式

引用组件：

```json
{
  "usingComponents": {
    "modal": "/libs/index"
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
           ui-class="center-ui-class">
        <view class="content center">
            <view>没有蒙层</view>
            <input class="modal__input"
                   placeholder="输入搜索值"/>
            <button bind:tap="handleClose" data-gravity="center">关闭</button>
        </view>
    </modal>
```
说明：

    visible:bool[true|false]，控制模态框的显示与隐藏
    gravity:string[left|right|bottom|top|center]，控制模态框显示位置，默认center居中显示
    z-index:int，控制模态框的z-index
    anim-duration:string，控制模态框的动画时长
    bindtapMask:event-handler，配置蒙层的点击事件
    ui-class:string，覆盖组件内部的css
    
demo 参见：[./pages/index/index.wxml](./pages/index/index.wxml)