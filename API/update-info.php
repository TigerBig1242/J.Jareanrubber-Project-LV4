<?php

require_once('../Config/config.php');

if($_SERVER['REQUEST_METHOD'] == "POST") {
     
     $id_user = $_POST['id'];
     $name_user = $_POST['name'];
     $gender_user = $_POST['gender'];
     $status_user = $_POST['status'];
     $address_user = $_POST['address'];
    //  print_r($id_user);
    
    $query = "SELECT id_agent, agent_name, gender, status, address FROM tb_agent WHERE id_agent = ?";
    $stmt = $connect->prepare($query);

    if($stmt->execute([
        $id_user
    ])) {
        $num = $stmt->rowCount();
        if($num == 1) {

        // Fetch data from database as column name

            // while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            //     extract($row);

            //     if($id_user == $id_agent) {
            //         $agent_ID = $id_agent;
            //         // print_r($agent_ID);

            //         $query = "UPDATE tb_agent SET agent_name = ?, gender = ?, status = ?, address = ? WHERE id_agent = ?";
            //         // $query = "UPDATE tb_agent SET agent_name = '".$name_user."', gender = '".$gender_user."', status = '".$status_user."', address = '".$address_user."' WHERE id_agent = '".$agent_ID."' ";
            //         $stmt = $connect->prepare($query);

            //         if($stmt->execute([
            //             $agent_ID, $name_user, $gender_user, $status_user, $address_user
            //         ])) {
            //             $object = new stdClass();
            //             $object->RespCode = 200;
            //             $object->RespMessage = "success";
            //             $object->Result = array();

            //             $items = array(
            //                 "id" => $agent_ID,
            //                 "fullName" => $name_user,
            //                 "gender" => $gender_user,
            //                 "status" => $status_user,
            //                 "address" => $address_user
            //             );
            //             array_push($object->Result, $items);
            //         }
            //         else {
            //             $object = new stdClass();
            //             $object->RespCode = 400;
            //             $object->RespMessage = "fail";
            //             $object->Log = 3;
            //         }
            //     }
            // }
            // $object->RespCode = 200;
            // $object->RespMessage = "success";
            
        // Not fetch data from database column name

            // $query = "UPDATE tb_agent SET agent_name = ?, gender = ?, status = ?, address = ? WHERE id_agent = ?";
            $query = "UPDATE tb_agent SET agent_name = '".$name_user."', gender = '".$gender_user."', status = '".$status_user."', address = '".$address_user."' WHERE id_agent = '".$id_user."' ";
            $stmt = $connect->prepare($query);

            if($stmt->execute([
                // $id_user, $name_user, $gender_user, $status_user, $address_user
            ])) {
                $object = new stdClass();
                $object->RespCode = 200;
                $object->RespMessage = "success";
                $object->Result = array();
                // $item_arr = array();
                // $item_arr['result'] = array();

                $items = array(
                    "id" => $id_user,
                    "name" => $name_user,
                    "gender" => $gender_user,
                    "status" => $status_user,
                    "address" => $address_user,
                    // "message" => "success",
                    // "code" => 200
                );
                array_push($object->Result, $items);
                // array_push($item_arr['result'], $items);
            }
            else {
                $object = new stdClass();
                $object->RespCode = 400;
                $object->RespMessage = "fail";
                $object->Log = 3;
            }
        }
        else {
            $object = new stdClass();
            $object->RespCode = 400;
            $object->RespMessage = "fail";
            $object->Log = 2;
        }
    }
    else {
        $object = new stdClass();
        $object->RespCode = 400;
        $object->RespMessage = "fail";
        $object->Log = 1;
    }
    echo json_encode($object);
    // echo json_encode($item_arr);
    http_response_code(200);
}else {
    http_response_code(405);
}

?>