$(document).ready(function() {
    // getTypeSale();
    dateStart();
});

function getTypeSale() {
    let dataTypeSale;
    let renderTypeSale = '';
    $.ajax({
        type: "get",
        url: "../API/getTypeSale.php",
        success: function(response) {
            console.log("Success", response);
            dataTypeSale = response.Result;
            console.log(dataTypeSale);
            if(response.ResponseCode === 200) {
                for(let i = 0; i < dataTypeSale.length; i++) {
                    renderTypeSale += `
                        <option value="${dataTypeSale[i].typeSaleName}" onclick="renderReportBySaleType('${dataTypeSale[i].typeSaleName}')">${dataTypeSale[i].typeSaleName}</option>
                    `;
                }
                $("#reportBySaleType").html(renderTypeSale);
            }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
}
getTypeSale();

function renderReportBySaleType(typeSaleID) {
    let count = 1;
    let total = 0;
    let sum = 0;
    let showText;
    let renderDataOrder = '';
    let dataOrder;
    let beginDate = document.getElementById("dateStart").value; 
    let endDate = document.getElementById("dateEnd").value;
    let typeID = document.getElementById('reportBySaleType').value;
    showText = document.getElementById("showText").value;
    typeSaleID = $("#reportBySaleType :selected").val();
    typeSaleIDS = $("#reportBySaleType :selected").text();
    console.log(typeSaleID);
    console.log(typeSaleIDS);
    console.log(typeID);
    console.log(showText);
    console.log(beginDate);
    console.log(endDate);
    // if(typeID === "สัญญาซื้อขายล่วงหน้า") {
    //     // document.getElementById("showText").disabled = true
    //     showText = document.getElementById("text").textContent;
    //     let result = "สัญญาซื้อขายล่วงหน้า";
    //     console.log(result);
    // }
    // else if(typeID === "ขายสด"){
    //     showText = document.getElementById("text").textContent;
    //     let result1 = "ขายสด";
    //     console.log(result1);
    // }
    $.ajax({
        type: "get",
        url: "../API/getDataOrderByTypeSale.php",
        success: function(response) {
            console.log("Success", response);
            dataOrder = response.Result;
            console.log(dataOrder);
            if(response.ResponseCode === 200) {
                for(let i = 0; i < dataOrder.length; i++) {
                    // total += dataOrder[i].amountProduct * count;
                    // sum += dataOrder[i].price * count;
                    if(typeSaleID === dataOrder[i].typeSale) {
                        total += dataOrder[i].amountProduct * count;
                        sum += dataOrder[i].total * count;
                        // document.getElementById("showText").disabled = true
                        renderDataOrder += `
                        <<tr>
                            <td>${[i + 1]}</td>
                            <td>${dataOrder[i].no_orderProduct}</td>
                            <td>${numberWithCommas(dataOrder[i].amountProduct)}</td>
                            <td>${dataOrder[i].price}</td>
                            <td>${dataOrder[i].shippingTime}</td>
                            <td>${dataOrder[i].levelProduct}</td>
                            <td>${dataOrder[i].typeSale}</td>
                            <td>${numberWithCommas(dataOrder[i].total)}</td>
                            <td>${dayjs(dataOrder[i].date).format('DD/MM/YYYY')}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    `;
                        let result = "สัญญาซื้อขายล่วงหน้า";
                        console.log(dataOrder[i].typeSale);
                    }
                    else if(typeSaleID === dataOrder[i].typeSale){
                        total += dataOrder[i].amountProduct * count;
                        sum += dataOrder[i].total * count;
                        renderDataOrder += `
                        <<tr>
                            <td>${[i + 1]}</td>
                            <td>${dataOrder[i].no_orderProduct}</td>
                            <td>${dataOrder[i].amountProduct}</td>
                            <td>${dataOrder[i].price}</td>
                            <td>${dataOrder[i].shippingTime}</td>
                            <td>${dataOrder[i].levelProduct}</td>
                            <td>${dataOrder[i].typeSale}</td>
                            <td>${numberWithCommas(dataOrder[i].total)}</td>
                            <td>${dayjs(dataOrder[i].date).format('DD/MM/YYYY')}</td>
                        </tr>
                    `;
                        let result1 = "ขายสด";
                        console.log(dataOrder[i].typeSale);
                    }

                    // renderDataOrder += `
                    //     <<tr>
                    //         <td>${[i + 1]}</td>
                    //         <td>${dataOrder[i].no_orderProduct}</td>
                    //         <td>${dataOrder[i].amountProduct}</td>
                    //         <td>${dataOrder[i].price}</td>
                    //         <td>${dataOrder[i].shippingTime}</td>
                    //         <td>${dataOrder[i].levelProduct}</td>
                    //         <td>${dataOrder[i].typeSale}</td>
                    //         <td>${numberWithCommas(dataOrder[i].total)}</td>
                    //         <td>${dataOrder[i].date}</td>
                    //     </tr>
                    // `;
                }
                console.log(sum);
                console.log(total);
                renderDataOrder += `
                    <tr>
                        <td></td>
                        <td>รวมจำนวนสินค้า</td>
                        <td>${numberWithCommas(total)}</td>
                        <td>กืโลกรัม</td>
                        <td></td>
                        <td></td>
                        <td>รวมเป็นเงิน</td>
                        <td>${numberWithCommas(sum)}</td>
                        <td>บาท</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `;
                // renderDataOrder += `

                //         <td></td>
                //         <td></td>
                //         <td></td>
                //         <td></td>
                //         <td>รวมเป็นเงิน</td>
                //         <td>${numberWithCommas(sum)}</td>
                //         <td>บาท</td>

                // `;
                $("#report").html(renderDataOrder);
            }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
}

function showText(typeSale) {
    let report; 
    let reports;
    let showText; 
    typeSale = $("#reportBySaleType :selected").text();
    report = document.querySelector("#reportBySaleType").value;
    reports = document.getElementById("reportBySaleType").value;
    showText = document.getElementById("showText").value;
    console.log(reports);
    console.log(report);
    console.log(typeSale);
    if(typeSale.value == "สัญญาซื้อขายล่วงหน้า") {
        // document.getElementById("showText").disabled = true
        showText = document.getElementsByTagName("p").innerHTML;
    }
    else if(typeSale.value == "ขายสด"){
        showText = document.getElementsByTagName("p").innerHTML;
    }
}
// showText();



function dateStart() {
  
    // Select begin date
    $('#dateStart').datepicker({
      format: 'yyyy/mm/dd',
      language: 'th',
      todayHighlight: true
    })
  
    // Select end date
    $('#dateEnd').datepicker({
      format: 'yyyy/mm/dd',
      language: 'th',
      todayHighlight: true
    })
}
// dateStart();

function getDataOrder() {
    let beginDate = document.getElementById("dateStart").value; 
    let endDate = document.getElementById("dateEnd").value;
    let typeSaleID = $("#reportBySaleType :selected").val();
    // let beginDate = $("#dateStart").val();
    // let endDate = $("#dateEnd").val();
    console.log(beginDate, endDate);
    console.log(typeSaleID);
    $.ajax({
      type: "post",
      url: "../API/getDataOrder.php",
      data: {
              beginDate: beginDate,
              endDate: endDate
      },
      success: function(response) {
        console.log("Success :", response);
        data = response.Result;
        console.log(data);
        // let dateINT = parseInt(data.date);
        // console.log(dateINT);
        if(response.ResponseCode === 200) {
          let renderOrder = '';
          let total = 0;
          let count = 1;
          let sum = 0;
          for(let i = 0 ; i < data.length; i++) {
                // if(typeSaleID === data[i].typeSale) {
                    total += data[i].amountProduct * count;
                    sum += data[i].total * count;
                    renderDataOrder += `
                    <tr>
                        <td>${[i + 1]}</td>
                        <td>${data[i].no_orderProduct}</td>
                        <td>${new Intl.NumberFormat().format(data[i].amountProduct)}</td>
                        <td>${new Intl.NumberFormat().format(data[i].price)}</td>
                        <td>${data[i].shippingTime}</td>
                        <td>${data[i].levelProduct}</td>
                        <td>${data[i].typeSale}</td>
                        <td>${new Intl.NumberFormat().format(data[i].total)}</td>
                        <td>${dayjs(data[i].date).format('DD/MM/YYYY')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    `;
                // }
                // else if(typeSaleID === data[i].typeSale) {
                //     total += data[i].amountProduct * count;
                //     sum += data[i].total * count;
                //     renderDataOrder += `
                //     <tr>
                //         <td>${[i + 1]}</td>
                //         <td>${data[i].no_orderProduct}</td>
                //         <td>${new Intl.NumberFormat().format(data[i].amountProduct)}</td>
                //         <td>${new Intl.NumberFormat().format(data[i].price)}</td>
                //         <td>${data[i].shippingTime}</td>
                //         <td>${data[i].levelProduct}</td>
                //         <td>${data[i].typeSale}</td>
                //         <td>${new Intl.NumberFormat().format(data[i].total)}</td>
                //         <td>${dayjs(data[i].date).format('DD/MM/YYYY')}</td>
                //     </tr>
                //     `;
                // }
              }
              renderDataOrder += `
                  <tr class="table-total">
                    <td></td>
                    <td>รวมจำนวนสินค้า</td>
                    <td>${numberWithCommas(total)}</td>
                    <td>กืโลกรัม</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
              `;
          console.log(total);
        }
        $("#report").html(renderDataOrder);                                     
      },
      error: function(err) {
        console.log("Fail :", err);
      }
    });
}

function renderDataOrder() {

}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
