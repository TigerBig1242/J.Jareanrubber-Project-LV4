<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous"></script>
    <!-- Bootstrap icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <title>Register</title>
</head>
<body>

    <!-- Jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    
    <!-- Sweetalert2 -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Javascript/register.js -->
    <script src="../Javascript/register.js"></script>
    
    <div class="container mt-4">
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <h2>Sign Up</h2>
                <br>
                <form action="#" method="post" name="form-register" id="form-register">
                    <div class="md-3">
                        <label for="inputUsername" class="form-label">Username</label>
                        <input type="text" name="username" class="form-control" id="username" placeholder="กรอกชื่อผู้ใช้">
                    </div>
                    <div>
                        <label for="inputAgentName" class="form-label">Name</label>
                        <input type="text" name="agent_name" class="form-control" id="agent_name" placeholder="กรอกชื่อ-นามสกุล">
                    </div>
                    <div>
                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" id="password"  placeholder="กรอกรหัสผ่าน">
                            <div class="md-3">
                                <input type="checkBox" onclick="showPass()">
                                <label>Show password</label>     
                            </div>                    
                    </div>
                    <div>
                        <label for="confirmPassword" class="form-label">ConfirmPassword</label>
                        <input type="password" name="ConfirmPassword" class="form-control" id="ConfirmPassword" autocomplete="on" placeholder="ยืนยันรหัสผ่าน">
                    </div>
                    <div>
                        <label for="inputGender" class="form-label">Gender</label>
                        <input type="text" name="agent_gender" class="form-control" id="agent_gender" placeholder="กรอกเพศ">
                    </div>
                    <div>
                        <label for="inputStatus" class="form-label">Status</label>
                        <input type="text" name="status" class="form-control" id="status" placeholder="กรอกสถานะผู้ใช้">
                    </div>
                    <div>
                        <label for="inputAgentAddress" class="form-label">Address</label>
                        <input type="text" name="agent_address" class="form-control" id="agent_address" placeholder="กรอกที่อยู่">
                    </div>
                    <br>
                </form>
                    <button type="submit" class="btn btn-primary" id="submit_signup" onclick="save_signup()">Register</button>
            </div>
        </div>
    </div>    

</body>
</html>