; //二级导航
(function() {;
    (function() { //二级导航的效果
        class navhover {
            constructor() {
                this.$Tleft_left_li = $(".Tleft_left li");
                this.$nav_nonebox = $(".nav_nonebox");
            }
            init() {
                const $el = this;
                this.$Tleft_left_li.hover(function() {
                    $el.hoverlishow()
                }, function() {
                    $el.hoverlihide()
                });
                this.$nav_nonebox.hover(function() {
                    $el.hoverlishow()
                }, function() {
                    $el.hoverlihide()
                })
            }
            hoverlishow() {
                this.$nav_nonebox.show().stop(true).animate({
                    opacity: 1
                })
            }
            hoverlihide() {
                this.$nav_nonebox.stop(true).animate({
                    opacity: 0
                }).hide()
            }
        }
        new navhover().init()
    })();

    ;
    (function() { //轮播图效果
        $(".taobao").banner(); //上部轮播图
        $(".bd_taobaobanner").banner({ //下部轮播图
            className: 'active_bd',
            elment: "bd_taobaobanner",
            timer: 5000
        });
    })();

    ;
    (function() { //tab效果
        $(".hoverbanner").tab();
    })();

    //楼梯效果
    ;
    (function($) {
        var $lou = $('.lou-ti a').not('.last-no');
        var $louceng = $('.louceng')
        $(window).on('scroll', function() {
            var $win = $(window).scrollTop();
            if ($win >= 478) {
                $('.lou-ti div').css({
                    "position": "fixed",
                    "top": 40,
                    "right": '50%',
                })
            } else(
                $('.lou-ti div').css({
                    "position": "absolute",
                    "top": 478,
                    "right": '50%'
                })
            );
            $louceng.each(
                function(index, element) {
                    if ($(element).offset().top > $win) {
                        $lou.removeClass('active')
                        $lou.eq(index).addClass('active')
                        return false
                    }
                }
            )
        });
        $lou.on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('html,body').animate({
                scrollTop: $louceng.eq($(this).index()).offset().top
            })
        })
        $('.last').on('click', function() {
            $('html,body').animate({
                scrollTop: 0
            })
        })
    })(jQuery);




    ;
    (function() { // 获取数据库信息进行拼接
        class Index {
            constructor() {
                this.$oUl = $("#list");
            }
            init() {
                this.getmessage();
            }
            getmessage() {
                const $el = this;
                $.ajax({
                    url: "http://10.31.163.84/1902%20JS/st/projectname/php/acquire%20table.php",
                    dataType: "json",
                    success: function(data) {
                        let $str = ``;
                        $.each(data, function(index, value) {
                            $str += `<li>
                                        <a href="http://10.31.163.84/1902%20JS/st/projectname/src/details.html?sid=${value.sid}" target="_blank">
                                            <img class="lazy" data-original="${value.url}" width="197px" height="197px"/>
                                        </a>
                                        <h4>${value.title}</h4>
                                        <p>
                                            <span>
                                                <i>￥</i>${value.money}
                                            </span>
                                            <em>销量${value.money}</em >    
                                        </p>
                                        <div></div>
                                    </li>`;
                        });
                        $el.$oUl.html($str);
                        $(function() {
                            $("img.lazy").lazyload({
                                placeholder: "https://wwc.alicdn.com/avatar/getAvatar.do?userNick=&width=50&height=50&type=sns&_input_charset=UTF-8",
                                effect: "fadeIn"
                            });
                        });
                    }
                })
            }
        }
        new Index().init();
    })();
})();