<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        // $status = $_POST['อนุมัติ'];
        $status = 'อนุมัติ';
        // $level = $_POST['A'];
        $Level = ' A';
        $amountSum = 0;
        $count = 0;
        $query = ("SELECT *, SUM(amount) FROM tb_offersale WHERE mat_grad = ? AND status = ?");
        $stmt = $connect->prepare($query);
        $object = new stdClass;

        if($stmt->execute([
            $Level, $status
        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    array_push($object->Result, $row);
                }
   
            }
            else {
                $object->ResponseCode = 400;
                $object->ResponseMessage = 'Fail';
                $object->Log = 2;
                http_response_code(400);
            }
            $object->ResponseCode = 200;
            $object->ResponseMessage = 'Success';
            http_response_code(200); 
        }
        else {
            $object->ResponseCode = 400;
            $object->ResponseMessage = 'Fail';
            $object->Log = 1;
            http_response_code(400);
        }
        // echo json_encode($amountSum);
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>