<?php

    echo "<meta charset='utf-8'>";

    function dateTH() {
        $dateTH = array("อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์",);
        $monthTH = array("มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายยน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม");

        $myDate = ("2023-09-15");
        
        $week = date("w");
        $months = date("m") - 1;
        $day = date("d");
        $years = date("Y") + 543;
        
        // $week = date("w", strtotime($myDate));
        // $months = date("m", strtotime($myDate)) - 1;
        // $day = date("d", strtotime($myDate));
        // $years = date("Y", strtotime($myDate)) + 543;

        return "วัน$dateTH[$week]
                ที่ $day
                เดือน $monthTH[$months]        
                พ.ศ. $years
                ";
    }
    echo dateTH();

?>