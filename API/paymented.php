<?php

    require_once("../Config/config.php");
    if($_SERVER["REQUEST_METHOD"] == "GET") {
        $query = "SELECT id_offersale, amount, price, status, num_day, mat_grad, date FROM tb_offersale WHERE status = 'จ่ายเงินแล้ว' ";
        $stmt = $connect->prepare($query);
        $object = new stdClass;

        if($stmt->execute()) {
            $num = $stmt->rowCount();

            if($num > 0) {
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $items = array(
                        "id" => $id_offersale,
                        "amount" => $amount,
                        "price" => $price,
                        "status" => $status,
                        "numDay" => $num_day,
                        "matGrad" => $mat_grad,
                        "date" => $date
                    );
                    array_push($object->Result, $items);
                }
                $object->ResponseCode = 200;
                $object->ResponseMessage = "Success";
                http_response_code(200);
            }
            else {
                $object->ResponseCode = 400;
                $object->ResponseMessage = "Fail";
                $object->Log = 2;
                http_response_code(400);
            }
            echo json_encode($object);
        }
        else {
            $object->ResponseCode = 400;
            $object->ResponseMessage = "Fail";
            $object->Log = 1;
            http_response_code(400);
        }
    }
    else {
        http_response_code(400);
    }

?>