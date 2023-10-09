<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $product = $_POST['product'];
        print_r($product);

        $query = "INSERT INTO tb_orders(no_order, id_product, amount_product, level_product, count, mat_level, type_sale, shippingtime, total, date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $connect->prepare($query);

        // $product = json_encode($product);
        // $detail = json_encode($detail);
        $noOrder = round(microtime(true) * 1000);

        foreach($product as $products) {
            if($stmt->execute([
                $noOrder, $products['products']['idProduct'], $products['amountProduct'], $products['levelProduct'], 
                $products['count'], $products['MatLevel'], $products['ShippingTime'], $products['TypeSale'],
                $products['total'], $products['date']
            ])) {
                $object = new stdClass;
                $object->ResponseCode = 200;
                $object->ResponseMessage = "Success";
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
    }
    else {
        http_response_code(405);
    }

?>