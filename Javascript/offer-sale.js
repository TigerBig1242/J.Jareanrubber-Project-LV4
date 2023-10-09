
$(document).ready(function() {
    render();
    // material()
    // dropdown();
    $("#page1").addClass("active-pagination");

    // Check token agent
    $.ajax({
        type: 'post',
        url: '../API/check-token.php',
        data: {
            token: localStorage.token
        }, success: (response) => {
            console.log('checkToken', response);
            if(response.RespCode === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Token expired',
                    text: 'Token expired or token exist'
                }).then(() => {
                    localStorage.clear();
                    window.location.href = "../src/login.html"
                })
            }
        }, error: (err) => {
            console.log('error', err);
        }
    })
    ;
});

var data;
var page = 1;
var totalPage = 0;
// Create function render when into offer sale page 
var html = "";
function render() {
    $.ajax({
        type: 'post',
        url: '../API/get-data-offer-sale.php',
        data: {
            token: localStorage.token
        },success: function(response) {
            console.log('success', response.Result);
            data = response.Result;
            if(response.RespCode === 200) {
                let html = '';
                for(let i = (page - 1) * 10; i < page * 10; i++) {
                    if (i < data.length) {
                    html += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${new Intl.NumberFormat().format(response.Result[i].amount)} ตัน</td>
                        <td>${response.Result[i].price} บาท</td>
                        <td>${response.Result[i].numDay} วัน</td>
                        <td>เกรด ${response.Result[i].matGrad}</td>
                        <td>${response.Result[i].status}</td>
                        <td>${response.Result[i].name}</td>
                        <td>${response.Result[i].date}</td>
                    </tr>
                    `;
                    }
                }
                $("#tbody").html(html);

                totalPage = Math.ceil(data.length / 10);
                let paginationHTML = "";
                paginationHTML = `<div onclick="backPage()" class="btn-pagination"> < </div>`;
                for (let j = 1; j <= totalPage; j++) {
                    paginationHTML += `
                    <div id="page${j}" onclick="currentPage(${j})" class="number-pagination">${j}</div>
                  `; 
                }
                paginationHTML += `
                <div onclick="nextPage()" class="btn-pagination">
                  >
                </div>
                `;
                $("#pagination").html(paginationHTML);
            }
        }, error: function(err) {
            console.log('error', err);
        }
    })
}

// Create function Open modal
function open_modal_create() {
    $('#modal_create').css("display", "flex");

    setTimeout(() => {
        $("#modal_create").css("opacity", "1");
        $("#modal_create").css("transform", "translateY(0)")
    }, 50)
}

// Create function Close modal
function close_modal() {
    closeModal = $(".modal");

    closeModal.css("opacity", "0");
    closeModal.css("transform", "translateY(200px)");
    setTimeout(() => {
        closeModal.css("display", "none");
    }, 300)
}

// Create function validate_offersale to protect blank value
function validate_offerSale() {
    const inputAmount = $("#input_amount");
    const inputPrice = $("#input_price");
    const numberDay = $("#numDay");
    const matGrad = $("#level-grad");

    let statusAlert = true;

    if(inputAmount.val().length <= 0) {
        Swal.fire({
            icon: "error",
            title: "ขอมูลไม่ครบ",
            text: "โปรดระบุจำนวน"
        })
        inputAmount.css("border", "1px solid red");
        statusAlert = false;
    } else {
        inputAmount.css("border", "unset");
        statusAlert = true;
    }

    if(inputPrice.val().length <= 0) {
        Swal.fire({
            icon: "error",
            title: "ข้อมูลไม่ครบ",
            text: "โปรดระบุราคา"
        })
        inputPrice.css("border", "1px solid red");
        statusAlert = false;
    } else {
        inputPrice.css("border", "unset");
        statusAlert = true;
    }

    if(numberDay.val().length <= 0) {
        Swal.fire({
            icon: "error",
            title: "ข้อมูลไม่ครบ",
            text: "ระบุจำนวนวันที่กรีดยาง"
        })
        numberDay.css("border", "1px solid red");
    } else {
        numberDay.css("border", "unset");
        statusAlert = true;
    }

    if(matGrad.val().length <= 0) {
        Swal.fire({
            icon: "error",
            title: "ข้อมูลไม่ครบ",
            text: "ระบุเกรดยางก้อน"
        })
        matGrad.css("border", "1px solid red");
    } else {
        matGrad.css("border", "unset");
        statusAlert = true
    }

    return statusAlert;
}

var agent_id;

// Function Confirm offer
function confirm_offer(id) {
    // material()
    // if(validate_offerSale()) {
        ;
        // if(material() === null) {
        // console.log("Successfully");
        // inputAmount = "";
        // inputPrice = "";
        // numberDay = "";

        let agent_id = id;
        console.log(agent_id);
        $.ajax({
            type: 'post',
            url: '../API/offer-saleCopy.php',
            data: {
                // id: agent_id,
                id: localStorage.ID,
                amount: $("#input_amount").val(),
                price: $("#input_price").val(),
                numDay: $("#numDay").val(),
                matGrad: $("#level-grad").val()
            }, success: (response) => {
                console.log("Success", response);
                console.log(agent_id);
                if(response.RespCode === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "สำเร็จ",
                        text: "ทำรายการสำเร็จ"
                    }).then(() => {
                        window.location.href = "../src/offer-sale.html";
                    })
                }
                else {
                    Swal.fire({
                        icon: "warning",
                        title: "ไม่สำเร็จ",
                        text: "ทำรายการไม่สำเร็จ"
                    })
                }
            }, error: (err) => {
                console.log("error", err);
                console.log(agent_id);
            }
        })
        // }
    // }
}

function logout() {
    $.ajax({
        type: "post",
        url: "../API/logout.php",
        data: {
            token: localStorage.token
        }, success: (response) => {
            console.log("Good", response);

            if(response.RespCode === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Logout successfully'
                }).then(() => {
                    localStorage.clear();
                    window.location.href = "../src/home.html";
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something want wrong',
                    text: 'Logout not success'
                })
            }
        }, error: (err) => {
            console.log('Fail', err);
        }
    })
}

    // Create function material
function material() {
    let numDay;

    // if(validate_offerSale()) {
        $.ajax({
            type: "get",
            url: "../API/material.php",
            success: function(response) {
                console.log("Success", response.Result);
                if(response.RespCode === 200) {
                    numDay = response.Result;

                    let numDays = '';
                    let level = '';
                    for(let i = 0; i < numDay.length; i++) {
                        numDays += `
                        <option value="${numDay[i].material}">${numDay[i].material} วัน</option>
                        `;
                    }
                    $("#numDay").html(numDays);
    
                    for(let i = 0; i < numDay.length; i++) {
                        level += `
                        <option value="${numDay[i].level}">เกรด ${numDay[i].level}</option>                              
                        `;
                    }
                    $("#level-grad").html(level);
                }
                
            }, error: function(error) {
                console.log("Error", error);
            }
        })
    // }
} 
material();

// clear border form in html
function clearBorder(id) {
    document.querySelector(`#${id.id}`).style.border = "none";
}

    // Create function NextPage with arrow function below
nextPage = () => {
    if (page != totalPage) {
        $(".number-pagination").removeClass("active-pagination");
        page++;
        render();
        $("#page" + page).addClass("active-pagination");
    }
}

    // Create function Current with arrow function below
currentPage = (current_Page) => {
        $(".number-pagination").removeClass("active-pagination");
        page = current_Page;
        render();
        $("#page" + page).addClass("active-pagination");
}

    // Create function backPage with arrow function below
backPage = () => {
    if(page != 1) {
        $(".number-pagination").removeClass("active-pagination");
        page--;
        render();
        $("#page" + page).addClass("active-pagination");
    }
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
    