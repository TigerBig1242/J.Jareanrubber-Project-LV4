<?php

    require_once("../Config/config.php");
    if($_SERVER['REQUEST_METHOD'] == "GET") {
        $query = "SELECT DATE_FORMAT(date, '%m-%Y') AS Date, SUM(amount_product) AS Total FROM tb_orders GROUP BY DATE_FORMAT(Date, '%m-%Y')";
        $stmt = $connect->prepare($query);
        $object = new stdClass;
        $dateTH = array("อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์",);
        $monthTH = array("มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายยน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม");

        if($stmt->execute()) {
            $num = $stmt->rowCount();
            if($num > 0) {
                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $items = array(
                        "month" => $Date,
                        "total" => $Total
                    );
                    array_push($object->Result, $items);
                }
                $object->ResponseCode = 200;
                $object->ResponseMessage = "Success";

            }
            else {
                $object->ResponseCode = 400;
                $object->ResponseMessage = 'Fail';
                $object->Log = 2;
            }
        }
        else {
            $object = new stdClass;
            $object->ResponseCode = 400;
            $object->ResponseMessage = 'Fail';
            $object->Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }

    // echo "<meta charset='utf-8'>";

    // function dateTH() {
    //     $dateTH = array("อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์",);
    //     $monthTH = array("มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายยน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม");

    //     $myDate = ("2023-09-15");
        
    //     $week = date("w");
    //     $months = date("m") - 1;
    //     $day = date("d");
    //     $years = date("Y") + 543;
        
    //     // $week = date("w", strtotime($myDate));
    //     // $months = date("m", strtotime($myDate)) - 1;
    //     // $day = date("d", strtotime($myDate));
    //     // $years = date("Y", strtotime($myDate)) + 543;

    //     return "วัน$dateTH[$week]
    //             ที่ $day
    //             เดือน $monthTH[$months]        
    //             พ.ศ. $years
    //             ";
    // }
    // echo dateTH();

?>