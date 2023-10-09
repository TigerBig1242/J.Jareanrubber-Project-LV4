<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "GET") {
        // $inputBegin = $_POST['inputBegin'];
        $query = "SELECT * FROM tb_orderproduct WHERE amountProduct >= 1500 AND levelProduct IN('A', 'B', 'C') ORDER BY amountProduct DESC LIMIT 3";
        $stmt = $connect->prepare($query);
        

        if($stmt->execute([
            // $inputBegin
        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object = new stdClass;
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    array_push($object->Result, $row);
                    // print_r($row);
                }
                $object->ResponseCode = 200;
                $object->ResponseMessage = "Success";
            }
            else {
                $object = new stdClass;
                $object->ResponseCode = 400;
                $object->ResponseMessage = "Fail";
                $object->Log = 2;
            }
        }
        else {
            $object = new stdClass;
            $object->ResponseCode = 400;
            $object->ResponseMessage = "Fail";
            $object->Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>