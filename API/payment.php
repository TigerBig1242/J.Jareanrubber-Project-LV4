<?php

    require_once("../Config/config.php");
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $idProduct = $_POST["idProduct"];
        $query = "SELECT * FROM tb_offersale WHERE id_offersale = ? ";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $idProduct
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    if($idProduct == $id_offersale) {
                        $query = "UPDATE tb_offersale SET status = ? WHERE id_offersale = ?";
                        $stmt = $connect->prepare($query);

                        if($stmt->execute([
                            'จ่ายเงินแล้ว', $idProduct
                        ])) {
                            $object = new stdClass;
                            $object->ResponseCode = 200;
                            $object->ResponseMessage = "Success";
                        }
                        else {
                            $object = new stdClass;
                            $object->ResponseCode = 400;
                            $object->ResponseMessage = "Fail";
                            $object->Log = 4;
                        }
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