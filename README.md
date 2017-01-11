## jQuery.rain插件

仿微信表情雨效果插件。在微信中发送“么么哒”、“想你了”、“恭喜发财”、“生日快乐”等关键字，屏幕上会下一小段时间的表情雨。本插件实现了下表情雨的效果，并且还进行了扩展，支持多表情的表情雨。实际效果请看：

[在线演示](http://seejs.me/jquery.rain/demo/index.html)

### 安装方法

由于是基于jQuery的扩展插件，因此引入jQuery是必须的。
此外，还需引入插件自身的实现脚本。

```xml
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="../js/jquery.rain.min.js"></script>
```

在此之前，我们还需要引入样式依赖文件`jquery.rain.min.css`，主要包含掉落元素基础样式及自身CSS3动画定义。

```css
<link rel="stylesheet" href="../css/jquery.rain.min.css">
```

### 使用示例

插件会在指定的元素范围内运行，如果找不到指定的元素，插件将以body元素作为容器。

```js
$(function() {
    $('body').rain({
        // 使用哪个/组图标，可选值 star/cake/emoji/two/three
        useIcon: 'three',
        // 元素可选动画：auto/none/rotate/rotateX/rotateY
        animate: 'none',
        // 下雨动画持续时间，单位秒
        rainTime: 10,
        // 是否自动停止下雨动画
        autoStop: true,
        // 动画执行时长，区间：[最小值, 最大值]，单位秒
        duration: [1, 4],
        // 图标显示大小，区间：[最小值, 最大值]
        scale: [0.8, 1.2]
    });
});
```

更多详细信息，请参看[源码](https://github.com/mailzwj/jquery.rain)。