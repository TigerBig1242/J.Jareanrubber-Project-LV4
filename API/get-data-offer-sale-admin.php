<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $token = $_POST['token'];
        $query = "SELECT * FROM tb_agent WHERE token = ?";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $token
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $agent_id = 0;
                // $offersale_id = 0;
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $agent_id = $id_agent;
                    // $name = $agent_name;
                    // $offersale_id = $id_offersale;
                }

                // $query = "SELECT * FROM tb_offersale";
                $query = "SELECT id_offersale, amount, price, tb_offersale.st_MaterialID, tb_offersale.status, tb_offersale.num_day, tb_offersale.mat_grad, tb_agent.agent_name, tb_offersale.date FROM tb_offersale INNER JOIN tb_agent ON tb_agent.id_agent = tb_offersale.id_agent WHERE tb_offersale.id_agent AND tb_offersale.status = 'รออนุมัติ' ";
                // $offersale_id = 0;
                $stmt = $connect->prepare($query);
                if($stmt->execute([
                    // $agent_id,
                    // $name,
                    // $offersale_id
                ])) {
                    $num = $stmt->rowCount();
                    if($num > 0) {
                        $object = new stdClass;
                        $object->Result = array();
                        // $offersale_id = 0;

                        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                            extract($row);
                            // $agent_id = $id_agent;

                            $items =array(
                                "id" => $id_offersale,
                                "amount" => $amount,
                                "price" => $price,
                                "numDay" => $num_day,
                                "grad" => $mat_grad,
                                "name" => $agent_name,
                                "idAgent" => $id_agent,
                                "stockID" => $st_MaterialID,
                                "status" => $status,
                                "date" => $date
                            );
                            array_push($object->Result, $items);
                        }
                        $object->RespCode = 200;
                        $object->RespMessage = 'Success';
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