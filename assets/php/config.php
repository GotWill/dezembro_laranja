<?php

$tipo_conexao = $_SERVER['HTTP_HOST'];

if (($tipo_conexao == 'localhost') || ($tipo_conexao == '127.0.0.1')){

    $servidor = "localhost";
    $usuario = "willian";
    $senha = "willian";
    $banco = "cancer_quiz";  
    // para uso local
  
}else{
  
    $servidor = "quizcancer.mysql.dbaas.com.br";
    $usuario = "quizcancer";
    $senha = "Publicidade@@1";
    $banco = "quizcancer";  
}

$link = mysqli_connect($servidor, $usuario, $senha, $banco);
mysqli_set_charset( $link, 'utf8');
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
