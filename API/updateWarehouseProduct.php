<?php

    include_once("../Config/config.php");
    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $amount = $_POST['amount'];
        $materialLevel = $_POST['POST'];
        $Amount = 0;
        $query = "SELECT * FROM tb_warehouseproduct";
        $stmt = $connect->prepare($query);
        $object = new stdClass;

        if($stmt->execute()) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $warehouseProduct->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $items = array(
                        "warehouseID" => $WH_ProductID,
                        "amountProduct" => $AmountProduct,
                        "levelProduct" => $LevelProduct
                    );
                    array_push($warehouseProduct->Result, $items);
                }

                for($i = 0; $i < count($warehouseProduct); $i++) {
                    if($warehouseProduct[$i]['levelProduct'] == $materialLevel) {
                        $Amount = $warehouseProduct[$i]['amountProduct'] - $amount;
                    }
                }

                $queyUpdate = "UPDATE tb_warehouseproduct SET AmountProduct = ? WHERE = LevelProduct";
                $stmt = $connect->prepare($queyUpdate);
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

    }
    else {
        http_response_code(405);
    }

?>