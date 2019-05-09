<?php
    header('content-type:text/html;charset=utf-8'); //设置字符编码。
    //链接数据库
    define('TIT','localhost');//定义常量
    define('NAME','root');//定义常量
    define('PASS','');//定义常量
    $sjk=mysql_connect(TIT,NAME,PASS); //链接数据库

    mysql_select_db('taobao');//选择数据库
    mysql_query('SET NAMES UTF8');//设置获取到的内容编码
?>