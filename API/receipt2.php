<?php

    require_once("../Config/config.php");

    require_once("../FPDF/fpdf185/fpdf.php");
    date_default_timezone_set("Asia/Bangkok");

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['id'];
        // $id_emp = $_POST['id_emp'];
        // print_r($id);

        $date_now = date("Y-m-d H-i-s");
        $query = "SELECT id_offersale, amount, price, num_day, mat_grad, tb_agent.agent_name, tb_agent.id_agent FROM tb_offersale INNER JOIN tb_agent ON tb_agent.id_agent = tb_offersale.id_agent WHERE id_offersale = ?";
        $stmt = $connect->prepare($query);
        $offerSaleId = 0;
        if($stmt->execute([
            $id
        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object = new stdClass;
                $object->Result = array();

                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $amounts = $amount;
                    $prices = $price;
                    $total = $amounts * $prices;
                    number_format($total, 2, ",", ".");
                    // $total = $amounts * $prices;
                    
                    $items = array(
                        "id" => $id_offersale,
                        "amount" => $amount,
                        "price" => $price,
                        "numDay" => $num_day,
                        "matGrad" => $mat_grad,
                        "name" => $agent_name,
                        "idAgent" => $id_agent,
                        "total" => $total
                    );
                    array_push($object->Result, $items);
                }
                $object->RespCode = 200;
                $object->RespMessage = 'Success';
            }
            else {
                $object = new stdClass;
                $object->RespCode = 400;
                $object->RespMessage = 'Fail';
                $object->Log = 2;
            }
        }
        else {
            $object = new stdClass;
            $object->RespCode = 400;
            $object->RespMessage = 'Fail';
            $object->Log = 1;
        }
echo json_encode($object);
http_response_code(200);
}
else {
http_response_code(405);
} 

?>
