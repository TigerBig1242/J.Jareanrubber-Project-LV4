$(document).ready(function() {
    getStockMaterial();
})

function getStockMaterial() {
    $.ajax({
        type: 'get',
        url: '../API/getStockMaterial.php',
        success: function(response) {
            console.log("Success", response);
            let dataStockMaterial;
            let renderStockMaterial = '';
            dataStockMaterial = response.Result;
            console.log(dataStockMaterial);
            if(response.ResponseCode === 200) {
                // let renderStockMaterial = "";
                for(let i = 0; i < dataStockMaterial.length; i++) {
                    renderStockMaterial += `
                        <tr>
                            <td>${[i + 1]}</td>
                            <td>เกรด ${dataStockMaterial[i].mat_level}</td>
                            <td>${new Intl.NumberFormat().format(dataStockMaterial[i].amount)} ตัน</td>
                        </tr>
                    `;
                }
                $("#tbody").html(renderStockMaterial);
            }
        },
        error: function(err) {
            console.log("Error", err);
        }
    });
}
// getStockMaterial();

function renderStockMaterial() {

}

    // getOfferSale
    // let sumA = 0;
    // let sumB = 0;
    // let sumC = 0;
    // let count = 1;
    let listAmount = [];
function getOfferSale() {
    let pass = true;
    $.ajax({
        type: 'get',
        url: '../API/getDisplayConfirm.php',
        success: function(response) {
            console.log("Success", response);
            let dataResult = response.Result;
            console.log(dataResult);
            let sumA = 0;
            let sumB = 0;
            let sumC = 0;
            let count = 1;
            if(response.ResponseCode === 200) {
                for(let i = 0; i < dataResult.length; i++) {
                    if(dataResult[i].mat_grad.trim() === 'A') {
                        sumA += dataResult[i].amount * count;
                        console.log(sumA);
                    }
                    else if(dataResult[i].mat_grad.trim() === 'B') {
                        sumB += dataResult[i].amount * count;
                        console.log(sumB);
                    }
                    else if(dataResult[i].mat_grad.trim() === 'C') {
                        sumC += dataResult[i].amount * count;
                        console.log(sumC);
                    }

                    renderStockMaterial += `
                        <tr>
                            <td>${[i + 1]}</td>
                            <td>${new Intl.NumberFormat().format(listAmount)} ตัน</td>
                            <td>${dataResult[i].mat_grad}</td>
                        </tr>
                    `;
                }
                // $("#tbody").html(renderStockMaterial);
            }
            if(pass) {
                listAmount.push([
                    sumA,sumB, sumC
                ])
            }
            console.log(listAmount);
        },
        err: function(err) {
            console.log("Fail", err);
        }
    });
}
getOfferSale();

function sumResult() {
    console.log(listAmount);
}
sumResult();

