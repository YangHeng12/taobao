;
(function() {
    class Searchbox {
        constructor() {
            this.$iPt = $("#searchinput"); //获取元素
            this.$oUl = $(".seekcontent_list"); //获取元素
        }
        init() {
            const $el = this
            this.$iPt.on("input", function() {
                $el.oinput($el)
            })
        }
        oinput($el) {
            let valcontent = this.$iPt.val();
            $.ajax({
                url: `https://suggest.taobao.com/sug?code=utf-8&q=${valcontent}&_ksTS=1555472315209_469&callback=taobao`,
                dataType: 'jsonp',
                jsonpCallback: "taobao",
                success: function(data) {
                    let str = ``;
                    $.each(data.result, function(index, value) {
                        str += `<li>${value[0]}</li>`;
                    })
                    $el.$oUl.html(str);
                }
            })

        }
    }
    new Searchbox().init()
})();