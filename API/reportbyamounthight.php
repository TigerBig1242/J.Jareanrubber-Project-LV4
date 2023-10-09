<?php

    require_once("../Config/config.php");
    if($_SERVER['REQUEST_METHOD'] == "GET") {
        $query = "SELECT amount_product, level_product, TRIM(level_product), SUM(amount_product) FROM tb_orders WHERE date GROUP BY level_product ORDER BY SUM(amount_product) DESC LIMIT 2";
        $stmt = $connect->prepare($query);
        $object = new stdClass;

        if($stmt->execute()) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    // $items = array(
                    //     "amount" => $amount_product,
                    //     "level" => trim($level_product)
                    // );
                    array_push($object->Result, $row);
                }
                $object->ResponseCode = 200;
                $object->ResponseMessage = "Success";
            }
            else {
                $object = new stdClass;
                $object->ResponseCode = 400;
                $object->ResponseMessage = 'Fail';
                $object->Log = 2;
            }
        }
        else {
            $object = new stdClass;
            $object->ResponseCode = 400;
            $object->ResponseMessage = 'Fail';
            $object->Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>