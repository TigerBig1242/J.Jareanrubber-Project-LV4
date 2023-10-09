<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $agent_id = $_POST['id'];
        // $status = $_POST['status'];
        // print_r($agent_id);

        $query = "SELECT * FROM tb_offersale WHERE id_offersale = ?";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $agent_id
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    if($agent_id == $id_offersale) {
                        // $id = $agent_id;
                        $query = "UPDATE tb_offersale SET status = ? WHERE id_offersale = ?";
                        $stmt = $connect->prepare($query);

                        if($stmt->execute([
                            'อนุมัติ', $agent_id 
                        ])) {                 
                            $object = new stdClass;
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