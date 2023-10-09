var data;

$(document).ready(() => {
    // $('#welcome').text(localStorage.fullname);

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


    // Get profile image agent
    $.ajax({
        method: 'post',
        url: '../API/get-info-person.php',
        data:{
            token: localStorage.token
        }, success: (response) => {
            console.log('success', response);

            if(response.RespCode === 200) {
                var html = '';
                for(var i = 0; i < response.Result.length; i++) {
                    html += `                    
                    <div class="card-body" >
                    <div class="d-flex flex-column align-items-center text-center">     
                            <img src="${response.Result[i].image}" class="rounded-circle" width="200">
                            <div class="mt-3">
                                <h4 id="welcome" onclick="checkToken(${i})">${response.Result[i].fullName}</h4>       
                            </div> 
                    </div>
                    </div>  
                    `;
                }
                $("#image_info").html(html);
            }
        }, error: (err) => {
            console.log('error', err);
        }
    })

    // Get profile info
    $.ajax({
        type: 'post',
        url: '../API/get-info-person.php',
        data:{
            token: localStorage.token
        }, success: (response) => {
            console.log('success', response);
            data = response.Result;
            console.log(data);

            if(response.RespCode === 200) {
                let html = '';
                for(let i = 0; i < data.length; i++) {
                    html += `
                    <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      ${data[i].fullName}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Gender</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      ${data[i].gender}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Status</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      ${data[i].status}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      ${data[i].address}
                    </div>
                  </div>
                  <hr>
                      <div class="row">
                        <div class="col-sm-12">
                          <button type="button" class="btn btn-warning" onclick="open_modal(${i}, ${data[i].id})">Edit</button>
                          <button type="button" class="btn btn-danger" onclick="logout()">Logout</button>
                        </div>
                      </div>
                    `;
                }
                $('#profile_info').html(html);
            }
        }, error: (err) => {
            console.log('error', err);
        }
    })
    // Modal profile edit
    $.ajax({
        type: 'post',
        url: '../API/get-info-person.php',
        data:{
            token: localStorage.token
        }, success: (response) => {
            console.log('success', response);

            if(response.RespCode === 200) {
                let html = '';
                for(let i =0; i < response.Result.length; i++) {
                    html = `

                    `;
                }
                // $('#modal').html(html);
            }
        }, error: (err) => {
            console.log('error', err);
        }
    })

});

// Check token
// function checkToken(id) {
//     $.ajax({
//         type: 'post',
//         url: '../API/check-token.php',
//         data: {
//             token: localStorage.token
//         }, success: (response) => {
//             console.log('checkToken', response);
//             if(response.RespCode === 400) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Token expired',
//                     text: 'Token expired or token exist'
//                 }).then(() => {
//                     localStorage.clear();
//                     window.location.href = "../src/login.html"
//                 })
//             }
//         }, error: (err) => {
//             console.log('error', err);
//         }
//     })
// }

// Open modal
var agent_id;
function open_modal(index, id) {
    let modalOpen = $("#modal");
    
    let inputFullName = document.querySelector("#input_full_name");
    let inputAddress = document.querySelector("#input_address");
    let inputGender = $("#input_gender");
    let inputStatus = $("#input_status");
    
    $(inputFullName).val(data[index].fullName);
    $(inputGender).val(data[index].gender);
    $(inputStatus).val(data[index].status);
    $(inputAddress).val(data[index].address);
    agent_id = id;
    // console.log(agent_id);

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

// Get Information data
// function getProFile(id) {
//     document.querySelector(`#${id.id}`).html(html);
//     $.ajax({
//         method: 'post',
//         url: '../API/get-info-person.php',
//         data:{
//             token: localStorage.token
//         }, success: (response) => {
//             console.log('success', response);

//             if(response.RespCode == 200) {
//                 let html = '';
//                 for(let i = 0; i < response.Result.length; i++) {
//                     html += `
//                 <div class="card-body" >
//                     <div class="d-flex flex-column align-items-center text-center">  
//                         <img src="${response.Result[i].image}" class="rounded-circle" width="200">
//                         <div class="mt-3">
//                             <h4 id="welcome" onclick="checkToken(${i})">${response.Result[i].fullName}</h4>
//                         </div>
//                     </div>
//                 </div> 
//                     `;
//                 }
//                 // $("#image_info").html(html);
//                 // document.querySelector(`#${id.id}`).html(html);
//             }
//         }, error: (err) => {
//             console.log('error', err);
//         }
//     })
// }

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

function validate_edit() {
    let statusAlert = true;

    let full_Name = $("#input_full_name");
    let agentGender = $("#input_gender");
    let agentStatus = $("#input_status");
    let agentAddress = $("#input_address");

    if(full_Name.val() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops sorry!',
            text: 'Please fill full name'
        })
        full_Name.css("border", "1px solid red");
        statusAlert = false;
    }
    else {
        full_Name.css("border", "unset");
        statusAlert = true;
    }

    if(agentGender.val() === "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops sorry!',
            text: 'Please fill gender'
        })
        agentGender.css("border", "1px solid red");
        statusAlert = false;
    }
    else {
        agentGender.css("border", "unset");
        statusAlert = true;
    }

    if(agentStatus.val() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops sorry!',
            text: 'Please fill status'
        })
        agentStatus.css("border", "1px solid red");
        statusAlert = false;
    }
    else {
        agentStatus.css("border", "unset");
        statusAlert = true;
    }

    if(agentAddress.val() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops sorry',
            text: 'Please fill address'
        })
        agentAddress.css("border", "1px solid red");
        statusAlert = false;
    }
    else {
        agentAddress.css("border", "unset");
        statusAlert = true;
    }

    return statusAlert;
}

function update_info(index, id) {
    if(validate_edit()) {
        console.log("Update success");

        // agent_id = id;
        // console.log(agent_id);

        $.ajax({
            type: 'post',
            url: '../API/update-info.php',
            data: {
                id: agent_id,
                name: $("#input_full_name").val(),
                gender: $("#input_gender").val(),
                status: $("#input_status").val(),
                address: $("#input_address").val()
            }, success: (response) => {
                console.log('success', response);
                // agent_id = id;
                // console.log(agent_id);
                if(response.RespCode === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Update success',
                        text: 'Update successfully'
                    }).then(() =>{
                        window.location.href = "../src/profile-admin.html";
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: 'Updated fail'
                    }).then(() => {
                        window.location.href = "../src/profile-admin.html";
                    })
                }
            }, error: (err) => {
                console.log('error', err);
            }
        })
    }
}

// clear border in html
function clearBorder(id) {
    document.querySelector(`#${id.id}`).style.border = "none";
}

