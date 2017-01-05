$(function() {

    'use strict';

    // 扩展原生对象
    Object.keys = Object.keys || function(obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };

    // 是否是数组
    Array.isArray = Array.isArray || function(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    };

    // 系统内置的图标素材
    var ICONS = {
        'star': 'http://img13.360buyimg.com/cms/jfs/t3286/16/5426262213/2385/1930356e/5865c84cN32ebbcc8.png',
        'cake': 'http://img14.360buyimg.com/cms/jfs/t3943/283/1021426942/3625/f41ae0bf/5865c84cN3494e5b9.png',
        'emoji': 'http://img13.360buyimg.com/cms/jfs/t4051/304/1014272481/3653/a379e0a2/5865c84cN2e6defde.png',
        // 数组值必须是ICONS中已有的图片链接对应的KEY
        // 数组中不能直接填写链接地址
        'two': ['star', 'cake'],
        'three': ['star', 'emoji', 'cake']
    };
    // 内置元素动画素材
    var ANIMS = {
        rotate: 'anim-rotate',
        rotateX: 'anim-rotate-x',
        rotateY: 'anim-rotate-y'
    };
    // 动画组件默认配置
    var _DEFAULT = {
        // 使用哪个/组图标，可选值 star/cake/emoji/two/three
        useIcon: 'star',
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
    };
    var BODY = $('body');
    // 图标初始像素，默认32像素
    var initSize = 32;

    function WxRain(wrap, cfg) {
        var config = $.extend(true, {}, cfg || {});

        this.wrap = wrap;
        this.get = function(n) {
            return config[n];
        };
        this.set = function(n, v) {
            config[n] = v;
        };

        this.init();
    }

    WxRain.prototype.init = function() {
        var that = this;
        // 创建动画容器
        this.createWrap();
        // 绑定容器
        this.bindWrap();
        // 开启动画
        this.startRain();
        // 自动停止下雨动画
        if (this.get('autoStop')) {
            setTimeout(function() {
                that.stopRain();
            }, this.get('rainTime') * 1000);
        }
        // 增加数量统计
        this.set('count', 0);
    };

    WxRain.prototype.createWrap = function() {
        var $wrap = $('<div>');
        BODY.append($wrap);
        this.set('container', $wrap);
        return $wrap;
    };

    WxRain.prototype.bindWrap = function() {
        var wrap = this.wrap;
        var offset = wrap.offset();
        var size = {
            width: wrap.outerWidth(),
            height: wrap.outerHeight()
        };
        var zIndex = wrap.css('zIndex') || 0;
        var cont = this.get('container');
        this.set('area', size);
        cont.css({
            position: 'absolute',
            top: offset.top,
            left: offset.left,
            zIndex: zIndex + 1,
            width: size.width,
            height: size.height,
            overflow: 'hidden'
        });
    };

    WxRain.prototype.startRain = function() {
        var that = this;
        var icon = ICONS[this.get('useIcon')] || ICONS['star'];
        var area = this.get('area');
        var anim = this.get('animate');
        var animClass = '';
        // 缓存动画对象Key，用于anim === 'auto'时随机
        var animKeys = [];
        var timer = this.get('timer');
        var cont = this.get('container');
        var scale = this.get('scale');
        var dur = this.get('duration');
        var interval = dur[0] * 0.3;
        if (anim === 'auto') {
            animKeys = Object.keys(ANIMS);
            animClass = ANIMS[animKeys[Math.floor(Math.random() * animKeys.length)]];
        } else {
            animClass = ANIMS[anim] || '';
        }
        // console.log(icon, area, animClass);
        // 每隔200ms产生2-4个小图标（水平位置随机），并绑定动画
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(function() {
            var count = Math.floor(Math.random() * 2) + 2;
            var i = 0;
            var animer;
            var iconSize = initSize;
            var endPoint = {top: 0, left: 0};
            var duration = 1000;
            var sc = 1;
            var imgUrl = '';
            for (; i < count; i++) {
                iconSize = initSize * (scale[1] || 2);
                endPoint = {top: area.height + 10, left: Math.random() * area.width};
                duration = parseInt((Math.random() * (dur[1] - dur[0]) + dur[0]) * 1000);
                sc = (Math.random() * (scale[1] - scale[0]) + scale[0]).toFixed(1);
                animer = $('<div class="rain-animer">');
                if (animClass) {
                    animer.addClass(animClass);
                }
                if (Array.isArray(icon)) {
                    imgUrl = ICONS[icon[Math.floor(Math.random() * icon.length)]] || ICONS['star'];
                } else {
                    imgUrl = icon;
                }
                animer.html('<img src="' + imgUrl + '">')
                    .css({
                        position: 'absolute',
                        top: '-' + iconSize + 'px',
                        left: Math.random() * area.width - iconSize,
                        webkitTransform: 'scale(' + sc + ')',
                        transform: 'scale(' + sc + ')'
                    })
                    .animate(endPoint, duration, 'linear', function() {
                        $(this).stop().remove();
                        that.set('count', that.get('count') - 1);
                        // 图案消失方案二
                        if (that.get('count') === 0) {
                            that.get('container').remove();
                        }
                    })
                    .appendTo(cont);
            }
            that.set('count', that.get('count') + count);
        }, interval * 1000);
        this.set('timer', timer);
    };

    WxRain.prototype.stopRain = function() {
        var timer = this.get('timer');
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        // 图案消失方案一
        // var cont = this.get('container');
        // cont.fadeOut(function() {
        //     cont.remove();
        // });
    };

    $.fn.rain = function(cfg) {
        var config = $.extend({}, _DEFAULT, cfg || {});
        if (!this.length) {
            throw('Elements not found.');
        }
        return this.each(function(idx, ele) {
            var $this = $(ele);
            if (!$this.parents('body').length) {
                $this = BODY;
            }
            $this.data('rain', new WxRain($this, config));
        });
    };
});
