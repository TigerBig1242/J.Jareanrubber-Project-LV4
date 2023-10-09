<?php

    include_once("../Config/config.php");
    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $amount = $_POST['amount'];
        $materialLevel = $_POST['materialLevel'];
        $Amount = 0;
        // print_r($amount);
        // print_r($materialLevel);
        $query = "SELECT * FROM tb_warehouseproduct WHERE LevelProduct = ?";
        $stmt = $connect->prepare($query);
        $object = new stdClass;

        if($stmt->execute([
            $materialLevel
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                // $warehouseProduct->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    if($materialLevel == $LevelProduct) {
                        $Amount = $AmountProduct - $amount;
                        $query = "UPDATE tb_warehouseproduct SET AmountProduct = ? WHERE LevelProduct = ?";
                        $stmt = $connect->prepare($query);

                        if($stmt->execute([
                            $Amount, $materialLevel
                        ])) {
                            $object->ResponseCode = 200;
                            $object->ResponseMessage = "Success";
                        }
                        else {
                            $object = new stdClass;
                            $object->ResponseCode = 400;
                            $object->ResponseMessage = "Fail";
                            $object->Log = 3;
                            http_response_code(400);
                        }
                    }                  
                }

            }
            else {
                $object = new stdClass;
                $object->ResponseCode = 400;
                $object->ResponseMessage = "Fail";
                $object->Log = 2;
                http_response_code(400);
            }
        }
        else {
            $object = new stdClass;
            $object->ResponseCode = 400;
            $object->ResponseMessage = "Fail";
            $object->Log = 1;
            http_response_code(400);
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>