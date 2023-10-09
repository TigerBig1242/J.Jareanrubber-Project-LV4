<?php

    require_once("../Config/config.php");

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $object = new stdClass;
        // $Amount = [];
        $Amount = 0;
        $product = $_POST["listProduct"];
        // $dataProduct = json_encode($product, JSON_FORCE_OBJECT);
        // print_r($dataProduct);
        // print_r(count($product));
        // print_r($product);

        $query = "SELECT * FROM tb_product";
        $stmt = $connect->prepare($query);

        if($stmt->execute()) {
            $queryProduct = array();
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $items = array(
                    "id" => $id_product,
                    "amount" => $amount
                );
                array_push($queryProduct, $items);
            }
            // print_r(count($queryProduct));
            
                    // $query = "UPDATE tb_product SET amount = ? WHERE id_product = ?";
                    // $stmt = $connect->prepare($query);
                    // foreach($product as $id => $amount) {
                    //     if($product) {
                    //         $amount = $Amount;
                    //         $stmt->execute([$amount, $id]);
                    //     }
                    // }

                    // $object ->ResponseCode = 200;
                    // $object ->Amount = $Amount;
                    // $object ->Amount = $amount;
                    // echo json_encode($object);
                    // http_response_code(200);

            // print_r($queryProduct);
            for($i = 0; $i < count($product); $i++) {
                for($k = 0; $k < count($queryProduct); $k++) {
                    if(intval($product[$i]['idProduct']) == intval($queryProduct[$k]['id'])) {
                        $Amount += intval($product[$i]['amountProduct']) - intval($queryProduct[$k]['amount']);
                        print_r($Amount);
                        // break;
                    }
                }
            }

                    // $object ->ResponseCode = 200;
                    // $object ->Amount = $Amount;
                    // $object ->Amount = $amount;
                    // $Product =  json_encode($product);
                    // print_r($Product);
                    // http_response_code(200);
                    
                    // $idProduct = [];
                    for($x = 0; $x < count($product); $x++) {
                        $idProduct = $product[$x]['idProduct'];
                        print_r($idProduct);
                    }
                    $object ->ResponseCode = 200;
                    $object ->Amount = $Amount;
                    // $IDProduct = json_encode($idProduct);
                    // print_r($IDProduct);
                    // $id = json_encode($idProduct);
                    // print_r($id);
                    // $sum = $Amount - $Amount;
                    // $sum = json_encode($Amount); 
                    // $query = "UPDATE tb_product SET amount = CASE id_product WHEN ? THEN ? END WHERE id_product IN(?)";
                    $query = "UPDATE tb_product SET amount = ? WHERE id_product = ?";

                    $stmt = $connect->prepare($query);
                    if($stmt->execute([
                        $Amount, $product
                    ])) {
                        // $object->Amount = new stdClass;
                        // $object->Amount->Amount = $Amount;
                        $object->ResponseCode = 200;
                        $object->ResponseMessage = "Success";
                        http_response_code(200);
                    }
                    else {
                        $object = new stdClass;
                        $object->ResponseCode = 400;
                        $object->ResponseMessage = "Fail";
                        $object->log = 1;
                        http_response_code(405);
                    }
            
        }
        else {
            $object = new stdClass;
            $object->ResponseCode = 400;
            $object->ResponseMessage = "Fail";
            $object->log = 2;
            http_response_code(405);
        }
        echo json_encode($object);
    }
    else {
        http_response_code(405);
    }

?>