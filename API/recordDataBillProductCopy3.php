<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $amount = $_POST['amount'];
        $price = $_POST['price'];
        $shippingTime = $_POST['shippingTime'];
        $levelMaterial = $_POST['levelMaterial'];
        $typeSale = $_POST['typeSale'];
        $total = $_POST['total'];
        // $date = $_POST['date'];

        // $query = "INSERT INTO tb_order(no_order, orderlist, orderdetail, amount) VALUES(?, ?, ?, ?)";
        // $query = "INSERT INTO tb_orders(no_order, id_product, amount_product, level_product, count, mat_level, type_sale, shippingtime, total, date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $query = "INSERT INTO tb_orderproduct(no_orderProduct, amountProduct, price, shippingTime, levelProduct, typeSale, total) VALUES(?, ?, ?, ?, ?, ?, ?)";
        $stmt = $connect->prepare($query);
        $noOrder = round(microtime(true) * 1000);
        // $no_order = rand(1111111111,9999999999);
        // print_r($no_order);
        $object = new stdClass;

        // $product = json_encode($product);
        // $details = json_encode($detail, JSON_FORCE_OBJECT);
        // print_r($product);
        // print_r($details);
        // echo $details;

        if($stmt->execute([
            $noOrder, $amount, $price, $shippingTime, $levelMaterial, $typeSale, $total
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
        http_response_code(200);
        echo json_encode($object);
    }
    else {
        http_response_code(405);
    }

?>