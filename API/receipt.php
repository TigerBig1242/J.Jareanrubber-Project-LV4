<?php

    require_once("../Config/config.php");

    require_once("../FPDF/fpdf185/fpdf.php");
    date_default_timezone_set("Asia/Bangkok");

    $pdf = new FPDF(); 
    $pdf->AddPage();
    $pdf->AddFont('sarabun', '', 'Sarabun-Regular.php');
    $pdf->AddFont('sarabun', 'B', 'Sarabun-Bold.php');

    $pdf->SetFont('Sarabun', 'B', 20);  
    $pdf->Cell(0, 10, iconv('utf-8', 'cp874', 'หจก. จ.เจริญรับเบอร์'), 0, 1, 'C');
    $pdf->SetFont('Sarabun', '', 18);
    $pdf->Cell(0, 10, iconv('utf-8', 'cp874', 'ใบเสร็จรับเงิน'), 0, 1, 'C');
    $pdf->Cell(0, 10, iconv('utf-8', 'cp874', 'รายการประมูล'), 0, 1, 'C');
    $pdf->SetFont('Sarabun', '', 14);
    $date_now = date("d-m-Y");
    $pdf->Cell(0, 10, $date_now, 0, 0, 'L'); 
    $date_time = date("h:i:s");
    $pdf->Cell(0, 10, $date_time, 0, 0, 'R');

    $pdf->Output();

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        // $id = $_POST['id'];
        $token = $_POST['token'];
        // print_r($id);
        $query = "SELECT * FROM tb_agent WHERE token = ?";
        $stmt = $connect->prepare($query);

        if($stmt->execute([
            // $id
            $token
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $agentId = 0;
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $agentId = $id_agent;
                    $name = $agent_name;
                    print_r($name);
                }

                $query = "SELECT id_offersale, amount, price, tb_agent.agent_name FROM tb_offersale INNER JOIN tb_agent ON tb_agent.id_agent = tb_offersale.id_agent WHERE id_offersale = ?";
                $stmt = $connect->prepare($query);
                $offerSaleId = 0;
                if($stmt->execute([
                    // $agentId
                    $offerSaleId
                ])) {
                    $num = $stmt->rowCount();
                    if($num > 0) {
                        $object = new stdClass;
                        $object->Result = array();

                        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                            extract($row);
                            // print_r($row);
                            
                            $pdf->SetFont('Sarabun', '', 14);
                            $pdf->Cell(0, 10, iconv('utf-8', 'cp874', $row['amount']), 0, 1, 'R');
                            $pdf->Cell(0, 10, iconv('utf-8', 'cp874', $row['price']), 0, 1, 'L');
                            $pdf->Cell(0, 10, iconv('utf-8', 'cp874', $row['agent_name']), 0, 1, 'R');

                            $pdf->Output();

                            $items = array(
                                "id" => $id_offersale
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
                        $object->Log = 4;
                    }
                }
                else {
                    $object = new stdClass;
                    $object->RespCode = 400;
                    $object->RespMessage = 'Fail';
                    $object->Log = 3;
                }
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
    
    // $pdf = new FPDF(); 
    // $pdf->AddPage();
    // $pdf->AddFont('sarabun', '', 'Sarabun-Regular.php');
    // $pdf->AddFont('sarabun', 'B', 'Sarabun-Bold.php');

    // $pdf->SetFont('Sarabun', 'B', 20);  
    // $pdf->Cell(0, 10, iconv('utf-8', 'cp874', 'หจก. จ.เจริญรับเบอร์'), 0, 1, 'C');
    // $pdf->SetFont('Sarabun', '', 18);
    // $pdf->Cell(0, 10, iconv('utf-8', 'cp874', 'ใบเสร็จรับเงิน'), 0, 1, 'C');
    // $pdf->Cell(0, 10, iconv('utf-8', 'cp874', 'รายการประมูล'), 0, 1, 'C');
    // $pdf->SetFont('Sarabun', '', 14);
    // $date_now = date("d-m-Y");
    // $pdf->Cell(0, 10, $date_now, 0, 0, 'L'); 
    // $date_time = date("h:i:s");
    // $pdf->Cell(0, 10, $date_time, 0, 0, 'R');
    
    // $pdf->Output();


?>
