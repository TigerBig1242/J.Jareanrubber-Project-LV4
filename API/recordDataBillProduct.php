<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $product = $_POST['product'];
        $detail = $_POST['detail'];
        $total = $_POST['total'];
        // $date = $_POST['date'];

        // $query = "INSERT INTO tb_order(no_order, orderlist, orderdetail, amount) VALUES(?, ?, ?, ?)";
        // $query = "INSERT INTO tb_orders(no_order, id_product, amount_product, level_product, count, mat_level, type_sale, shippingtime, total, date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $query = "INSERT INTO tb_orders(no_order, id_product, amount_product, level_product, count, mat_level, type_sale, shippingtime, total) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $connect->prepare($query);

        // $product = json_encode($product);
        // $details = json_encode($detail, JSON_FORCE_OBJECT);
        $noOrder = round(microtime(true) * 1000);
        // print_r($product);
        // print_r($details);
        // echo $details;

        foreach($product as $products) {
            foreach($detail as $details) {
                if($stmt->execute([
                    $noOrder, $products['idProduct'], $products['amountProduct'], $products['levelProduct'], 
                    $products['count'], $details['MatLevel'],$details['TypeSale'], $details['ShippingTime'], $total, //$date 
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
    }
    else {
        http_response_code(405);
    }

?>