$(document).ready(function() {
    // getTypeSale();
    dateStart();
});

function getDataOffer() {
    let count = 1;
    let total = 0;
    let dataOffer;
    let renderDataOffer = '';
    let status = document.getElementById('reportStatus').value;
    let Status = document.querySelector("#reportStatus").value;
    let selectStatus = $("#reportStatus :selected").val();
    console.log(selectStatus);
    console.log(status);
    console.log(Status);
    $.ajax({
        type: "get",
        url: "../API/getOfferSaleData.php",
        success: function(response) {
            console.log("Success", response);
            dataOffer = response.Result;
            console.log(dataOffer);
            if(response.ResponseCode === 200) {
                for(let i = 0; i < dataOffer.length; i++) {
                    // total += dataOffer[i].amount * count;
                    if(status === dataOffer[i].status) {
                        total += dataOffer[i].amount * count;
                        renderDataOffer += `
                            <<tr>
                                <td>${[i + 1]}</td>
                                <td>${numberWithCommas(dataOffer[i].amount)}</td>
                                <td>${numberWithCommas(dataOffer[i].price)}</td>
                                <td>${dataOffer[i].status}</td>
                                <td>${dataOffer[i].num_day}</td>
                                <td>${dataOffer[i].mat_grad}</td>
                                <td>${dayjs(dataOffer[i].date).format('DD/MM/YYYY')}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        `;
                    console.log(dataOffer[i].status);
                    }
                    else if(status === dataOffer[i].status) {
                        total += dataOffer[i].amount * count;
                        renderDataOffer += `
                            <<tr>
                                <td>${[i + 1]}</td>
                                <td>${numberWithCommas(dataOffer[i].amount)}</td>
                                <td>${numberWithCommas(dataOffer[i].price)}</td>
                                <td>${dataOffer[i].status}</td>
                                <td>${dataOffer[i].num_day}</td>
                                <td>${dataOffer[i].mat_grad}</td>
                                <td>${dayjs(dataOffer[i].date).format('DD/MM/YYYY')}</td>

                            </tr>
                        `;
                    console.log(dataOffer[i].status);
                    }
                }

                renderDataOffer += `
                        <tr>
                            <td>รวมจำนวน</td>
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
                $("#report").html(renderDataOffer);
            }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
}
getDataOffer();

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

function getDataOrder() {
    let beginDate = document.getElementById("dateStart").value; 
    let endDate = document.getElementById("dateEnd").value;
    let statusOffer = $("#reportStatus :selected").val();
    // let beginDate = $("#dateStart").val();
    // let endDate = $("#dateEnd").val();
    console.log(beginDate, endDate);
    console.log(statusOffer);
    $.ajax({
      type: "post",
      url: "../API/getOfferSaleDataCopy.php",
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
                // if(statusOffer === data[i].status) {
                    total += data[i].amount * count;
                    // sum += data[i].total * count;
                    renderDataOrder += `
                    <tr>
                        <td>${[i + 1]}</td>
                        <td>${new Intl.NumberFormat().format(data[i].amount)}</td>
                        <td>${new Intl.NumberFormat().format(data[i].price)}</td>
                        <td>${data[i].status}</td>
                        <td>${data[i].num_day}</td>
                        <td>${data[i].mat_grad}</td>
                        <td>${dayjs(data[i].date).format('DD/MM/YYYY')}</td>
                    </tr>
                    `;
                // }
                // else if(statusOffer === data[i].status) {
                //     total += data[i].amount * count;
                //     // sum += data[i].total * count;
                //     renderDataOrder += `
                //     <tr>
                //         <td>${[i + 1]}</td>
                //         <td>${new Intl.NumberFormat().format(data[i].amount)}</td>
                //         <td>${new Intl.NumberFormat().format(data[i].price)}</td>
                //         <td>${data[i].status}</td>
                //         <td>${data[i].num_day}</td>
                //         <td>${data[i].mat_grad}</td>
                //         <td>${dayjs(data[i].date).format('DD/MM/YYYY')}</td>
                //     </tr>
                //     `;
                // }
              }
              renderDataOrder += `
                  <tr class="table-total">
                    <td>รวม</td>
                    <td>${new Intl.NumberFormat().format(total)}</td>
                    <td>กิโลกรัม</td>
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
// getDataOrder();

function renderDataOrder() {

}

function renderReportBySaleType(typeSaleID) {
    let showText;
    let renderDataOrder = '';
    let dataOrder;
    let typeID = document.getElementById('reportBySaleType').value;
    showText = document.getElementById("showText").value;
    typeSaleID = $("#reportBySaleType :selected").val();
    typeSaleIDS = $("#reportBySaleType :selected").text();
    console.log(typeSaleID);
    console.log(typeSaleIDS);
    console.log(typeID);
    console.log(showText);
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
                    if(typeSaleID === dataOrder[i].typeSale) {
                        // document.getElementById("showText").disabled = true
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
                            <td>${dataOrder[i].date}</td>
                        </tr>
                    `;
                        let result = "สัญญาซื้อขายล่วงหน้า";
                        console.log(dataOrder[i].typeSale);
                    }
                    else if(typeSaleID === dataOrder[i].typeSale){
                        renderDataOrder += `
                        <<tr>

                            <td>${dataOrder[i].no_orderProduct}</td>
                            <td>${dataOrder[i].amountProduct}</td>
                            <td>${dataOrder[i].price}</td>
                            <td>${dataOrder[i].shippingTime}</td>
                            <td>${dataOrder[i].levelProduct}</td>
                            <td>${dataOrder[i].typeSale}</td>
                            <td>${numberWithCommas(dataOrder[i].total)}</td>
                            <td>${dataOrder[i].date}</td>
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

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


// dateStart();
