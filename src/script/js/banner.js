// 轮播图效果
//默认参数    
// type：事件类型   
// className：li需要添加的类名     
// elment：外围盒子的类名    
// timer：轮播时间
(function($) {
    $.fn.extend({
        banner(obj) {
            class Banner {
                constructor(obj) {
                    this.$data = {
                        type: "click",
                        className: 'active_hd',
                        elment: "taobao",
                        timer: 4000
                    };
                    this.$obj = obj;
                    Object.assign(this.$data, this.$obj)
                    this.$taobao = $("." + this.$data.elment);
                    this.$uL = $(`.${this.$data.elment} ul`);
                    this.$oLbtn = $(`.${this.$data.elment} ol li`);
                    this.$uLimg = $(`.${this.$data.elment} ul li`);
                    this.$left = $(`.${this.$data.elment} #left`);
                    this.$right = $(`.${this.$data.elment} #right`);
                }
                init() {
                    let $ulwidth = this.$uLimg.width() * this.$uLimg.length; //给ul宽度
                    let $timer = null; //定时器
                    let $el = this; //存储this
                    this.$uL.width($ulwidth);
                    this.$taobao.hover(function() { //鼠标移入
                        $el.over()
                        clearInterval($timer) //清除定时器
                    }, function() { //鼠标移出
                        $el.out()
                        $timer = setInterval(function() { //开启定时器 点击右按钮
                            $el.rightbtn()
                        }, $el.$data.timer)
                    })

                    this.$oLbtn.on($el.$data.type, function() {
                        $el.listclick(this, $el)
                    })

                    this.$left.on('click', function() {
                        $el.leftbtn()
                    })

                    this.$right.on('click', function() {
                        $el.rightbtn()
                    })

                    $timer = setInterval(function() {
                        $el.rightbtn()
                    }, $el.$data.timer)
                }

                over() { //鼠标移入
                    this.$left.show();
                    this.$right.show()
                }

                out() { //鼠标移出
                    this.$right.hide()
                    this.$left.hide()
                }

                listclick(_this, $el) { //小圆点点击切换
                    $(_this).addClass($el.$data.className).siblings().removeClass($el.$data.className);
                    this.$uL.stop(true).animate({ //添加自定义动画
                        left: -this.$uLimg.width() * $(_this).index()
                    })
                }

                leftbtn() { //左边按钮
                    let $num = $("." + this.$data.className).index();
                    if ($num == 0) {
                        $num = this.$oLbtn.length;
                    };
                    $num--;
                    $(this.$oLbtn[$num]).addClass(this.$data.className).siblings().removeClass(this.$data.className); //给下方圆点添加或清除类
                    this.$uL.stop(true).animate({
                        left: -this.$uLimg.width() * $num
                    })
                }

                rightbtn() { //右边按钮
                    let $num = $("." + this.$data.className).index();
                    if ($num == this.$oLbtn.length - 1) {
                        $num = -1;
                    }
                    $num++;
                    $(this.$oLbtn[$num]).addClass(this.$data.className).siblings().removeClass(this.$data.className); //给下方圆点添加或清除类
                    this.$uL.animate({
                        left: -this.$uLimg.width() * $num
                    })
                }
            }
            new Banner(obj).init();
        }
    })
})(jQuery);