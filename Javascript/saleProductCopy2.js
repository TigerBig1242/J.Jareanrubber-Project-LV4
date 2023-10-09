function disableTextBox() {
    $('#type-sale').on('change', function() {
        if($(this).val() === 'สัญญาซื้อขายล่วงหน้า') {
            $('#shippingTime').removeAttr('disabled').focus();
        }
        else {
            $('#shippingTime').attr('disabled', 'disabled')
        }
    });
}

disableTextBox();

    // Display Product
function displayProduct() {
    const idAgent = localStorage.ID;
    $.ajax({
        type: "post",
        url: "../API/saleProduct.php",
        data: {
            idAgent: localStorage.ID
        }, success: function(response) {
            console.log("Success", response);
        }, error: function(err) {
            console.log("Error", err);
        }
    });
}
// displayProduct();

    // Get Product
function getProduct() {
    let renderProduct = '';
    let product;
    let date = new Date();
    console.log(toThaiDateString(date));
    $.ajax({
        type: "get",
        url: "../API/getWarehouseProduct.php",
        success: function(response) {
            console.log("Success", response);
            product = response.Result;
            console.log(product);

                for(let i = 0; i < product.length; i++) {
                    renderProduct += `
                        <div class="product-item" onclick="selectProduct(${product[i].WH_ProductID}, ${product[i].AmountProduct}, '${product[i].LevelProduct}')">
                            <img src="../assets/image/product.jpg" alt="">
                            <div class="product-info">
                                <p>${numberWithCommas(product[i].AmountProduct)} ตัน</p>
                                <p>เกรดยาง ${product[i].LevelProduct}</p>
                            </div>
                        </div>
                    `;
                }
                $("#product").html(renderProduct);
        }, 
        error: function(err) {
            console.log("Error", err);
        }
    });
}
getProduct();

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

    // Create function select product
    let listProduct = [];
function selectProduct(productID, productAmount, productLevel) {
    console.log(productID, productAmount, productLevel);
    let pass = true;
    // let totalAmount;
    for(let i = 0; i < listProduct.length; i++) {
        if(listProduct[i].idProduct == productID) {
            // totalAmount += listProduct[i].amountProduct - listProduct[i].amountProduct;
            listProduct[i].count++;
            pass = false;
        }
    }

    if(pass) {
        listProduct.push({
            idProduct: productID,
            amountProduct: productAmount,
            levelProduct: productLevel,
            // total: totalAmount,
            count: 1
        })
    }
    console.log('List', listProduct);

    let renderListProduct = '';
    let sumAmount = 0;
    let amount = 0;
    for(let i = 0; i < listProduct.length; i++) {
        sumAmount += listProduct[i].amountProduct * listProduct[i].count;
        renderListProduct += `
            <div class="list-item">
                <span>จำนวน: ${numberWithCommas(listProduct[i].amountProduct * listProduct[i].count)} ตัน</span>
                <span>เกรด: ${listProduct[i].levelProduct}</span>
            </div>
        `;
    }

        renderListProduct += `
            <div class="list-item list-summary">
                <p>รวม</p>
                <p>${numberWithCommas(sumAmount)}</p>
            </div>
        `;
    $("#listBoxItem").html(renderListProduct);

    // getDataMaterial();
    // getTypeSale();
}
// selectProduct();

    // Create function clear list
function clearList() {
    listProduct = [];
    console.log(listProduct);
    $("#listBoxItem").html('<p>โปรดเลือกรายการ</p>');

    $("#type-sale").prop('selectedIndex', 0);
    $("#productGrad").prop('selectedIndex', 0);

    $("#shippingTime").val("");
}

function printSlip() {
    window.location.href = '../src/slip.html';
}

    // Get Data Material
function getDataMaterial() {
    let renderDataMaterial = '';
    let dataMaterial;
    $.ajax({
        type: "get",
        url: "../API/getMaterial.php",
        success: function(response) {
            console.log("Success", response);
            dataMaterial = response.Result;

            if(response.ResponseCode === 200) {
                for(let i = 0; i < dataMaterial.length; i++) {
                    renderDataMaterial += `
                        <option value="${dataMaterial[i].mat_level}" onclick="printListProduct('${dataMaterial[i].mat_level}')">${dataMaterial[i].mat_level}</option>
                    `;
                }
                $("#productGrad").html(renderDataMaterial);
            }
        },
        error: function(err) {
            console.log("Error", err);
        }
    });
}
getDataMaterial();

    // Get TypeSale
function getTypeSale() {
    let renderTypeSale = '';
    let typeSale;
    $.ajax({
        type: "get",
        url: "../API/getTypeSale.php",
        success: function(response) {
            console.log("Success", response);

            typeSale = response.Result;
            if(response.ResponseCode === 200) {
                for(let i = 0; i < typeSale.length; i++) {
                    renderTypeSale += `
                        <option value="${typeSale[i].typeSaleName}" onclick="printListProduct('${typeSale[i].typeSaleName}')">${typeSale[i].typeSaleName}</option>

                    `;
                }
                $("#type-sale").html(renderTypeSale);
            }

        },
        error: function(err) {
            console.log("Error", err);
        }
    });
}
getTypeSale();

function toThaiDateString(date) {
    let monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
  
    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();
  
    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
  
    return `${numOfDay} ${month} ${year} ` +
        `${hour}:${minutes}:${second} น.`;
}

function printListProduct(matLevel, TypeSale) {
    let list = [];
    matLevel = $("#productGrad :selected").text();
    TypeSale = $("#type-sale :selected").text()
    console.log(matLevel, TypeSale);
    let shippingTime = $("#shippingTime").val();
    console.log(shippingTime);
    console.log('listProduct :', listProduct);
    console.log(typeof(listProduct));

    let SubAmount;
    let productDetail = [];
    for(let i = 0; i < listProduct.length; i++) {
        SubAmount = listProduct[i].amountProduct - listProduct[i].amountProduct;
        productDetail.push({
                productData: [
                    {   
                        productID: listProduct[i].idProduct,
                        amount: SubAmount
                    }
                ]
            });
            // productDetail.push(productData);
        // console.log("productDetail", productData);
        
        SubAmount = listProduct[i].amountProduct
        productID = listProduct[i].idProduct;
    }

    // productDetail.push({
    //     productData: [
    //         {   
    //             productID: listProduct.idProduct,
    //             amount: listProduct.amountProduct
    //         }
    //     ]
    // });
    
    console.log(SubAmount);
    console.log(typeof(productDetail));
    console.log("productDetail", productDetail);
    // let json =JSON.stringify(productDetail);
    // console.log(json);
    // console.log("productData", productData);
    // console.log(typeof(productData));

    $.ajax({
        type: "post",
        url: "../API/saleProductCopy.php",
        data: {
            listProduct: listProduct
        }, success: function(response) {
            console.log("Success", response);

            // if(response.ResponseCode === 200) {

            // }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
    let productList = JSON.stringify(listProduct);
    console.log('productList :', productList);
    list.push({
        MatLevel: matLevel,
        TypeSale: TypeSale,
        ShippingTime: shippingTime
    });
    listTing = JSON.stringify(list)
    console.log(listTing);
    // window.location.href = "../src/slip.html?list" + productList;
}



