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
            <div class="list-order-items">
                <p>จำนวน : </p>
                <p>${numberWithCommas(listProduct[i].amountProduct)} ตัน</p>
            </div>
            <div class="list-order-items">
                <p>เกรด :</p>
                <p>${listProduct[i].levelProduct}</p>
            </div>
        `;

    }
    displayProduct += `       
        <div class="list-order-summary">
            <p>รวม : </p>
            <p>${numberWithCommas(total)} ตัน</p>
        </div>
    `;
    localStorage.setItem("Total", total);
    // console.log(displayProduct);
    $("#listOrder").html(displayProduct);

    let displayDetailProduct = '';
    for(k = 0; k < productDetail.length; k++) {
        displayDetailProduct += `
            <div class="list-order-detail">
                <p>ประเภทการขาย:</p>
                <p>${productDetail[k].TypeSale}</p>
            </div>
            <div class="list-order-detail">
                <p>ระยะเวลาจัดส่ง:</p>
                <p>${productDetail[k].ShippingTime} วัน</p>
            </div>
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
    let productList = JSON.parse(localStorage.productList);
    let detailProduct = JSON.parse(localStorage.listTing);
    let totalAmount = parseInt(localStorage.getItem('Total'));

    console.log(productList);
    console.log(detailProduct);
    console.log(totalAmount);

    $.ajax({
        type: "post",
        url: "../API/recordDataBillProduct.php",
        data: {
            product: productList,
            detail:  detailProduct,
            total: totalAmount
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