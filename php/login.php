<?php
    include "connect.php";
    $username=$_POST['username'];
    $password=$_POST['password'];
    $name=mysql_query("select * from usre where username='$username'");
    $word=mysql_query("select * from usre where password='$password'");
	if(mysql_fetch_array($name,MYSQL_ASSOC) && mysql_fetch_array($word,MYSQL_ASSOC)){
        header("location:http://10.31.163.84/1902%20JS/st/projectname/src/index1.html");//页面的跳转
	}else{
        header("location:http://10.31.163.84/1902%20JS/st/projectname/src/login.html");//页面的跳转
    }
?>