$(document).ready(function(){
    displayProductList();
    recordDatBillProduct();
})


function sumListProduct() {
    let lists = localStorage.getItem('sumAmount');
    let list2 = JSON.parse(localStorage.productList);
    let list3 = JSON.parse(localStorage.listTing);

    console.log(parseInt(lists));
    console.log(typeof(lists));
    console.log(list2);
    console.log(list3);

    list5 = [];
    list5.push(list2, list3, lists);
    console.log(list5);
}
sumListProduct();

function displayProductList() {
    // let totalAmount = localStorage.getItem('sumAmount');
    let listProduct = JSON.parse(localStorage.productList);
    let productDetail = JSON.parse(localStorage.listTing);

    // console.log(parseInt(totalAmount));
    console.log(listProduct);
    console.log(productDetail);

    let displayProduct = '';
    let total = 0;
    for(let i = 0; i < listProduct.length; i++) {
        total += listProduct[i].amountProduct * listProduct[i].count
        displayProduct += `
            <tbody>
            <tr>
                <td>
                <table class="invoice-items" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td> จำนวน: </td>
                        <td class="alignright">${numberWithCommas(listProduct[i].amountProduct)} กิโลกรัม</td>
                    </tr>
                    <tr>
                        <td> เกรด:  </td>
                        <td class="alignright"> ${listProduct[i].levelProduct} </td>
                    </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
                </tbody>
                `;

    }
    // displayProduct += `       
    //     <div class="total">
    //         <p>รวม : </p>
    //         <p>${numberWithCommas(total)} ตัน</p>
    //     </div>
    // `;
    let displayProducts = '';
    displayProducts += `       
        <tbody>
            <tr>
                <td>
                <table class="invoice-items" cellpadding="0" cellspacing="0">
                    <tr class="total">
                        <td class="alignright" width="80%">รวม</td>
                        <td class="alignright">${numberWithCommas(total)} บาท</td>
                    </tr>
                </table>
                </td>
            </tr>
        </tbody>
    `;
    localStorage.setItem("Total", total);
    // console.log(displayProduct);
    $("#listOrder").html(displayProduct);
    $("#total").html(displayProducts);

    let displayDetailProduct = '';
    for(k = 0; k < productDetail.length; k++) {
        displayDetailProduct += `
            <tbody>
                <tr>
                    <td>
                    <table class="invoice-items" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr>
                            <td> ประเภทการขาย: </td>
                            <td class="alignright">${productDetail[k].TypeSale}</td>
                        </tr>
                        <tr>
                            <td> ระยะเวลาจัดส่ง:  </td>
                            <td class="alignright"> ${productDetail[k].ShippingTime} </td>
                        </tr>
                        </tbody>
                    </table>
                    </td>
            </tr>
            </tbody>
        `;
    }
    $("#orderDetail").html(displayDetailProduct).promise().done(() => {
        window.print();
    });
    // console.log(displayDetailProduct);
}
// displayProductList();

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

    // Record data bill order product
function recordDatBillProduct() {
    let date = new Date().toLocaleDateString('en-EN');
    // const result = new Date().toLocaleDateString('th-TH');
    console.log(date);
    let productList = JSON.parse(localStorage.productList);
    let detailProduct = JSON.parse(localStorage.listTing);
    let totalAmount = parseInt(localStorage.getItem('Total'));

    let product = [];
    product.push({
        products: productList,
        details: detailProduct,
        total: totalAmount,
        date: date
    });
    console.log(product);

    console.log(productList);
    console.log(detailProduct);
    console.log(totalAmount);

    $.ajax({
        type: "post",
        url: "../API/recordDataBillProduct.php",
        data: {
            product: productList,
            detail:  detailProduct,
            total: totalAmount,
            date: date
        }, success: function(response) {
            console.log("Success", response);

            if(response.ResponseCode === 200) {

            }
            else {

            }
        }, error: function(err) {
            console.log("Fail", err);
        }
    });
}
// recordDatBillProduct();