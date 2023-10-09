<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $token = $_POST['token'];
        // $object = new stdClass();
        $query = "SELECT * FROM tb_agent WHERE token = ?";
        $stmt = $connect->prepare($query);
        if($stmt->execute([
           $token 
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $userID = 0;
                
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    // print_r($row);
                    // $userID = $id_agent;
                    $object = new stdClass();
                    $object->Result= array();
                    $items =array(
                        "id" => $id_agent,
                        "fullName" => $agent_name,
                        "gender" => $gender,
                        "image" => $image,
                        "status" => $status,
                        "address" => $address
                    );
                    array_push($object->Result, $items);
                }
                // $object = new stdClass();
                $object->RespCode = 200;
                $object->RespMassage = "Success";

            }
            else {
                $object = new stdClass();
                $object->RespCode = 400;
                $object->RespMassage = "Fail";
                $object->Log = 2;   
            }
            // echo json_encode($object);
            // http_response_code(200);
        }
        else {
            $object = new stdClass();
            $object->RespCode = 400;
            $object->RespMassage = "Fail";
            $object->Log = 1;
            http_response_code(400);
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>