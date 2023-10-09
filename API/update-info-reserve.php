<?php

require_once('../Config/config.php');

if($_SERVER['REQUEST_METHOD'] == "POST") {
     
     $id = $_POST['id'];
     $name = $_POST['name'];
     $gender = $_POST['gender'];
     $status = $_POST['status'];
     $address = $_POST['address'];
    //  print_r($id_user);
    
    $query = "UPDATE tb_agent SET agent_name = '".$name."', gender = '".$gender."', status = '".$status."', address = '".$address."' WHERE id_agent = '".$id."'";
    $stmt = $connect->prepare($query);
    $stmt->execute();
    
    $items_arr = array();
    $items_arr['result'] = array();

    $items = array(
        "id" => $id,
        "name" => $name,
        "gender" => $gender,
        "status" => $status,
        "address" => $address,
        "message" => "success",
        "code" => 200
    );
    array_push($items_arr['result'], $items);
    echo json_encode($items_arr);  

    http_response_code(200);
}else {
    http_response_code(405);
}

?>