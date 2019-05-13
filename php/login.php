<?php
    include "connect.php";
    $username=$_POST['username'];
    $password=$_POST['password'];
    $name=mysql_query("select * from usre where username='$username' and password='$password'"); 
	if(mysql_fetch_array($name,MYSQL_ASSOC)){
        header("location:http://10.31.163.84/1902%20JS/st/projectname/src/index1.html");//页面的跳转
	}else{
        header("location:http://10.31.163.84/1902%20JS/st/projectname/src/login.html");//页面的跳转
    }
    //在PHP中获取数组中的某一项？？？？     print_r($arr):输出整个数组 
    //  $arr['password']   获取密码 进行密码匹配   匹配成功 跳转到首页  不成功 继续登录
?>