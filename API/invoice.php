<?php

    require_once("../Config/config.php");

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST("id");
        $query = "SELECT id_agent FROM tb_agent WHERE id_agent = ?";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $id
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                
            }
            else {

            }
        }
        else {

        }
    }
    else {
        http_response_code(405);
    }

?>