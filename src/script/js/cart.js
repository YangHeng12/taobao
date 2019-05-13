;
(function() {
    let $ullist = $(".ullist");
    let str = ``;
    //获取cookie的方法
    if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
        $arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
        $arrnum = getcookie('cookienum').split(','); //cookie商品的num
        $.each($arrsid, function(index, value) {
            goodslist($arrsid[index], $arrnum[index]);
        });
    };

    function goodslist(id, count) {
        $.ajax({
            url: 'http://10.31.163.84/1902%20JS/st/projectname/php/acquire%20table.php', //获取所有数据
            dataType: 'json',
            success: function(data) {
                $.each(data, function(index, value) {
                    if (id == value.sid) { //遍历判断sid和传入的sid是否相同
                        str += ` <ul class="imgullist">
                                    <li class="checkboxlist">
                                        <input type="checkbox">
                                    </li>
                                    <li class="imgbox">
                                        <img src="${value.url}" sid="${value.sid}">
                                        <span>${value.title}</span>
                                    </li>
                                    <li class="imgtitle"><span>${value.title}</span></li>
                                    <li class="imgjg">
                                        ￥<span>${value.money}</span>
                                    </li>
                                    <li class="imgnum"><span>${count}</span></li>
                                    <li class="imgmoy">${value.money*count}</li>
                                    <li class="deletimg">
                                        <button class="deletebtn">删除</button>
                                    </li>
                                </ul>`;
                    }
                });
                $ullist.html(str);
                priceall(); //计算总价
                qsbtn();
            }
        })
    };


    let arrsid = []; //商品的id
    let arrnum = []; //商品的数量

    function cookietoarray() { //获取cookie里面id和num
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
            arrnum = getcookie('cookienum').split(','); //cookie商品的num
        }
    };


    //删除单件
    $('.ullist').on('click', '.deletebtn', function(ev) {
        cookietoarray();
        if (confirm('你确定要删除吗？')) {
            $(this).parents('.imgullist').remove(); //通过当前点击的元素找到整个一行列表，删除
        }
        delgoodslist($(this).parents('.imgullist').find('img').attr('sid'), arrsid);
    });
    //删除选中
    $('.deleteqbbtn a').on('click', function() {
        cookietoarray(); //获取cookie
        if (confirm('你确定要全部删除吗？')) {
            $('.imgullist').each(function() {
                if ($(this).find('input:checkbox').is(':checked')) { //复选框一定是选中的
                    $(this).remove();
                    delgoodslist($(this).find('img').attr('sid'), arrsid);
                }
            });
            priceall();
        }

        if ($('.ullist').find(".imgullist").length == 0) {
            location.reload(true); //通过缓存刷新页面
        }
    });

    //删除cookie
    function delgoodslist(sid, arrsid) { //sid：当前删除的sid，arrsid:cookie的sid的值
        let $index = 0;
        $.each(arrsid, function(index, value) { //删除的sid对应的索引位置。 index:数组项的索引
            if (sid == value) {
                $index = index; //传入的值和数组的值相同，返回值对应的索引。
            }
        });
        arrsid.splice($index, 1); //删除对应值
        arrnum.splice($index, 1); //删除对应值
        addcookie('cookiesid', arrsid.toString(), 7); //添加cookie
        addcookie('cookienum', arrnum.toString(), 7); //添加cookie
    }

    function priceall() { //计算总和  输出
        var $sum = 0;
        var $count = 0;
        $('.imgullist').each(function(index, element) {
            if ($(element).find('.checkboxlist input').prop('checked')) {
                $sum += parseInt($(element).find('.imgnum').find('span').html());
                $count += parseFloat($(element).find('.imgmoy').html());
            }
        });
        $('.right-nav').find('.synum').find("i").html($sum);
        $('.right-nav').find("strong").html('￥' + $count.toFixed(2));
    };


    //5.全选操作
    function qsbtn() {
        $('.cart_checkbox input').on('change', function() {
            $('.imgullist').find(':checkbox').prop('checked', $(this).prop('checked'));
            priceall(); //重新计算总和
            if ($('.cart_checkbox input').prop('checked')) {
                $("#allbtn").css({
                    background: "#f40",
                    cursor: 'pointer'
                })
            } else {
                $("#allbtn").css({
                    background: "#999",
                    cursor: 'not-allowed'
                })
            }
        });

        var $inputs = $('.ullist').find(':checkbox');
        $('.ullist').on('change', $inputs, function() { //事件委托..this指向被委托的元素
            if ($('.ullist').find('input:checkbox').length == $('.ullist').find('input:checked').length) {
                $('.cart_checkbox input').prop('checked', true);
            } else {
                $('.cart_checkbox input').prop('checked', false);
            }
            priceall(); //重新计算总和

            if ($('.ullist').find('input:checked').length != 0) {
                $("#allbtn").css({
                    background: "#f40",
                    cursor: 'pointer'
                })
            } else {
                $("#allbtn").css({
                    background: "#999",
                    cursor: 'not-allowed'
                })
            }


        });
    }
})();