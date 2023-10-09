<?php

    include_once("../Config/config.php");
    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        $query = "SELECT id_agent, agent_name, gender, image, status, address FROM tb_agent WHERE status = 'ตัวแทน' ";
        $stmt = $connect->prepare($query);
        $object = new stdClass();

        if($stmt->execute()) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $items = array(
                        "id" => $id_agent,
                        "image" => $image,
                        "name" => $agent_name,
                        "gender" => $gender,
                        "status" => $status,
                        "address" => $address
                    );
                    array_push($object->Result, $items);
                    // array_push($object->Result, $row);
                }
                $object->ResponseCode = 200;
                $object->ResponseMessage = "Success";
                http_response_code(200);
            }
            else {
                $object->ResponseCode = 400;
                $object->ResponseMessage = "Fail";
                $object->Log = 2;
                http_response_code(400);
            }
            echo json_encode($object);
        }
        else {
            $object->ResponseCode = 400;
            $object->ResponseMessage = "Fail";
            $object->Log = 1;
            http_response_code(400);
        }

    }
    else {
        http_response_code(405);
    }

?>