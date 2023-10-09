function convertDateThai(date, report) {
    let month_TH = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม",];

    console.log(typeof report);
    console.log(typeof date);
    return result = month_TH[(date.getMonth())] + " " + (date.getFullYear() + 543);
}

let date = convertDateThai(new Date("2023-09-15"));
console.log(date);
console.log(result);

function dataOrder() {
    let orderData;
    $.ajax({
        type: "get",
        url: "../API/getDataOrderGet.php",
        success: function(response) {
            console.log("Success", response);
            orderData = response.Result;
            console.log(orderData);
            if(response.ResponseCode === 200) {

            }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
}
dataOrder();

let report;
function reportByMonth() {
    let report;
    let renderReport = '';
    $.ajax({
        type: "get",
        url: "../API/reportbymonth.php",
        success: function(response) {
            console.log("Success", response);
            report = response.Result;
            console.log(report);
            if(response.ResponseCode === 200) {
                for(let i = 0; i < report.length; i++) {
                    renderReport += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${new Intl.NumberFormat().format(report[i].total)}</td>
                            <td>${report[i].month}</td>
                        </tr>
                    `;
                }
                $("#report").html(renderReport);
            }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
}
// reportByMonth();

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function selectMonthTH() {
    let months_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    let months_th_mini = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    let numMonth = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    console.log(months_th);
    console.log(months_th_mini);
    console.log(numMonth);

    let month = document.getElementById('month');
    let value = month.value;
    // let monTHS = document.querySelector("#month").text();
    console.log(value);
    let selectMont = $('#month :selected').val();
    console.log(selectMont);
    // console.log(monTHS);
    let renderMonth = '';
    for(let i = 0; i < months_th.length; i++) {
        renderMonth += `
            <option value="${numMonth[i]}" onclick="monthTH(${numMonth[i]})">${months_th[i]}</option>
        `;
    }
    // renderMonth += `
    //         <option value="">เลือกเดือน</option>
    //         <option value="${months_th}">${months_th}</option>
    //     `;
    // $("#month").html(renderMonth);
}
// selectMonthTH();

function monthTH(month) {
    let selectMont = $('#month :selected').val();
    console.log(selectMont);
    let renderReport = '';
    let reports;

    $.ajax({
        type: "post",
        url: "../API/getReportByMonth.php",
        data: {
            numMonth: selectMont
        },
        success: function(response) {
            console.log("Success", response);
            reports = response.Result;
            if(response.ResponseCode === 200) {
                for(let i = 0; i < reports.length; i++) {
                    renderReport += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${new Intl.NumberFormat().format(reports[i].result)}</td>
                            <td>${reports[i].Date}</td>
                        </tr>
                    `;
                }
                $("#report").html(renderReport);
            }

        },error: function(err) {
            console.log("Fail", err);
        }
    });
}
monthTH();