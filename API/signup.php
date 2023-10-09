<?php 

    session_start();
    require_once('../Config/config.php');

    @header('Content-Type: application/json');
    @header("Access-Control-Allow-Origin: *");
    @header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        try {
            $content = @file_get_contents('php://input');
            $json_data = @json_decode($content, true);
            // $username = $_POST['username'];
            // $agentName = $_POST['agentName'];
            // $password = $_POST['password'];
            // $confirmPassword = $_POST['confirmPassword'];
            // $gender = $_POST['gender'];
            // $status = $_POST['status'];
            // $address = $_POST['address'];

            $username = trim(@$json_data["username"]);
            $agentName = trim(@$json_data["agentName"]);
            $password = trim(@$json_data["password"]);
            $confirmPassword = trim(@$json_data["confirmPassword"]);
            $gender = trim(@$json_data["gender"]);
            $image = trim(@$json_data["image"]);
            $status = trim(@$json_data["status"]);
            $address = trim(@$json_data["address"]);


            $data_arr = array();
            $data_arr['result'] =array();

            $sql_query = "INSERT INTO tb_agent (username, agent_name, password, gender, image, status, address) VALUES ('".$username."', '".$agentName."', '".$password."', '".$gender."', '".$status."', '".$address."')";
            $query = $connect->prepare($sql_query);
           
            if( $query->execute([
                $username, $agentName,
                $password, $gender,
                $status, $address
            ])) {
                $data = array(
                    "msg" => "success",
                    "statusCode" => 200
                );
                array_push($data_arr['result'], $data);
                echo json_encode($data_arr);
                http_response_code(200);
            }
            
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    } else {
        http_response_code(405);
    }
    

    
?>