<?php

    require_once('../Config/config.php');

    @header('Content-Type: application/json');
    @header("Access-Control-Allow-Origin: *");
    @header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $token = $_POST['token'];

        $query = "SELECT id_emp, token FROM tb_employee WHERE token =?";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            $token
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $object = new stdClass();
                $object -> RespCode = 200;
                $object -> RespMessage = 'Good';
            }
            else {
                $object = new stdClass();
                $object -> RespCode = 400;
                $object -> RespMessage = 'Fail';
                $object -> Log = 2;
            }
        }
        else {
            $object = new stdClass();
            $object -> RespCode = 400;
            $object -> RespMessage = 'Fail';
            $object -> Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

?>