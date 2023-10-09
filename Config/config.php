<?php 
    $servername = "localhost";
    $database_name = "db_jareanrubber";
    $username = "root";
    $password = "";
    // $port = "3307";
    @header('Content-Type: application/json');
    @header("Access-Control-Allow-Origin: *");
    @header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    
    try {
        $connect = new PDO("mysql:host=$servername; port=3307; dbname=$database_name", $username, $password);
        // Set the PDO error mode to exception
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // echo "Connected successfully";
    } catch (PDOException $e) {
        echo "Connection fail:".$e->getMessage();
    }
?>