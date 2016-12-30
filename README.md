## jQuery.rain插件

仿微信表情雨效果插件。在微信中发送“么么哒”、“想你了”、“恭喜发财”、“生日快乐”等关键字，屏幕上会下一小段时间的表情雨。本插件实现了下表情雨的效果，并且还进行了扩展，支持多表情的表情雨。实际效果请看：

[在线演示](http://seejs.me/jquery.rain/demo/index.html)

### 安装方法

由于是基于jQuery的扩展插件，因此引入jQuery是必须的。
此外，还需引入插件自身的实现脚本。

```xml
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="../js/jquery.rain.js"></script>
```

### 使用示例

插件会在指定的元素范围内运行，如果找不到指定的元素，插件将以body元素作为容器。

```js
$(function() {
    $('body').rain({
        useIcon: 'three'
    });
});
```

详细参数设置，请参看源码。