<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "GET") {
        $query = "SELECT * FROM tb_material";
        $stmt = $connect->prepare($query);
        $object = new stdClass;
        // print_r($query);
        if($stmt->execute()) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    // print_r($row);
                    $item = array(
                        "matID" => $mat_id,
                        "material" => $num_mat,
                        "level" => $mat_level
                    );
                    array_push($object->Result, $item);
                }
                $object->RespCode = 200;
                $object->RespMessage = "Success";
                http_response_code(200);
            }
            else {
                $object->RespCode = 400;
                $object->RespMessage = "Fail";
                $object->Log = 2;
                http_response_code(400);
            }        
        }
        else {
            $object->RespCode = 400;
            $object->RespMessage = "Fail";
            $object->Log = 2;
            http_response_code(400);
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>