<?php
   include "connect.php";
    //获取数据库中信息 渲染
   $namess=mysql_query('select * from tao');  //获取结果集  记录集
   $arr =Array(); 
    // 通过循环 将获取到的每一项结果集的值放入数组中
    for($i=0;$i<mysql_num_rows($namess);$i++){
        $arr[$i]=mysql_fetch_array($namess,MYSQL_ASSOC);
    };
    //print_r($arr);
    // 将数组转换为JSON格式的字符串 输出到网页中
    echo json_encode($arr);
?>