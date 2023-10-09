<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $id = $_POST['id'];
        // $status = $_POST['status'];
        // print_r($id);
           
                        $query = "UPDATE tb_offersale SET status = ? WHERE id_agent = ?";
                        $stmt = $connect->prepare($query);

                        if($stmt->execute([
                            'อนุมัติ', $id
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
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>