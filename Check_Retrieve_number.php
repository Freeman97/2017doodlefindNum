<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2017/10/28
 * Time: 13:38
 */
header("Content-Type:text/html;charset=utf-8");
$dbms = 'mysql';
$dbName = 'db_party';
$user = 'root';
$pwd = '12345678';
$host='172.28.140.72';
$dsn = "$dbms:host=$host;dbname=$dbName";
$pdo = new PDO($dsn,$user,$pwd);
$pdo->query('set names utf8');

if($pdo){
    $name = $_POST['name'];
    $tel = $_POST['phone'];
    $address = $_POST['mail'];

    $sql = "select * from tb_party where name like :name and tel like :tel and address like :address";
    $result = $pdo->prepare($sql);
    $result->execute(array(':name'=>$name,':tel'=>$tel,':address'=>$address));
    $row = $result->fetch();
    if(!$row){
        $arr = array('check'=>3);
        $result = json_encode($arr);
        $callback = $_GET['callback'];
        echo $callback."($result)";
    }else{
        $arr = array('check'=>$row['ID']);
        $result = json_encode($arr);
        $callback = $_GET['callback'];
        echo $callback."($result)";
    }
}else{
    $arr = array('check'=>4);
    $result = json_encode($arr);
    $callback = $_GET['callback'];
    echo $callback."($result)";
}