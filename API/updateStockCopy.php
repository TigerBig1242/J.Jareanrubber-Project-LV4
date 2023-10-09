<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $sumAmount = $_POST['sumAmount'];
        $idStock = $_POST['id'];
        $Count = 1;
        $Amount = 0;
        $query = "SELECT * FROM tb_stockmaterial";
        $stmt = $connect->prepare($query);
        // print_r($sumAmount);
        // print_r($idStock);
        if($stmt->execute([

        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $queryMaterial = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $items = array(
                        'idMat' => $ST_MaterialID,
                        'amount' => $Amount_Material,
                        'level' => $Level_Material
                    );
                    array_push($queryMaterial, $items);

                    for($i = 0; $i < count($idStock); $i++) {
                        for($k = 0; $k < count($queryMaterial); $k++) {
                                if($idStock[$i]['id'] == $queryMaterial[$k]['idMat']) {
                                    $Amount += intval($queryMaterial[$k]['amount']) * intval($Count);
                                    $query = "UPDATE tb_stockmaterial SET Amount_Material = ? WHERE ST_MaterialID = ?";
                                    $stmt = $connect->prepare($query);
                                    $object = new stdClass;
                                    foreach($idStock as $id) {
                                            if($stmt->execute([
                                                $sumAmount, $id['id']
                                            ])) {
                                                $object->ResponseCode = 200;
                                                $object->ResponseMessage = "Success";
                                                http_response_code(200);
                                            }
                                            else {
                                                $object->ResponseCode = 400;
                                                $object->ResponseMEssage = "Fail";
                                                $object->Log = 2;
                                                http_response_code(400);
                                            }
                                    }
                                }
                        }
    
                                    // $query = "UPDATE tb_stockmaterial SET Amount_Material = ? WHERE ST_MaterialID = ?";
                                    // $stmt = $connect->prepare($query);
                                    // $object = new stdClass;
                                    // foreach($idStock as $id) {
                                    //         if($stmt->execute([
                                    //             $Amount, $id['id']
                                    //         ])) {
                                    //             $object->ResponseCode = 200;
                                    //             $object->ResponseMessage = "Success";
                                    //             http_response_code(200);
                                    //         }
                                    //         else {
                                    //             $object->ResponseCode = 400;
                                    //             $object->ResponseMEssage = "Fail";
                                    //             $object->Log = 2;
                                    //             http_response_code(400);
                                    //         }
                                    // }
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