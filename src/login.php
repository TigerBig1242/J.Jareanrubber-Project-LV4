<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous"></script>
    <title>Login</title>
</head>
<body>

    <!-- Jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
        
    <!-- Sweetalert2 -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Javascript/login.js -->
    <script src="../Javascript/login.js"></script>

        <div class="container mt-4">
            <div class="row justify-content-md-center">
                <div class="col-md-6">
                    <h2>Login</h2>
                    <br>
                    <form action="#" name="form-login" id="form-login" method="post">
                            <div class="md-3">
                                <label  class="form-label">Username</label>
                                <input type="text" id="username" name="username" class="form-control" placeholder="username" required="required">
                            </div>
                            <div class="md-3">
                                <label  class="form-label">Password</label>
                                <input type="password" id="password" name="password" class="form-control" placeholder="password" required="required">
                            </div>
                            <div class="md-3">
                                <input type="checkBox" onclick="showPass()">
                                <label>Show password</label>     
                            </div>
                    </form>
                            <button type="submit" id="submit_login" name="submit_login" class="btn btn-primary" onclick="login()">LOGIN</button>
                </div>
            </div>

        </div>
    
</body>
</html>