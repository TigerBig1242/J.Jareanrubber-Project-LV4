<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $id = $_POST['id'];

        $query = "SELECT * FROM tb_offersale WHERE id_offersale = ?";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $id
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $query = "UPDATE tb_offersale SET status = ? WHERE id_offersale = ?";
                $stmt = $connect->prepare($query);

                if($stmt->execute([
                    "ไม่อนุมัติ", $id
                ])) {
                    $object = new stdClass;
                    $object->RespCode = 200;
                    $object->RespMessage = "Success";
                }
                else {
                    $object = new stdClass;
                    $object->RespCode = 200;
                    $object->RespMessage = "Success";
                    $object->Log = 3;
                }
            }
            else {
                $object = new stdClass;
                $object->RespCode = 200;
                $object->RespMessage = "Success";
                $object->Log = 2;
            }
        }
        else {
            $object = new stdClass;
            $object->RespCode = 200;
            $object->RespMessage = "Success";
            $object->Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>