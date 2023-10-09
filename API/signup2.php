<?php 

    session_start();
    require_once('../Config/config.php');

    @header('Content-Type: application/json');
    @header("Access-Control-Allow-Origin: *");
    @header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
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
        
            if(empty($username)) {
                $_SESSION['error'] = "กรุณากรอก Username";
                echo "Please fill username";
            } else if(empty($agentName)) {
                $_SESSION['error'] = "กรุณากรอกชื่อ";
                echo "Please fill name";
            } else if(empty($password)) {
                $_SESSION['error'] = "กรุณากรอก Password";
                echo "Please fill password";
            } else if(strlen($password) > 15 || strlen($password) < 5) {
                $_SESSION['error'] = "รหัสผ่านต้องมีความยาวตั้งแต่ 5 ตัวอักษร ถึง 20 ตัวอักษร";
                echo "Password must length five more than but less more than twenty";
            } else if(empty($gender)) {
                $_SESSION['gender'] = "กรุณากรอกเพศ";
                echo "Please fill gender";
            } else if(empty($image)) {
                $_SESSION['image'] = "กรุณาใส่รูป";
                echo "Please put image";
            } else if(empty($status)) {
                $_SESSION['status'] = "กรุณาระบุสถานะของคุณ";
                echo "Please fill status";
            } else if(empty($address)) {
                $_SESSION['address'] = "กรุณาระบุที่อยู่";
                echo "Please fill address";
            } 
            // else if(empty($confirmPassword)) {
            //     $_SESSION['error'] = "กรุณยืนยันรหัสผ่าน";
            //     echo "Please confirm password";
            // }
            // else if($password != $confirmPassword) {
            //     $_SESSION['error']= "รหัสผ่านไม่ตรงกัน";
            //     echo "password not match";}
             else {
                try {
                    // $sql = "SELECT username FROM tb_agent WHERE username = :username";
                    $check_user = $connect->prepare("SELECT username FROM tb_agent WHERE username = ?");
                    // $check_user = $connect->prepare($sql);
                    // echo json_encode(array("result", $check_user));
                    // echo $check_user;
                    // print_r($check_user);
                    // $check_user->bindParam(":username", $username);
                    $check_user->bindParam(1, $_GET['id'], PDO::PARAM_INT);
                    // $check_user->execute([":username" => $username]);
                    $check_user->execute();
                    // print_r(json_encode(array("result", $check_user)));
                    // echo $check_user;
                    // print_r($check_user);
                    $row = $check_user->fetch(PDO::FETCH_ASSOC);
                    // echo $row;
                    // print_r($row);

                    if($row['username'] == $username )  {
                        $_SESSION['warning'] = "มี username นี้ในระบบแล้ว";
                        echo "Username exist already";
                    }else if(!isset($_SESSION['error'])) {
                        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                        $query = $connect->prepare("INSERT INTO tb_agent (username, agent_name, password, gender, image, status, address) 
                                                    VALUES(:username, :agentName, :password, :gender, :status, :address)"); 
                        $query->bindParam(":username", $username);
                        $query->bindParam(":agentName", $agentName);
                        $query->bindParam(":password", $passwordHash);
                        $query->bindParam(":gender", $gender);
                        $query->bindParam(":status", $status);
                        $query->bindParam(":address", $address);
                        $query->execute();

                        // $data = array(
                        //     "msg" => "success",
                        //     "statusCode" => 200
                        // );
                        // array_push($data_arr['result'], $data);
                        // echo json_encode($data_arr);
                        // http_response_code(200);
                        $_SESSION['success'] = "สมัครสามชิกเรียบร้อย";
                        echo "Successfully";
                    } else {
                        $_SESSION['error'] = "มีบางอย่างผิดพลาด";
                        echo "Something went wrong";
                        // $row['username'] ??= 'default value';
                        // return $row['username'];
                    }
                } catch(PDOException $e) {
                    echo $e->getMessage();
                }
            }
    }
    
?>