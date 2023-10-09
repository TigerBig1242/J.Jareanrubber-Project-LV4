<?php

    require_once("../Config/config.php");

    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        // $query = "SELECT * FROM tb_offersale";
        $query = "SELECT tb_offersale.*, tb_agent.agent_name FROM tb_offersale INNER JOIN tb_agent ON tb_offersale.id_agent = tb_agent.id_agent WHERE tb_offersale.id_offersale";
        $stmt = $connect->prepare($query);
        $stmt->execute();

        $object= new stdClass;
        $object->Result = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $items = array(
                "id" => $id_offersale,
                "amount" => $amount,
                "price" => $price,
                "status" => $status,
                // "idAgent" => $id_agent,
                "agentName" => $agent_name,
                "date" => $date
            );
            array_push($object->Result, $items);
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>