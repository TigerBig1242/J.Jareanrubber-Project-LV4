<?php

    include_once("../Config/config.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        // $token = $_POST["token"];
        // $query = "SELECT * FROM tb_agent WHERE token = ? ";
        $query = "SELECT id_agent, agent_name, gender, image, status, address FROM tb_agent WHERE status = 'ตัวแทน' ";
        $stmt = $connect->prepare($query);
        $stmt->execute();

        $dataArray = array();
        $dataArray['Result'] = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $dataItems = array(
                "id" => $id_agent,
                "name" => $agent_name,
                "gender" => $gender,
                "image" => $image,
                "status" => $status,
                "address" => $address
            );
            array_push($dataArray['Result'], $dataItems);
        }
        echo json_encode($dataArray);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>