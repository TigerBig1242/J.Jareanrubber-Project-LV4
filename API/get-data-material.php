<?php

    require_once("../Config/config.php");
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $query = "SELECT * FROM tb_material";
        $stmt = $connect->prepare($query);
        $stmt->execute();

        $itemArr = array();
        $itemArr['result'] = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            array_push($itemArr['result'], $row);
        }
        echo json_encode($itemArr);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>