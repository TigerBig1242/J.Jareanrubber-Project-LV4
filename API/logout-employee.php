<?php 

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $token = $_POST['token'];

        $query = "SELECT id_emp, token FROM tb_employee WHERE token = ?";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $token
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $query = "UPDATE tb_employee SET token = ? WHERE token = ?";
                $stmt = $connect->prepare($query);
                if($stmt->execute([
                    null, $token
                ])) {
                    $object = new stdClass();
                    $object->RespCode = 200;
                    $object->RespMessage = "Good";
                }
                else {
                    $object = new stdClass();
                    $object->RespCode = 400;
                    $object->RespMessage = "Fail";
                    $object->Log = 3;
                }
            }
            else {
                $object = new stdClass();
                $object->RespCode = 400;
                $object->RespMessage = "Fail";
                $object->Log = 2;
            }
        }else {
            $object = new stdClass();
            $object->RespCode = 400;
            $object->RespMessage = "Fail";
            $object->Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }else {
        http_response_code(405);
    }

?>