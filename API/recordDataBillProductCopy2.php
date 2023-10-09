<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $product = $_POST['product'];
        $detail = $_POST['detail'];
        $total = $_POST['total'];
        // $date = $_POST['date'];

        $query = "INSERT INTO tb_order(no_order, orderlist, orderdetail, amount) VALUES(?, ?, ?, ?)";
        // $query = "INSERT INTO tb_orders(no_order, id_product, amount_product, level_product, count, mat_level, type_sale, shippingtime, total, date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $connect->prepare($query);

        $product = json_encode($product, JSON_UNESCAPED_UNICODE);
        $detail = json_encode($detail, JSON_UNESCAPED_UNICODE);
        $noOrder = round(microtime(true) * 1000);
        // print_r($product);
        // print_r($details);
        // echo $details;
        if($stmt->execute([
            $noOrder, $product, $detail, $total
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
        
    }
    else {
        http_response_code(405);
    }

?>