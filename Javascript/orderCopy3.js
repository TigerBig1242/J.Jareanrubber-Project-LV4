$(document).ready(function(){
    displayProductList();
    // recordDataBillProduct();
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
// sumListProduct();

function displayProductList() {
    // let totalAmount = localStorage.getItem('sumAmount');
    // let listProduct = JSON.parse(localStorage.productList);
    // let productDetail = JSON.parse(localStorage.listTing);

    let productAmount = localStorage.getItem('amountProduct');
    let price = localStorage.getItem('price');
    let Total = localStorage.getItem('total');
    let shippingTime = localStorage.getItem('shippingTime');
    let materialLevel = localStorage.getItem('materialLevel');
    let typeSale = localStorage.getItem('TypeSale');

    // console.log(parseInt(totalAmount));
    // console.log(listProduct);
    // console.log(productDetail);

    console.log(productAmount);
    console.log(price);
    console.log(Total);
    console.log(shippingTime);
    console.log(materialLevel);
    console.log(typeSale);

    let list = [];

    list.push({
        amount: productAmount,
        price: price,
        total: Total,
        shippingTime: shippingTime,
        materialLevel: materialLevel,
        typeSale: typeSale
    });
    console.log(list);

    let displayProduct = '';
    let total = 0;
    let count = 1;
    for(let i = 0; i < list.length; i++) {
        total += list[i].amount * price
        displayProduct += `
            <tbody>
            <tr>
                <td>
                <table class="invoice-items" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td> จำนวน: </td>
                        <td class="alignright">${numberWithCommas(list[i].amount)} กิโลกรัม</td>
                    </tr>
                    <tr>
                        <td> เกรด:  </td>
                        <td class="alignright"> ${list[i].materialLevel} </td>
                    </tr>
                    <tr>
                        <td> ราคา:  </td>
                        <td class="alignright"> ${numberWithCommas(list[i].price)} </td>
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

    let displayDetailProduct = '';
    for(k = 0; k < list.length; k++) {
        displayDetailProduct += `
            <tbody>
                <tr>
                    <td>
                    <table class="invoice-items" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr>
                            <td> ประเภทการขาย: </td>
                            <td class="alignright">${list[k].typeSale}</td>
                        </tr>
                        <tr>
                            <td> ระยะเวลาจัดส่ง:  </td>
                            <td class="alignright"> ${list[k].shippingTime} </td>
                        </tr>
                        </tbody>
                    </table>
                    </td>
            </tr>
            </tbody>
        `;
    }
    // $("#orderDetail").html(displayDetailProduct).promise().done(() => {
    //     window.print();
    // });
    // $("#orderDetail").html(displayDetailProduct)

    let displayProducts = '';
    displayProducts += `       
        <tbody>
            <tr>
                <td>
                <table class="invoice-items" cellpadding="0" cellspacing="0">
                    <tr class="total">
                        <td class="alignright" width="75%">รวม</td>
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
    $("#orderDetail").html(displayDetailProduct)
    $("#total").html(displayProducts).promise().done(() => {
        window.print();
    });

    // let displayDetailProduct = '';
    // for(k = 0; k < list.length; k++) {
    //     displayDetailProduct += `
    //         <tbody>
    //             <tr>
    //                 <td>
    //                 <table class="invoice-items" cellpadding="0" cellspacing="0">
    //                     <tbody>
    //                     <tr>
    //                         <td> ประเภทการขาย: </td>
    //                         <td class="alignright">${list[k].typeSale}</td>
    //                     </tr>
    //                     <tr>
    //                         <td> ระยะเวลาจัดส่ง:  </td>
    //                         <td class="alignright"> ${list[k].shippingTime} </td>
    //                     </tr>
    //                     </tbody>
    //                 </table>
    //                 </td>
    //         </tr>
    //         </tbody>
    //     `;
    // }
    // $("#orderDetail").html(displayDetailProduct).promise().done(() => {
    //     window.print();
    // });
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
function recordDataBillProduct() {
    let date = new Date().toLocaleDateString('en-EN');
    // const result = new Date().toLocaleDateString('th-TH');
    console.log(date);
    // let productList = JSON.parse(localStorage.amountProduct);
    // let detailProduct = JSON.parse(localStorage.levelMat);
    // let totalAmount = parseInt(localStorage.getItem('Total'));

    let amountProduct = 0;
    let price = 0;
    let total = 0;
    let shippingTime = 0;
    let typeSale;
    let levelMat;

    price = localStorage.getItem('price');
    amountProduct = localStorage.getItem('amountProduct');
    total = localStorage.getItem('Total');
    shippingTime = localStorage.getItem('shippingTime');
    levelMat = localStorage.getItem('materialLevel');
    typeSale = localStorage.getItem('TypeSale');

    console.log(amountProduct);
    console.log(price);
    console.log(total);
    console.log(shippingTime);
    console.log(levelMat);

    let product = [];
    // product.push({
    //     products: productList,
    //     details: detailProduct,
    //     total: totalAmount,
    //     date: date
    // });
    // console.log(product);

    // console.log(productList);
    // console.log(detailProduct);
    // console.log(totalAmount);

    $.ajax({
        type: "post",
        url: "../API/recordDataBillProductCopy3.php",
        data: {
            amount: amountProduct,
            price:  price,
            shippingTime: shippingTime,
            levelMaterial: levelMat,
            typeSale: typeSale,
            total: total
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
recordDataBillProduct();