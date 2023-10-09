<?php

    require_once("../Config/config.php");
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['id'];
        $amountProduct = $_POST["amountProduct"];
        $gradProduct = $_POST["gradProduct"];
        $query = "INSERT INTO tb_product(id_agent, amount, product_grad) VALUES(?, ?, ?)";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $id, $amountProduct, $gradProduct
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
            http_response_code(400);
        }

        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }


?>