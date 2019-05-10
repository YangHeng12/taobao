<?php
    include "connect.php";
    $username=$_POST['username'];
	$name=mysql_query("select * from usre where username='$username'");
	if(mysql_fetch_array($name,MYSQL_ASSOC)){
		echo 'false';
	}else{
		echo 'true';
    }
    

    //单击注册按钮,按钮的值为注册,将表单的值添加的数据库.
	if(isset($_POST['submit']) && $_POST['submit']=="注册"){
		$user=$_POST['username'];
		$pass=$_POST['password'];
		$IP=$_POST['IP'];
		$query="insert usre(sid,username,password,ip,time) values(null,'$user','$pass','$IP',NOW())";
		mysql_query($query);
        header("location:http://10.31.163.84/1902%20JS/st/projectname/src/login.html");//页面的跳转
    }
?>