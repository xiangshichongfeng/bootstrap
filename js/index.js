/**
 * Created by Administrator on 2016/11/20.
 */
$(function () {
    //当屏幕发生变化时，实时触发

    /*需求：小屏时，让Ul可以滑动*/
    //首先获取li的高度进行累加
    var $navtabs = $(".ul_wrap .nav-tabs");
    var list = $(".ul_wrap .nav-tabs li")
    var wdx = 0;
    list.each(function (index, value) {
        wdx += $(this).width();
    })
    $navtabs.width(wdx);

    var aImg = $(".wjsSlide>.carousel>.carousel-inner>.item a");
    $(window).on('resize', Resize).trigger('resize');
    $(window).on("resize", Resize);



    function Resize() {
        //获取屏幕的宽度
        var screenWidth = $(window).width();
        var smallImg = screenWidth < 768;
        //实现需求的步骤：1、小屏时，在a标签中创建img并且引用小图，反之大图取消大图(遍历)
        //2、在小屏上干掉高度，大图恢复
        aImg.each(function (index, value) {
            var url = screenWidth < 768 ? $(this).data("sm-src") : $(this).data("lg-src");
            screenWidth < 768 ? $(this).html('<img src="' + url + '" alt="">') : $(this).html('');
            screenWidth < 768 ? $(this).css("background-image", "") : $(this).css("background-image", "url(" + url + ")");
            screenWidth < 768 ? $(this).height("auto") : $(this).height(410);

        })
        smallImg ? $(".ul_wrap").css("overflow", "scroll") : $(".nav-tabs").css("overflow", "auto");
    }


    /*需要初始化弹出框,使用弹出框前的准备工作*/
    $("button[data-toggle=tooltip]").tooltip();

    /*全部新闻部分*/
    $(".nav-pills li").on("click", function () {
        var text = $(this).data("title");
        $(".all_news").html(text);
    })


    /*头部滑动固定定位*/
    var $wjs_nav = $(".wjs_nav");
    var $wjsSlide = $(".wjsSlide");
    /*console.log($affix);*/
    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();
        //当导航开始固定定位时，给banner区域一个固定定位
        if ($wjs_nav.hasClass("affix")) {
            $wjsSlide.css("margin-top", 160);
        } else {
            $wjsSlide.css("margin-top", 0);
        }
    })

    /*手机端滑动轮播的*/
    var $wjsSlide = $(".wjsSlide");
    $wjsSlide.on("touchstart", touchstartHandle);
    $wjsSlide.on("touchmove", touchmoveHandle);
    $wjsSlide.on("touchend", touchendHandle);
    var startX = 0, dx = 0;
    offTop = 50;
    function touchstartHandle(e) {
        startX = e.originalEvent.touches[0].pageX;
    }

    function touchmoveHandle(e) {
        dx = e.originalEvent.touches[0].pageX - startX;
    }

    function touchendHandle(e) {
        if (Math.abs(dx) > offTop) {
            if (dx > 0) {
                //右
                $wjsSlide.carousel('prev');
            }
            else {
                //左
                $wjsSlide.carousel('next');
            }
        }
    }
})

