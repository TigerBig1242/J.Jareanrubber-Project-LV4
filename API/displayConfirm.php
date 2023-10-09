<?php

    require_once("../Config/config.php");

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $token = $_POST["token"];
        $query = "SELECT * FROM tb_agent WHERE token = ?";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $token
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $agent_id = 0;
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                }

                $query = "SELECT id_offersale, amount, price, tb_offersale.status, tb_offersale.num_day, mat_grad, tb_agent.agent_name, tb_offersale.date FROM tb_offersale INNER JOIN tb_agent ON tb_agent.id_agent = tb_offersale.id_agent WHERE tb_offersale.id_agent AND tb_offersale.status = 'อนุมัติ' ";
                $stmt = $connect->prepare($query);
                if($stmt->execute([
                    
                ])) {
                    $num = $stmt->rowCount();
                    if($num > 0) {
                        $object = new stdClass;
                        $object->Result = array();
                        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                            extract($row);

                            $items = array(
                                "id" => $id_offersale,
                                "amount" => $amount,
                                "price" => $price,
                                "numDay" => $num_day,
                                "matGrad" => $mat_grad,
                                "name" => $agent_name,
                                "idAgent" => $id_agent,
                                "status" => $status,
                                "date" => $date
                            );
                            array_push($object->Result, $items);
                        }
                        $object->RespCode = 200;
                        $object->RespMessage = "Success";
                    }
                    else {
                        $object = new stdClass;
                        $object->RespCode = 400;
                        $object->RespMessage = 'Fail';
                        $object->Log = 4;   
                    }
                }
                else {
                    $object = new stdClass;
                    $object->RespCode = 400;
                    $object->RespMessage = 'Fail';
                    $object->Log = 3;  
                }
            }
            else {
                $object = new stdClass;
                $object->RespCode = 400;
                $object->RespMessage = 'Fail';
                $object->Log = 2; 
            }
        }     
        else {
            $object = new stdClass;
            $object->RespCode = 400;
            $object->RespMessage = 'Fail';
            $object->Log = 1;
        }        
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }
?>

