;
(function() {
    class detail {
        constructor() {
            this.$sid = location.search.substring(1).split('=')[1];
            this.$simg = $(".xt img");
            this.$bimg = $(".Bimg img");
            this.$h1title = $(".title h1");
            this.$ptitle = $(".content p");
            this.$jgmoney = $(".jg i");
            this.$listul = $(".mover ul")
        }
        init() {
            const $el = this
            this.transfer($el)
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
                    $el.$listul.html($str)
                }
            })
        }
    }
    new detail().init()
})();