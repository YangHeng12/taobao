$('#login').validate({
    rules: {
        username: {
            required: true,
            remote: { //后端返回的结果一定是true或者false字符串。
                type: 'post',
                url: 'http://10.31.163.84/1902%20JS/st/projectname/php/login.php'
            }
        },
        password: {
            required: true,

            remote: { //后端返回的结果一定是true或者false字符串。
                type: 'post',
                url: 'http://10.31.163.84/1902%20JS/st/projectname/php/login.php'
            }
        },

    },
    messages: {
        username: {
            required: '<em class="err">用户名不能为空</em>'
        },
        password: {
            required: '密码不能为空'
        }
    }
});