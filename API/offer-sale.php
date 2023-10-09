<?php

require_once("../Config/config.php");

if($_SERVER['REQUEST_METHOD'] == "POST") {
    $agent_id = $_POST['id'];
    $amount = $_POST['amount'];
    $price = $_POST['price'];
    $numDay = $_POST['numDay'];
    $matGrad = trim($_POST['matGrad']);
    // print_r($id_agent);

    // $query = "INSERT INTO tb_offersale(amount, price, id_agent) VALUES(?, ?) INNER JOIN tb_agent ON tb_agent.id_agent = tb_offersale.id_agent WHERE id_agent";
    // $query = "INSERT INTO tb_offersale(amount, price, id_agent) SELECT ofs.amount, ofs.price, ag.id_agent FROM tb_agent ag INNER JOIN tb_offersale ofs ON ofs.id_agent = ag.id_agent";
    $query = "INSERT INTO tb_offersale(amount, price,num_day, mat_grad, status, id_agent) VALUES(?, ?, ?, ?, ?, ?)";
    $stmt = $connect->prepare($query);

    if($stmt->execute([
        $amount, $price, $numDay, $matGrad, 'รออนุมัติ', $agent_id
    ])) {
        $object = new stdClass;
        $object->RespCode = 200;
        $object->RespMessage = "Success";
    }
    else {
        $object = new stdClass;
        $object->RespCode = 400;
        $object->RespMessage = "Fail";
        $object->Log = 1;
    }

    echo json_encode($object);
    http_response_code(200);
}
else {
    http_response_code(405);
}

?>