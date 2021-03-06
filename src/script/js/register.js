$(function() {
    $('#checkform').validate({
        rules: {
            username: {
                required: true,
                minlength: 4,
                maxlength: 10,
                remote: { //后端返回的结果一定是true或者false字符串。
                    type: 'post',
                    url: 'http://10.31.163.84/1902%20JS/st/projectname/php/register.php'
                }
            },
            password: {
                required: true,
                rangelength: [6, 12],
            },
            repass: {
                required: true,
                equalTo: '#password'
            },
            IP: {
                required: true,
                digits: true,
                minlength: 11,
                maxlength: 11,
            }
        },
        messages: {
            username: {
                required: '<em class="err">用户名不能为空</em>',
                minlength: '用户名不能小于4位',
                maxlength: '用户名不能大于10位',
                remote: '<span class="err">用户名已存在</span>'
            },
            password: {
                required: '密码不能为空',
                rangelength: '密码不能小于6位不能大于12位'
            },
            repass: {
                required: '密码重复不能为空',
                equalTo: '密码不匹配'
            },
            IP: {
                required: '手机号码不能为空',
                digits: '你输入的格式有误',
                minlength: '格式有误：长度不能小于11位',
                maxlength: '格式有误：长度不能超出11位',
            }
        }

    });
});

$.validator.setDefaults({
    //添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)
    success: function(label) {
        //label.text('√').css('color','green').addClass('valid');
        label.append('<img src="http://10.31.163.84/1902%20JS/st/projectname/src/img/signed-right-icon.png">');
    }
});




// 阅读条款
;
(function() {
    let $agree = $(".agree");
    let $vancl_registor = $('.vancl_registor');
    if ($agree.prop("checked")) {
        $vancl_registor.css({
            background: "#f40"
        })
    }

    $agree.on("click", function() {
        if ($agree.prop("checked")) {
            $vancl_registor.css({
                background: "#f40"
            })
        } else {
            $vancl_registor.css({
                background: '#9A9A9A'
            })
        }
    })
})();