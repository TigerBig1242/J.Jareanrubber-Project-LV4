<?php

    session_start();
    require_once('../Config/config.php');

    // @header('Content-Type: application/json');
    // @header('Content-Type: application/json; charset=utf-8');
    @header("Access-Control-Allow-Origin: *");
    @header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        
    }
?>

