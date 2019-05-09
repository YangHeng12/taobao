;
(function($) {
    $.fn.extend({
        tab() {
            class Tab {
                constructor() {
                    this.$setting = { //默认参数
                        id: '.hoverbanner',
                        incident: "mousemove",
                        className: "tab_active"
                    };
                    // this.$option = option; //配置参数
                    Object.assign(this.$setting, this.$option); //通过ASSIGN将两参数整合
                    this.$oBox_tab = $(this.$setting.id); // 通过ID获取盒子
                    this.$atitle = $(`${this.$setting.id} .tab_title a`); //获得元素对象
                    this.$tab_cont = $(`${this.$setting.id}  .tab_cont`); //获得元素对象
                    this.$timer = null; //延时定时器   控制鼠标移入
                }
                init_l() {
                    const $el = this; //存this
                    this.$atitle.on($el.$setting.incident, function() {
                        $el.atitletab(this, $el)
                    })
                };
                atitletab(_this, $el) {
                    $(_this).addClass($el.$setting.className).siblings().removeClass($el.$setting.className);
                    $($el.$tab_cont[$(_this).index()]).show().siblings().hide()
                }
            }
            new Tab().init_l();
        }
    })
})(jQuery);