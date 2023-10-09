<?php 

    require_once('../Config/config.php');

    @header('Content-Type: application/json');
    @header("Access-Control-Allow-Origin: *");
    @header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

    date_default_timezone_set("Asia/Bangkok");
    
    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    
    if($_SERVER['REQUEST_METHOD'] == "POST") {
        // $content = @file_get_contents('php://input');
        // $json_data= @json_decode($content, true);
        // $username = trim($json_data['username']);
        // $name = trim($json_data['name']);
        // $password = trim($json_data['password']);
        // $gender = trim($json_data['gender']);
        // $status = trim($json_data['status']);
        // $address = trim($json_data['address']);

        $txt_username = $_POST['username'];
        $name = $_POST['name'];
        $password = $_POST['password'];
        $gender = $_POST['gender'];
        $status = $_POST['status'];
        $address = $_POST['address'];

        // print_r($password);
        $salt = generateRandomString(5);
        // print_r($salt);
        $hash_password = md5($password.$salt); // hash password by MD5 function
        // print_r($hash_password);

        $date_now = date("Y-m-d H-i-s");
        $token = md5(generateRandomString(5) .$date_now); // hash token by MD5 method

        // $sql_query = "INSERT INTO tb_agent (username, agent_name, password, gender, status, token, address) VALUES(?,?,?,?,?,?,?)";
        // $query = $connect->prepare($sql_query);

        // if($query->execute([
        //    $txt_username, $name, $hash_password, $gender, $status, $token, $address

        // ])) {
        //     $object = new stdClass();
        //     $result = new stdClass();

        //     $result -> Token = $token;
        //     $result -> Fullname = $name;

        //     $object -> RespCode = 200;
        //     $object -> RespMessage = "Good";
        //     $object -> Result = $result;
        //     // $object->Token = $token;
        //     // $object->Fullname = $name;

        // }
        // else {
        //     $object = new stdClass();
        //     $object -> RespCode = 400;
        //     $object -> RespMessage = "Bad";
        //     $object->log = 1;
        // }
        // echo json_encode($object);
        // http_response_code(200); 

        try{
    // Not working have an error
            
        //     $check_user = "SELECT id_agent FROM tb_agent WHERE username = :username";
        //     $stmt = $connect->prepare($check_user);
        //     // $stmt->bindParam(':username', $txt_username);
        //     if($stmt->execute(array(
        //          ':username' => $txt_username
        //     ))) {
        //         $num = $stmt->rowCount();
        //         print_r($num);
        //         if($num > 0) {
        //             while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        //                 extract($row);
        //                 // print_r($row) ;
        //                 // $rows = array("username" => $txt_username);
        //                 if($txt_username !== $row['username']) {
        //                     // $txt_username = $username;
        //                     $sql_query = "INSERT INTO tb_agent (username, agent_name, password, gender, status, token, address) VALUES (?,?,?,?,?,?,?)";
        //                     $stmt = $connect->prepare($sql_query);
        //                     if($stmt->execute([
        //                         $txt_username, $name, $hash_password, $gender, $status, $token, $address
        //                     ])) {
        //                         $object = new stdClass();
        //                         $result = new stdClass();

        //                         $result -> Token = $token;
        //                         $result -> Fullname = $name;

        //                         $object -> RespCode = 200;
        //                         $object -> RespMessage = "Good";
        //                         $object -> Result = $result;
        //                     }
        //                     else {
        //                         $object = new stdClass();
        //                         $object -> RespCode = 400;
        //                         $object -> RespMessage = "Bad";
        //                         $object->log = 4;
        //                     }
        //                 }
        //                 else {
        //                     $object = new stdClass();
        //                     $object -> RespCode = 400;
        //                     $object -> RespMessage = "Bad";
        //                     $object->log = 3;
        //                 }
        //             }
        //         }
        //         else {
        //             $object = new stdClass();
        //             $object -> RespCode = 400;
        //             $object -> RespMessage = "Bad";
        //             $object->log = 2;
        //         }
        //     }
        //     else {
        //         $object = new stdClass();
        //         $object -> RespCode = 400;
        //         $object -> RespMessage = "Bad";
        //         $object->log = 1;
        //     } 
        
        // echo json_encode($object);
        // http_response_code(200);

    // Working not error
        
            $check_user = "SELECT id_agent FROM tb_agent WHERE username = :username";
            $stmt = $connect->prepare($check_user);
            $stmt->execute(array(':username' => $txt_username));

            if($stmt->rowCount() > 0) {
                $object = new stdClass();
                $object -> RespCode = 400;
                $object -> RespMessage = "Bad";
                $object->log = 1;
            }
            else {
                $query = "INSERT INTO tb_agent (username, agent_name, password, gender, salt, status, token, address) VALUES(:username, :agent_name, :password, :gender, :salt, :status, :token, :address)"  ;
                $stmt =$connect->prepare($query);
                $stmt->bindParam(':username', $txt_username);
                $stmt->bindParam(':agent_name', $name);
                $stmt->bindParam(':password', $hash_password);
                $stmt->bindParam(':gender', $gender);
                $stmt->bindParam(':salt', $salt);
                $stmt->bindParam(':status', $status);
                $stmt->bindParam(':token', $token);
                $stmt->bindParam(':address', $address);
                $result = $stmt->execute();

                if($result) {
                    $object = new stdClass();
                    $result = new stdClass();

                    $result -> Token = $token;
                    $result -> Fullname = $name;

                    $object -> RespCode = 200;
                    $object -> RespMessage = "Good";
                    $object -> Result = $result;
                }
                else {
                    $object = new stdClass();
                    $object -> RespCode = 400;
                    $object -> RespMessage = "Bad";
                    $object->log = 2;
                }
            }

        echo json_encode($object);
        http_response_code(200);
    }
        catch(PDOException $e){
            echo $e->getMessage();
        }

    }
    else {
        http_response_code(405);
    }


    
?>