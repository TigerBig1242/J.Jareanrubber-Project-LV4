<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        // $status = $_POST['อนุมัติ'];
        $status = 'อนุมัติ';
        // $level = $_POST['A'];
        $Level = ['A', 'B', 'C'];
        $amountSum = 0;
        $count = 0;
        $query = ("SELECT * FROM tb_offersale");
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

                // print_r($row);
                for($i = 0; $i < $object; $i++) {
                    for($k = 0; $k < count($Level); $k++) {
                        if(trim($object[$i]['mat_grad']) == $Level[$k]) {
                            if(strval($object[$i]['status']) == strval($status)) {
                                $amountSum += intval($object[$i]['amount']) * intval($count);
                            }
                        }
                    }
                    print_r($amountSum);
                }

                $query = "SELECT *, SUM(amount) FROM tb_offersale WHERE mat_grad = ? AND status = ?";
                $stmt = $connect->prepare($query);
                foreach($Level as $level) {
                    if($stmt->execute([
                        $level, $status
                        ])) {
                            $object->ResponseCode = 200;
                            $object->ResponseMessage = 'Success';
                            http_response_code(200);
                        }
                        else {
                            $object->ResponseCode = 400;
                            $object->ResponseMessage = 'Fail';
                            $object->Log = 3;
                            http_response_code(400);
                        }
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