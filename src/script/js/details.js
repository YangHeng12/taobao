(function() {;
    (function() { //数据渲染到详情页
        class detail {
            constructor() {
                this.$sid = location.search.substring(1).split('=')[1];
                this.$simg = $(".xt img");
                this.$bimg = $(".Bimg img");
                this.$h1title = $(".title h1");
                this.$ptitle = $(".content p");
                this.$jgmoney = $(".jg i");
                this.$listul = $(".mover ul");
            }
            init() {
                const $el = this;
                this.transfer($el);
            }
            transfer($el) {
                $.ajax({
                    url: 'http://10.31.163.84/1902%20JS/st/projectname/php/matching.php',
                    data: {
                        sid: $el.$sid
                    },
                    dataType: 'json',
                    success: function(data) {
                        $el.$simg.prop("src", data.url);
                        $el.$bimg.prop("src", data.url);
                        $el.$h1title.html(data.title);
                        $el.$ptitle.html(data.title);
                        $el.$jgmoney.html(`￥${data.money}~￥${300 + +data.money}.00`);
                        let $str = "";
                        let $data = data.urls.split(",");
                        $.each($data, function(index, value) {
                            $str += `<li><img src="${value}"></li>`;

                        });
                        $el.$listul.html($str);
                    }
                })
            }
        }
        new detail().init()
    })();

    (function() { //放大镜效果
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

    ;
    (function() { //点击加入购物车按钮
        class Cart {
            constructor() {
                this.$sid = location.search.substring(1).split('=')[1]; //获取sid
                this.$arrsid = []; //商品的sid
                this.$arrnum = []; //商品的数量
                this.$addcart = $("#addcart"); //购物车按钮
                this.$spnum = $(".spnum");
            }
            init() {
                let $el = this;
                this.$addcart.on("click", function() {
                    $el.cookietoarray();
                    $el.cookier();
                })
            }
            cookier() {
                if ($.inArray(this.$sid, this.$arrsid) != -1) { //商品存在，数量叠加 
                    //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
                    let num = parseInt(this.$arrnum[$.inArray(this.$sid, this.$arrsid)]) + parseInt(this.$spnum.val());
                    this.$arrnum[$.inArray(this.$sid, this.$arrsid)] = num;
                    addcookie('cookienum', this.$arrnum.toString(), 10); //数组存入cookie

                } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
                    this.$arrsid.push(this.$sid); //将当前的id存入数组
                    addcookie('cookiesid', this.$arrsid.toString(), 10); //数组存入cookie
                    this.$arrnum.push(this.$spnum.val());
                    addcookie('cookienum', this.$arrnum.toString(), 10); //数组存入cookie
                }
            }
            cookietoarray() { //获取cookie的方法
                if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
                    this.$arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
                    this.$arrnum = getcookie('cookienum').split(','); //cookie商品的num
                }
            }
        }
        new Cart().init();
    })();


    (function() { //数量+-
        let $num = $(".spnum").val();
        $(".spadd").on("click", function() {
            $num++;
            if ($num >= 10) {
                $num = 10;
            }
            $(".spnum").val($num);
        })
        $(".spless").on("click", function() {
            $num--;
            if ($num <= 0) {
                $num = 0;
            }
            $(".spnum").val($num);
        })
        $(".spnum").on("change", function() {
            let num = $(".spnum").val();
            if (num > 10) {
                num = 10;
            }
            $(".spnum").val(num);
        })
    })();
})();