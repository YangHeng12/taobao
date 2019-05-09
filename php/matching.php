<?php
    include "connect.php";
    if(isset($_GET['sid'])){
        $sid=$_GET['sid'];
        $result=mysql_query("select * from tao where sid=$sid");
        echo json_encode(mysql_fetch_array($result,MYSQL_ASSOC));
    }
?>