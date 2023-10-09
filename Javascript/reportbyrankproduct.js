$(document).ready(function() {
    // getTypeSale();
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
                                <td>${dataOffer[i].date}</td>
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
                                <td>${dataOffer[i].date}</td>
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
                        </tr>
                    `;
                $("#report").html(renderDataOffer);
            }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
}getDataOffer();

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

function inputRankProduct() {
    let renderRankProduct = '';
    let dataRankProduct;
    // let inputStart = document.getElementById('inputStart').value;
    // let inputEnd = document.getElementById('inputEnd').value;

    // console.log(inputStart);
    // console.log(inputEnd);

    $.ajax({
        type: "get",
        url: "../API/reportbyrankproduct.php",
        data: {
            // inputBegin: inputStart
        },
        success: function(response) {
            console.log("Success", response);
            dataRankProduct = response.Result;
            if(response.ResponseCode === 200) {
                for(let i = 0; i < dataRankProduct.length; i++) {
                    renderRankProduct += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataRankProduct[i].no_orderProduct}</td>
                            <td>${numberWithCommas(dataRankProduct[i].amountProduct)}</td>
                            <td>${numberWithCommas(dataRankProduct[i].price)}</td>
                            <td>${dataRankProduct[i].shippingTime}</td>
                            <td>${dataRankProduct[i].levelProduct}</td>
                            <td>${dataRankProduct[i].typeSale}</td>
                            <td>${numberWithCommas(dataRankProduct[i].total)}</td>
                            <td>${dataRankProduct[i].date}</td>
                        </tr>
                    `;
                }
                $("#report").html(renderRankProduct);
            }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
}
