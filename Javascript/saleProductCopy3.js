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
    let WHProductID = [];
    console.log(toThaiDateString(date));
    $.ajax({
        type: "get",
        url: "../API/getWarehouseProduct.php",
        success: function(response) {
            console.log("Success", response);
            product = response.Result;
            console.log(product);
            
           
                for(let i = 0; i < product.length; i++) {
                    WHProductID += product[i].WH_ProductID;
                    renderProduct += `
                        <div class="product-item" onclick="printListProduct(${product[i].WH_ProductID})">
                            <img src="../assets/image/product.jpg" alt="">
                            <div class="product-info">
                                <p>${numberWithCommas(product[i].AmountProduct)} ตัน</p>
                                <p>เกรดยาง ${product[i].LevelProduct}</p>
                            </div>
                        </div>
                    `;
                }
                $("#product").html(renderProduct);
                // console.log(WHProductID);

                // WHProductID.push({
                //     WHID: product.WH_ProductID
                // });
                // console.log(WHProductID);
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
    // let sumAmount = 0;
function selectProduct(productID, productAmount, productLevel) {
    console.log(productID, productAmount, productLevel);
    let sumAmount = 0;
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
                <p class="summary">${numberWithCommas(sumAmount)}</p>
            </div>
        `;
    $("#listBoxItem").html(renderListProduct);
    // return sumAmount;

    // getDataMaterial();
    // getTypeSale();
}
// console.log(sumAmount);

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

function printListProduct(matLevel, TypeSale, WHProductID) {
    let list = [];
    matLevel = $("#productGrad :selected").text();
    TypeSale = $("#type-sale :selected").text()
    let amount = 0;
    let price = 0;
    let Type_Sale;
    Type_Sale = document.querySelector("#type-sale").value;
    amount = document.getElementById("fillAmount").value;
    price = document.getElementById("fillPrice").value;
    console.log(price);
    console.log(amount);
    console.log(Type_Sale);
    console.log(matLevel, TypeSale);
    console.log(matLevel);
    console.log(WHProductID);

    let shippingTime = $("#shippingTime").val();
    console.log(shippingTime);
    console.log('listProduct :', listProduct);
    localStorage.setItem("amountProduct", amount);
    localStorage.setItem("total", amount);
    localStorage.setItem("price", price);
    localStorage.setItem("TypeSale", Type_Sale);
    localStorage.setItem("materialLevel", matLevel);
    localStorage.setItem("shippingTime", shippingTime);

    $.ajax({
        type: "post",
        url: "../API/updateWarehouseProductCopy.php",
        data: {
            amount: amount,
            materialLevel: matLevel
        }, success: function(response) {
            console.log("Success", response);

            if(response.ResponseCode === 200) {
                Swal.fire({
                  icon: "success",
                  title: "ทำการขายเรียบร้อย",
                }).then(() => {
                  window.location.href = "../src/orderCopy.html";
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "ทำรายการไม่สำเร็จ",
                  text: "Logout not success",
                });
              }
        },
        error: function(err) {
            console.log("Fail", err);
        }
    });
    
    // window.location.href = "../src/slip.html?list" + productList;
}
