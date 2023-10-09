<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $monthNum = $_POST['numMonth'];
        $query = "SELECT DATE_FORMAT(date, '%m-%Y') AS Date, SUM(amountProduct) AS result FROM tb_orderproduct WHERE MONTH(date) = ? GROUP BY YEAR(date), MONTH(date)";
        $stmt = $connect->prepare($query);
        $object = new stdClass;

        if($stmt->execute([
            $monthNum
        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object = new stdClass;
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    array_push($object->Result, $row);
                }
                $object->ResponseCode = 200;
                $object->ResponseMessage = "Success";
                http_response_code(200);
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