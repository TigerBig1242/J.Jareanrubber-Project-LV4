<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "GET") {
        // $beginDate = $_POST['beginDate'];
        // $endDate = $_POST['endDate'];
        $query = "SELECT * FROM tb_orders";
        $stmt = $connect->prepare($query);
        if($stmt->execute([
            // $beginDate, $endDate
        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object = new stdClass;
                $object->Result = array();

                // $items = array();
                // $items['result'] = array();

                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    // print_r($row);

                    array_push($object->Result, $row);
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