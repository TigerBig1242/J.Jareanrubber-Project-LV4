<?php

    require_once('../Config/config.php');

    @header('Content-Type: application/json');
    @header("Access-Control-Allow-Origin: *");
    @header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

    date_default_timezone_set("Asia/Bangkok");

    function generateRandomString($length = 5) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    
    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $txt_username = $_POST['username'];
        $txt_password = $_POST['password'];
        // print_r($txt_password);
        $date_now = date("Y-m-d H-i-s");
        // $hash_password = md5($password . $date_now); // hash password by MD5 function

        $genToken = md5(generateRandomString(5) .$date_now); // hash token by MD5 method

        $query = "SELECT * FROM tb_agent WHERE username = ?";
        $stmt = $connect->prepare($query);
        if($stmt->execute([
            $txt_username
        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    
                    $encPassword = md5($txt_password.$salt);
                    // $encPassword = md5($password.$salt);
                    // $encPassword = $password;
                    // print_r($encPassword);
                    // print_r($password);
                    if($encPassword == $password) {
                        $user_id = $id_agent;

                        $query = "UPDATE tb_agent SET token = ? WHERE id_agent = ?";
                        $stmt = $connect->prepare($query);
                        if($stmt->execute([
                            $genToken, $user_id
                        ])) {
                            $object = new stdClass();
                            $result = new stdClass();

                            $result->Fullname = $agent_name;
                            $result->Token = $genToken;
                            $result->Id = $id_agent;

                            $object->RespCode = 200;
                            $object->RespMessage = 'Good';
                            $object->Result = $result;
                        } 
                        else {
                            $object = new stdClass();
                            $object->RespCode = 400;
                            $object->RespMessage = 'Bad';
                            $object->Log = 4;
                        }
                             // Check role from login is admin or user
                             if ($row['status'] == 'ตัวแทน') {
                                $object->RespCode = 200;
                                $object->RespMessage = 'Good';
                                $object->Role = 'ตัวแทน';
                            }
                            else if ($row['status'] == 'พนักงาน') {
                                $object->RespCode = 200;
                                $object->RespMessage = 'Good';
                                $object->Role = 'พนักงาน';
                            }
                            else {
                                $object = new stdClass();
                                $object->RespCode = 400;
                                $object->RespMessage = 'Bad';
                                $object->Log = 5;
                            }
                    }
                    else {
                        $object = new stdClass();
                        $object->RespCode = 400;
                        $object->RespMessage = 'Bad';
                        $object->Log = 3;
                    }
                }
            }
            else {
                $object = new stdClass();
                $object->RespCode = 400;
                $object->RespMessage = 'Bad';
                $object->Log = 2;
            }
        }
        else {
            $object = new stdClass();
            $object->RespCode = 400;
            $object->RespMessage = 'Bad';
            $object->Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

       
?>