<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $agent_id = $_POST['id'];
        $idStock = $_POST['idStock'];
        // $status = $_POST['status'];
        // print_r($agent_id);
        // print_r($idStock);

        $query = "SELECT * FROM tb_offersale WHERE id_offersale = ?";
        $stmt = $connect->prepare($query);
        $object = new stdClass;

        if($stmt->execute([
            $agent_id
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $matGrad = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    // print_r($row);

                    $items = array(
                        "matGrad" => trim($mat_grad),
                        "STMaterial" => $ST_MaterialID
                    );
                    array_push($matGrad, $items);
                    // print_r($matGrad);
                    if($agent_id == $id_offersale) {
                        for ($i = 0; $i < count($idStock); $i++) {
                            for($k = 0; $k < count($matGrad); $k++) {
                                if(intval($idStock[$i]['level']) == intval($matGrad['matGrad'])) {
                                    $query = "UPDATE tb_offersale SET status = ?, ST_MaterialID = ? WHERE id_offersale = ?";
                                    $stmt = $connect->prepare($query);
                                    foreach($idStock as $id) {
                                        if($stmt->execute([
                                            'อนุมัติ', $id['id'], $agent_id 
                                        ])) {                 
                                            // $object = new stdClass;
                                            $object->RespCode = 200;
                                            $object->RespMessage = 'Success';
                                        }
                                        else {
                                            // $object = new stdClass;
                                            $object->RespCode = 400;
                                            $object->RespMessage = 'Fail';
                                            $object->Log = 4;
                                        }
                                    }
                                }
                            }
                        }
                        // $id = $agent_id;
                        
                    }
                    else {
                        // $object = new stdClass;
                        $object->RespCode = 400;
                        $object->RespMessage = 'Fail';
                        $object->Log = 3;
                    }
                }
            }
            else {
                // $object = new stdClass;
                $object->RespCode = 400;
                $object->RespMessage = 'Fail';
                $object->Log = 2;
                }
        }
        else {
            // $object = new stdClass;
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