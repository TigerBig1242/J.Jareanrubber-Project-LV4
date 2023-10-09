<?php

    require_once("../Config/config.php");

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $product = $_POST["Product"];
        $Amount = 0;
        $object = new stdClass;
        $query = "SELECT * FROM tb_product";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            // $productData["productID"]
        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $queryProduct = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $items = array(
                        "id" => $id_product,
                        "amount" => $amount
                    );
                    array_push($queryProduct, $items);
                }

                for($i = 0; $i < count($product); $i++) {
                    for($k = 0; $k < count($queryProduct); $k++) {
                        if(intval($product[$i]['idProduct']) == intval($queryProduct[$k]['id'])) {
                            $Amount += intval($product[$i]['amountProduct']) - intval($queryProduct[$k]['amount']);
                        }
                    }
                }

                    $query = "UPDATE tb_product SET amount = ? WHERE id_product = ?";
                    $stmt = $connect->prepare($query);
                    foreach($product as $amount => $id) {
                        // var_dump($id);
                        if($stmt->execute([
                            $Amount, $id['idProduct']
                        ])) {
                            $object->ResponseCode = 200;
                            $object->ResponseMessage = "Success";
                            $object->Amount = new stdClass;
                            $object->Amount = $Amount;
                            http_response_code(200);
                        }
                        else {
                            $object = new stdClass;
                            $object->ResponseCode = 400;
                            $object->ResponseMessage = "Fail";
                            $object->Log = 3;
                        }
                    }
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