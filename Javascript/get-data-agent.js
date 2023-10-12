 // Get data specifically agent only
 function getDataAgent() {
    $.ajax({
        type: 'get',
        url: '../API/get-data-agent.php',
        success: function(response) {
            console.log("Success", response);
        },
        error: function(error) {
            console.log("Error", error);
        }
    });
}
var infoData;

// Get profile image agent
function getProfileImage() {
    let getImage;
    $.ajax({
        method: 'get',
        url: '../API/get-data-agent.php',
                success: (response) => {
            console.log('success', response);

            getImage = response.Result;
            console.log(getImage);
            if(response.RespCode === 200) {
                var html = '';
                for(var i = 0; i < getImage.length; i++) {
                    html += `                    
                    <div class="card-body" >
                    <div class="d-flex flex-column align-items-center text-center">     
                            <img src="${getImage[i].image}" class="rounded-circle" width="200">
                            <div class="mt-3">
                                <h4 id="welcome" onclick="checkToken(${i})">${getImage[i].agent_name}</h4>       
                            </div> 
                    </div>
                    </div>  
                    `;
                }
                $("#imageInfo").html(html);
            }
        }, error: (err) => {
            console.log('error', err);
        }
    })
}
// getProfileImage();

// Get data specifically agent only
// var infoData;
function getDataAgent() {
    // let infoData = "";
    let renderHTML = "";
    let showNameUser = '';
    $.ajax({
        type: 'get',
        url: '../API/get-data-agent.php',
        success: function(response) {
            console.log("Success", response);
  
            infoData = response.Result;
            console.log(infoData);
  
              if(response.ResponseCode === 200) {
                  for(let i = (page - 1) * 10; i < page * 10; i++) {
                    if(i < infoData.length) {
                        renderHTML += `
                        <tr>
                            <td>${i+1}</td>
                            <td><img src="${infoData[i].image}" class="rounded-circle" width="100"></td>
                            <td>${infoData[i].name}</td>
                            <td>${infoData[i].gender}</td>
                            <td>${infoData[i].status}</td>
                            <td>${infoData[i].address}</td>
                            <td>
                                <div class="btn-control">
                                    <div onclick="openModal(${i}, ${infoData[i].id})" class="btn-confirm" id="btnConfirm">แก้ไขข้อมูล</div>
                                    <div onclick="deleteDataAgent(${infoData[i].id})" class="btn-cancel" id="btnCancel">ลบข้อมูล</div>
                                </div>
                            </td>
                        </tr>                                                                
                          `;
                    }
                  }
                    $("#profileInfo").html(renderHTML);
                // document.getElementById("detailDataAgent").innerHTML;
                // document.write(renderHTML);

                totalPage = Math.ceil(infoData.length / 10);
                let paginationHTML = '';
                paginationHTML += `<button class="btnPrev" onclick = "backPage()"> <img src="../assets/image/arrow.png" alt=""> Prev</button>`;
                for(let i = 1; i<= totalPage; i++) {
                paginationHTML += `<li id = "page${i}" onclick = "currentPage(${i})" class="number-pagination">${i}</li>`;
                }
                paginationHTML += `<button class="btnNext" onclick = "nextPage()">Next <img src="../assets/image/arrow.png" alt=""> </button>`;
                $("#pagination").html(paginationHTML);                                          
                    }
                    showNameUser += `
                        <p>ชื่อผู้ใช้: ${localStorage.fullname}</p>
                        `;
                        $("#nameUser").html(showNameUser);
                },
                error: function(error) {
                    console.log("Error", error);
        }
    });
  }
  getDataAgent();

// Open modal
function openModal(index, id) {
    let modalOpen = $("#modal");
    
    let inputFullName = document.querySelector("#input_full_name");
    let inputAddress = document.querySelector("#input_address");
    let inputGender = $("#input_gender");
    let inputStatus = $("#input_status");
    
    $(inputFullName).val(infoData[index].name);
    $(inputGender).val(infoData[index].gender);
    $(inputStatus).val(infoData[index].status);
    $(inputAddress).val(infoData[index].address);
    agent_id = id;
    console.log(agent_id);

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

    // Validate form edit
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
        // console.log(id);

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
                        window.location.href = "../src/info-agent.html";
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: 'Updated fail'
                    }).then(() => {
                        window.location.href = "../src/info-agent.html";
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

// Delete data agent
function deleteDataAgent(index) {
    Swal.fire({
        icon: 'warning',
        title: 'แน่ใจหรือไม่',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
    }).then((result) => {
        if(result.isDenied) {
            $.ajax({
                type: 'post',
                url: '../API/deleteDataAgent.php',
                data: {
                    id: index
                }, success: function(response) {
                    console.log('Success', response);
                }, error: function(err) {
                    console.log('Error', err);
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'ลบข้อมูลเรียบร้อย'
            }).then(() => {
                window.location.href = '../src/info-agent.html';
            }
    )}
    });
}

// Create function NextPage with arrow function below
let nextPage = () => {
    if(page != totalPage) {
        $(".number-pagination").removeClass("active-pagination");
        $("#page" + page).on("click");
        page++;
        getDataAgent();
        $("#page" + page).addClass("active-pagination");
    }
  }
  
    // Create function backPage with arrow function below
  let backPage = () => {
    if(page != 1) {
        $(".number-pagination").removeClass("active-pagination");
        page--;
        getDataAgent();
        $("#page" + page).addClass("active-pagination");                                                
    }
  }
  
    // Create function Current with arrow function below
  let currentPage = (current_Page) => {
      $(".number-pagination").removeClass("active-pagination");
      // $("#page" + page).on("click");
      page = current_Page;
      getDataAgent();
      $("#page" + page).addClass("active-pagination");
  }

let page = 1;
var totalPage = 0;