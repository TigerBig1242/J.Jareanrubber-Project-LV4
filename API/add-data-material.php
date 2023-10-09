<?php

    require_once("../Config/config.php");

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $numDayMat = $_POST["numDayMat"];
        $gradMat = trim($_POST["gradMat"]);
        $query = "INSERT INTO tb_material(num_mat, mat_level) VALUES(?, ?)";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $numDayMat, $gradMat
        ])) {
            $object = new stdClass;
            $object->ResponseCode = 200;
            $object->ResponseMessage = "Success";
        }
        else {
            $object = new stdClass;
            $object->ResponseCode = 400;
            $object->ResponseMessage = "Fail";
            $object->Log = 1;
        }

        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>