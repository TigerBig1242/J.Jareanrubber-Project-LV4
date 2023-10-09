$(document).ready(function(){
    selectMonthTH();
})

function reportByListAmount() {
    let months_th = [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ];
    let months_th_mini = [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ];
    console.log(months_th);
    console.log(months_th_mini);
    $.ajax({
        type: "get",
        url: "../API/reportbyamounthight.php",
        success: function(response) {
            console.log("Success", response);
            let renderAmount;
            let resultAmount = 0;
            let amount = response.Result;
            console.log(amount);
            if(response.ResponseCode === 200) {
                for(let i = 0; i < amount.length; i++) {
                    renderAmount += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${amount[i].amount_product}</td>
                            <td>${amount[i].level_product}</td>
                        </tr>
                    `;
                }
                $("#report").html(renderAmount);
            }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
}
reportByListAmount();

function selectMonthTH() {
    let months_th = [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ];
    let months_th_mini = [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ];
    console.log(months_th);
    console.log(months_th_mini);
}
selectMonthTH();