/*
 * @Author: dongjiabo
 * @Date:   2016-03-12 15:46:42
 * @Last Modified by:   dongjiabo
 * @Last Modified time: 2016-03-14 20:41:05
 */
(function($) {
    $.fn.slider = function(config) {
        // 默认参数
        var options = {
            duration: 600,
            autoplay: 3000,
            width: 600,
            height: 300,
            autoplayDisableOnInteraction: true
        };
        // 更改默认参数
        if (config) {
            $.extend(options, {
                duration: config.duration,
                autoplay: config.autoplay,
                width: config.width,
                height: config.height,
                autoplayDisableOnInteraction: config.autoplayDisableOnInteraction
            });
        };
        // 设置外层盒子宽度和高度
        $(this).css({
            width: options.width,
            height: options.height
        })
        var $imgList = $(this).find('.img-list'); // 图片列表
        var $btnBox = $(this).find('.btn-box'); // 左右按钮盒子
        var $sliderCtrl = $(this).find('.slider-ctrl'); // 小圆圈控制列表外盒子
        var $prevBtn = $btnBox.find('.btn-prev'); // 上一个按钮
        var $nextBtn = $btnBox.find('.btn-next'); // 下一个按钮
        var $sliderWidth = $(this).width(); // 盒子宽度

        var iNow = 0,
            len = $imgList.length,
            timer = null;

        // 根据图片的数量 创建小圆圈数量
        $imgList.each(function(index, item) {
            var span = $('<span>' + (index + 1) + '</span>');
            $sliderCtrl.append(span);
        });

        var $ctrlList = $sliderCtrl.find('span');
        $ctrlList.eq(0).addClass('active');


        $imgList.eq(0).css({
            'zIndex': 1,
            'opacity': 1
        });

        // 下一个按钮
        $nextBtn.on('click', nextFn);
        // 上一个按钮
        $prevBtn.on('click', prevFn);

        // 鼠标悬停以及离开从效果
        $(this).hover(function() {
            $btnBox.show();
            if (options.autoplayDisableOnInteraction)
                clearInterval(timer);
        }, function() {
            $btnBox.hide();
            if (!options.autoplayDisableOnInteraction) return false;
            timer = setInterval(nextFn, options.autoplay);
        });

        // 小圆圈点击切换
        $ctrlList.each(function(index, item) {
            $(item).on('click', function() {
                $imgList.eq(iNow).animate({ opacity: 0, zIndex: 0 });
                $imgList.eq(index).animate({ opacity: 1, zIndex: 1 });
                iNow = index;
                circleStyle();
            });
        });

        timer = setInterval(nextFn, options.autoplay);


        return this; // 链式调用


        // 下一个按钮效果函数
        function nextFn() {
            $imgList.eq(iNow).animate({ opacity: 0, zIndex: 0 }, options.duration);
            iNow++;
            iNow = iNow > len - 1 ? 0 : iNow;
            $imgList.eq(iNow).animate({ opacity: 1, zIndex: 1 }, options.duration);
            circleStyle();
        }

        // 上一个按钮效果函数
        function prevFn() {
            $imgList.eq(iNow).animate({ opacity: 0, zIndex: 0 }, options.duration);
            iNow--;
            iNow = iNow < 0 ? len - 1 : iNow;
            $imgList.eq(iNow).animate({ opacity: 1, zIndex: 1 }, options.duration);
            circleStyle();
        }

        // 改变小圆圈的样式
        function circleStyle() {
            $ctrlList.each(function(index, item) {
                $(item).removeClass('active');
            });
            $ctrlList.eq(iNow).addClass('active');
        };
    };
})(jQuery);
