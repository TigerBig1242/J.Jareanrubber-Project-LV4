<?php

    require_once("../Config/config.php");
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['id'];
        $amountProduct = $_POST["amountProduct"];
        $gradProduct = trim($_POST["gradProduct"]);
        $Amount = 0;
        $count = 1;
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

        $querySecond = "SELECT * FROM tb_product";
        $statement = $connect->prepare($querySecond);
        if($statement->execute()) {
            $num = $statement->rowCount();
            if($num > 0) {
                $arrayItems = array();
                while($row = $statement->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $items = array(
                        "id" => $id_product,
                        "amount" => $amount,
                        "level" => $product_grad
                    );
                    array_push($arrayItems, $items);
                }

                for($i = 0; $i < count($arrayItems); $i++) {
                    if(trim(strval($arrayItems[$i]['level'])) == strval($gradProduct)) {
                        $Amount += $arrayItems[$i]['amount'] * $count;
                    }
                }

                $queryThird = "UPDATE tb_warehouseproduct SET AmountProduct = ? WHERE LevelProduct = ?";
                $statement = $connect->prepare($queryThird);
                if($statement->execute([
                    $Amount, $gradProduct
                ])) {

                }
                else {
                    $object = new stdClass;
                    $object->ResponseCode = 400;
                    $object->ResponseMessage = "Fail";
                    $object->Log = 4;
                    http_response_code(400);
                }
            }
            else {
                $object = new stdClass;
                $object->ResponseCode = 400;
                $object->ResponseMessage = "Fail";
                $object->Log = 3;
                http_response_code(400);
            }
        }
        else {
            $object = new stdClass;
            $object->ResponseCode = 400;
            $object->ResponseMessage = "Fail";
            $object->Log = 2;
            http_response_code(400);
        }

        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }


?>