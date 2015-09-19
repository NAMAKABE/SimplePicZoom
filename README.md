# SimplePicZoom

需求Jquery

初始化

```javascript
$(function() {
	$('.zoom-it').zoom({
		// 内边距
		innerPadding: 10,
		// 外边距
		outerPadding: 30,
		// 动画执行时间
		time: 300,
		// 淡入淡出时间
		fadeTime: 300,
		// 是否启用幻灯片组功能
		slide: false,
		// 幻灯片区域
		selector: 'body'
	});
})
```