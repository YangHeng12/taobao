(function() {
    class Fd {
        constructor() {
            this.$spic = $(".xt");
            this.$sf = $(".sf");
            this.$bf = $(".Bimg");
            this.$bpic = $(".Bimg img");
            this.$wrap = $(".detail_l");
            this.$oUl = $(".mover ul");
            this.bili = this.$bpic.width() / this.$spic.width();
        }
        init() {
            console.log(this.$oUl)
            let $el = this; //存this
            this.$spic.hover( //鼠标移入移出加滑动
                function() {
                    $el.over();
                    $(this).on("mousemove", function(e) {
                        $el.move(e);
                    });
                },
                function() {
                    $el.out();
                }
            );
            this.$oUl.on("click", function(ev) { // 给每个LI添加点击事件
                $el.liclick(this, ev);
            })
        }

        over() {
            //鼠标移入
            this.$sf.css({
                visibility: "visible",
                width: (this.$spic.width() * this.$bf.width()) / this.$bpic.width(),
                height: (this.$spic.height() * this.$bf.height()) / this.$bpic.height()
            });
            this.$bf.css("visibility", "visible");
        }

        out() {
            //鼠标移出
            this.$sf.css("visibility", "hidden");
            this.$bf.css("visibility", "hidden");
        }

        move(e) {
            //鼠标移动
            let l = e.pageX - this.$wrap.offset().left - this.$sf.width() / 2;
            let t = e.pageY - this.$wrap.offset().top - this.$sf.height() / 2;
            if (l <= 0) {
                l = 0;
            } else if (l >= this.$spic.width() - this.$sf.width()) {
                l = this.$spic.width() - this.$sf.width();
            }
            if (t <= 0) {
                t = 0;
            } else if (t >= this.$spic.height() - this.$sf.height()) {
                t = this.$spic.height() - this.$sf.height();
            }
            this.$sf.css({
                left: l,
                top: t
            });
            this.$bpic.css({
                left: -this.bili * l,
                top: -this.bili * t
            });
        }

        liclick($el, ev) {
            if (ev.target.nodeName == 'IMG') {
                let url = $(ev.target).prop("src");
                this.$spic.find("img").prop("src", url);
                this.$bpic.prop("src", url);
            }
        }
    }
    new Fd().init();
})();