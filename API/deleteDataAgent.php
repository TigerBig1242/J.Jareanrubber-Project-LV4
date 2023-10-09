<?php

    include_once("../Config/config.php");
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST["id"];
        $query = "DELETE FROM tb_agent WHERE id_agent = '".$id."' ";
        $stmt = $connect->prepare($query);
        $stmt->execute();

        $itemArray = array();
        $itemArray['result'] = array();

        $items = array(
            "msg" => "Success",
            "code" => 200
        );
        array_push($itemArray['result'], $items);
        echo json_encode($itemArray);
        http_response_code(200);
    }
    else {
        http_response_code(405);

    }

?>