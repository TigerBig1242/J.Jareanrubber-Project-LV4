
var data;
$(document).ready(function() {
    render();
});

// Create function render when into offer sale page 
var html = "";
function render() {
    $.ajax({
        type: 'get',
        url: '../API/get-data-offer_sale2.php',
        data: {

        },success: function(response) {
            console.log('success', response);
                var html = '';
                for(var i = 0; i < response.Result.length; i++) {
                    html += `
            <div class="table-row">		
                        <div class="table-data">${i+1}</div>
                        <div class="table-data">${response.Result[i]}.amount</div>
                        <div class="table-data">${response.Result[i].price}</div>
                        <div class="table-data">${response.Result[i].status}</div>
                        <div class="table-data">${response.Result[i].name}</div>
                        <div class="table-data">${response.Result[i].date}</div>
				<div class="form-submit">
                    <div class="btn-confirm">Confirm</div>
				    <div class="btn-cancel">Cancel</div>
                </div>
			</div>
                    `;
                }
                $("#display-content").html(html);     
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
    inputAmount = $("#input_amount");
    inputPrice = $("#input_price");

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

    return statusAlert;
}

var agent_id;
function confirm_offer(id) {
    if(validate_offerSale()) {
        console.log("Successfully");

        agent_id = id;
        $.ajax({
            type: 'post',
            url: '../API/offer-sale.php',
            data: {
                // id: agent_id,
                amount: $("#input_amount").val(),
                price: $("#input_price").val()
            }, success: (response) => {
                console.log("Success", response);
                console.log(id);
                if(response.RespCode === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "สำเร็จ",
                        text: "ทำรายการสำเร็จ"
                    })
                    render();
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
                console.log(id);
            }
        })
    }
}

// clear border form in html
function clearBorder(id) {
    document.querySelector(`#${id.id}`).style.border = "none";
}