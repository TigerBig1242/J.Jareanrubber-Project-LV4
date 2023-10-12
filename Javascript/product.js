$(document).ready(function() {
    render();
})
function recordProduct() {
    let amountProduct = document.getElementById("inputNumProduct");
    let gradProduct = document.getElementById("inputGradProduct");

    $.ajax({
        type: "post",
        url: "../API/productCopy.php",
        data: {
            id: localStorage.ID,
            amountProduct: $("#inputNumProduct").val(),
            gradProduct: $("#inputGradProduct").val()
        }, success: function(response) {
            console.log("Success", response);

            if(response.ResponseCode === 200) {
                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "เพิ่มข้อมูลเรียบร้อย"
                  }).then(() => {
                    window.location.href = "../src/product.html";
                  })
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "ผิดพลาด",
                    text: "เพิ่มข้อมูลไม่สำเร็จ"
                  })
            }
        }, error: function(err) {
            console.log("Error", err);
        }
    });
}

function render() {
    let showNameUser = '';
    showNameUser += `
    <p>ชื่อผู้ใช้: ${localStorage.fullname}</p>
    `;
    $("#nameUser").html(showNameUser);
}
// render();

// Open modal
function openModal() {
    let modalOpen = $("#modal");
  
    modalOpen.css("display", "flex");
  
    setTimeout(() =>{
        modalOpen.css("opacity", "1");
        modalOpen.css("transform", "translateY(0)");
    }, 50)
}
  
  // Close modal
function close_modal() {
    let modalClose = $(".modal");
  
    modalClose.css("opacity", "0");
    modalClose.css("transform", "translateY(200px)");
     setTimeout(() => {
        modalClose.css("display", "none");
     }, 300);
}

// Create function validate_offersale to protect blank value
function validate_offerSale() {

    let numberDay = document.getElementById("#inputNumDayMat");
    let matGrad = document.getElementById("#inputGradMat");
  
    let statusAlert = true;
  
    if(numberDay.val().length <= 0) {
        Swal.fire({
            icon: "error",
            title: "ขอมูลไม่ครบ",
            text: "โปรดระบุจำนวน"
        })
        numberDay.css("border", "1px solid red");
        statusAlert = false;
    } else {
        numberDay.css("border", "unset");
        statusAlert = true;
    }
  
    if(matGrad.val().length <= 0) {
        Swal.fire({
            icon: "error",
            title: "ข้อมูลไม่ครบ",
            text: "โปรดระบุราคา"
        })
        matGrad.css("border", "1px solid red");
        statusAlert = false;
    } else {
        matGrad.css("border", "unset");
        statusAlert = true;
    }
  
    return statusAlert;
}

// clear border form in html
function clearBorder(id) {
    document.querySelector(`#${id.id}`).style.border = "none";
}

    // Get data product display
function getDataProduct() {
    let displayProduct;
    let dataProduct;
    $.ajax({
        type: "get",
        url: "../API/getDataProduct.php",

        success: function(response) {
            console.log("Success", response);
            dataProduct = response.Result;

            for(let i = 0; i < dataProduct.length; i++) {
                displayProduct += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${new Intl.NumberFormat().format(dataProduct[i].amount)} ตัน</td>
                        <td>เกรด ${dataProduct[i].product_grad}</td>
                        <td>${localStorage.fullname}</td>
                        <td>${dataProduct[i].product_date}</td>
                    </tr>
                `;
            }
            $("#tbody").html(displayProduct);
        }, error: function(err) {
            console.log("Error", err);
        }
    });
}
getDataProduct();

    // Get Material
function getMaterial() {
    let matGrad;
    let materialGrad = '';
    $.ajax({
        type: "get",
        url: "../API/getMaterial.php",
        success: function(response) {
            console.log("Success", response);
            matGrad = response.Result;

            if(response.ResponseCode === 200) {
                // let materialGrad = '';
                for(let i = 0; i < matGrad.length; i++) {
                    materialGrad += `
                        <option value="${matGrad[i].mat_level}">เกรด ${matGrad[i].mat_level}</option>
                    `;
                }
                $("#inputGradProduct").html(materialGrad);
            }
        },error: function(err) {
            console.log("Error", err);
        }
    });
}
getMaterial();