<?php

    require_once("../Config/config.php");

    if($_SERVER["REQUEST_METHOD"] == "GET") {
        $query = "SELECT * FROM tb_product";
        $stmt = $connect->prepare($query);
        $object = new stdClass;

        if($stmt->execute()) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    array_push($object->Result, $row);
                }
            }
            else {
                $object = new stdClass;
                $object->ResponseCode = 200;
                $object->ResponseMessage = "Fail";
                $object->Log = 2;
                http_response_code(400);
            }
            echo json_encode($object);
        }
        else {
            $object = new stdClass;
            $object->ResponseCode = 200;
            $object->ResponseMessage = "Fail";
            $object->Log = 1;
            http_response_code(400);
        }
    }
    else {
        http_response_code(405);
    }

?>