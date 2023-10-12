// module.exports = {receipt};
//  export { receipted };

$(document).ready(() => {
  render();

// $("#btnReceipt").click(function(){
//   alert("btnReceipt");
// });

  $("#page1").addClass("active-pagination");
  let idd = $("#checkbox").prop('checked', true);
  console.log(typeof(idd));

  // Check token agent
  $.ajax({
    type: "post",
    url: "../API/check-token.php",
    data: {
      token: localStorage.token,
    },
    success: (response) => {
      console.log("CheckToken", response);
      if (response.RespCode === 400) {
        Swal.fire({
          icon: "error",
          title: "Token expired",
          text: "Token expired or token exist",
        }).then(() => {
          localStorage.clear();
          window.location.href = "../src/login.html";
        });
      }
    },
    error: (err) => {
      console.log("error", err);
    },
  });

})
var data;
let page = 1;
var totalPage = 0;


// Create function render when into offer sale page
// var html = "";
function render() {
  // invoice();
  // let data;
  const idEmp = localStorage.ID;
  console.log(idEmp);

  let showNameUser = '';
  const nameUser = localStorage.fullname;
  console.log(nameUser);
  showNameUser += `
    <p>ชื่อผู้ใช้: ${localStorage.fullname}</p>
  `;
  $("#nameUser").html(showNameUser);
  let listID = {};
  $.ajax({
    type: "post",
    url: "../API/get-data-offer-sale-admin.php",
    data: {
      token: localStorage.token,
      // name:localStorage.fullname
    },
    success: function (response) {
      console.log("Success", response.Result);
      data = response.Result;
      console.log(data);

      let invoices = [];
      invoices = $(":checkbox").val($(this).is(":checked"));
      console.log(typeof(invoices));

      if (response.RespCode === 200) {
        let html = [];
        for (let i = (page - 1) * 10; i < page * 10; i++) {
            if( i < data.length) {
          html += `
                    <tr>
                        <td><input type = "checkbox" class = "checkbox" id = "checkbox${data[i].id}" onclick = "" value = "${data[i].id}""> ${i + 1} </td>
                        <td>${data[i].date}</td>
                        <td>${new Intl.NumberFormat().format(data[i].amount)} ตัน</td>
                        <td>${data[i].price} บาท</td>
                        <td>${data[i].numDay} วัน</td>
                        <td>เกรด ${data[i].grad}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].status}</td>
                        <td>
                          <div class="btn-control">
                              <div onclick="confirmOffer(${data[i].id}), getStockMaterial(${data[i].id})" class="btn-confirm" id="btnConfirm">ซื้อ</div>
                              <div onclick="cancelOffer(${data[i].id})" class="btn-cancel" id="btnCancel">ไม่ซื้อ</div>
                          </div>
                        </td>
                    </tr>
                  `;
                    // console.log(html);
                    // let idd = data[i].id;
                    // console.log(idd);
            }
            ;
            // invoice();        
        }

        let infos = $("#checkbox").change(function(data) {
          $.get(html, {id: this.id, checked: this.checked});
        });
        console.log(infos);
        console.log(typeof(infos));

        listID = $("#checkbox").attr(":checked", true);
        console.log(listID);
        console.log(typeof(listID));

        let check = document.getElementById("checkbox");
        console.log(check);
        console.log(typeof(check));

        let checkBox;
        if(infos.checked) {
          // checkBox = $("#checkbox").val();
          checkBox = infos;
          return checkBox
        }
        console.log(checkBox);
        console.log(typeof(checkBox));

        let info;
        if($("#checkbox").is(":checked")) {
          info = $("#checkbox").val();
          return info;
        }
        console.log(info);
        console.log(typeof(info));
        // window.location.href = "../src/invoice.html?id=" + idEmp;
        $("#tbody").html(html);
        // console.log(html);

        totalPage = Math.ceil(data.length / 10);
        let paginationHTML = '';
        paginationHTML += `<button class="btnPrev" onclick = "backPage()"> <img src="../assets/image/arrow.png" alt=""> Prev</button>`;
        for(let i = 1; i<= totalPage; i++) {
          paginationHTML += `<li id = "page${i}" onclick = "currentPage(${i})" class="number-pagination">${i}</li>`;
        }
        paginationHTML += `<button class="btnNext" onclick = "nextPage()">Next <img src="../assets/image/arrow.png" alt=""> </button>`;
        $("#pagination").html(paginationHTML);

        // $("#pagination").html(paginationHTML);
        // render();
        // confirmOffer();
      }
      
      return data;
    },
    error: function (err) {
      console.log("error", err);
    },
  });
 
}

// Create function confirmOffer()
var agent_id;
function confirmOffer(id, dataStockMaterial) {
  sumResult();
  // console.log(listAmount);
  console.log(idStock);
  let stock = getStockMaterial.call(this, dataStockMaterial);
  getStockMaterial.call(this, dataStockMaterial);
  // let idStock = stockID;
  console.log(new getDataMaterial(dataStockMaterial).ST_MaterialID);
  console.log(stock);
  // alert("Confirm success", id);
  // agent_id = localStorage.ID;
  agent_id = id;
  // console.log(agent_id);
  console.log(agent_id);

  $.ajax({
    type: "post",
    url: "../API/confirm-order.php",
    data: {
      // id: localStorage.ID,
      id: agent_id,
      idStock: idStock
      // stock_ID: idStock
      // status: data.response.status
    },
    success: function (response) {
      console.log("success", response);
      if (response.RespCode === 200) {
        Swal.fire({
          icon: "success",
          title: "อนุมัติคำสั่งซื้อเรียบร้อย",
        });
      }
      render();
    },
    error: function (err) {
      console.log("error", err);
    },
  });
}

// Create function cancelOffer()
function cancelOffer(id) {
  // alert("Cancel success");
  agent_id = id;
  console.log(id);

  $.ajax({
    type: "post",
    url: "../API/cancel-order.php",
    data: {
      id: agent_id,
    },
    success: function (response) {
      console.log("Success", response);

      if (response.RespCode === 200) {
        Swal.fire({
          icon: "error",
          title: "ยกเลิกคำสั่งซื้อเรียบร้อย",
        });
        render();
      }
    },
    error: function (err) {
      console.log("error", err);
    },
  });
}

function logout() {
  $.ajax({
    type: "post",
    url: "../API/logout.php",
    data: {
      // id: offerSaleId,
      token: localStorage.token,
    },
    success: (response) => {
      console.log("Good", response);

      if (response.RespCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Logout successfully",
        }).then(() => {
          localStorage.clear();
          window.location.href = "../src/home.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something want wrong",
          text: "Logout not success",
        });
      }
    },
    error: (err) => {
      console.log("Fail", err);
    },
  });
}

// Create Report receipt function normal
// var offerSaleId;
function receipted(id) {
  console.log(id);
  // document.getElementById("btnReceipt").addEventListener("click", false);
    let disPlay = "";
    let offerSaleId = id.toString();
    console.log(typeof offerSaleId);
    $.ajax({
      type: "post",
      url: "../API/receipt2.php",
      data: {
        id: offerSaleId,
        // id_emp: localStorage.ID
      },
      success: (response) => {
        console.log("Success", response);
  
        if (response.RespCode === 200) {
          for (let i = 0; i < response.length; i++) {
            disPlay += `
            
            `;
          }
          $("#receipt").html(disPlay);
        } else {
  
        }
          window.location.href = "../src/receipt.html?id=" + offerSaleId;
        // window.print();
        // console.log(localStorage.token);
        return response;
      },
      error: (err) => {
        console.log("error", err);
      },
    });

  // return response;
}

//  Create function pagination
function renderPagination(data) {
  let pagess = '';
  for (let i = (page - 1) * 10;  i < page * 10; i++) {
    // if (i < data.length) {

    // }
  }

  // totalPage = Math.ceil(data.length / 10);
  // let paginationHTML = "";
  // paginationHTML = `<div onclick="back_page()" class="btn-pagination"> < </div>`;
  console.log(data);
}

  // Create function NextPage with arrow function below
let nextPage = () => {
  if(page != totalPage) {
      $(".number-pagination").removeClass("active-pagination");
      $("#page" + page).on("click");
      page++;
      render();
      $("#page" + page).addClass("active-pagination");
  }
}

  // Create function backPage with arrow function below
let backPage = () => {
  if(page != 1) {
      $(".number-pagination").removeClass("active-pagination");
      page--;
      render();
      $("#page" + page).addClass("active-pagination");                                                
  }
}

  // Create function Current with arrow function below
let currentPage = (current_Page) => {
    $(".number-pagination").removeClass("active-pagination");
    // $("#page" + page).on("click");
    page = current_Page;
    render();
    $("#page" + page).addClass("active-pagination");
}

  // Sum receipt
  function invoice(id) {
    render(data);

    let info = [];
    let listID;
    // let infos;
    let infos = $(":checkbox").change(function() {
      $.get(render(), {id: this.id, checked: this.checked});
      listID = $(":checkbox").attr(":checked", true);
      console.log(data.id);
    });

    let infoss;
    infoss = infos;
    console.log(infoss);

    for(let i = 0; i < infos.length; i++) {
      listID = infos[i].id;
      console.log(listID);
    }

    if($("#checkbox").is(":checked")) {
      info = $("#checkbox").val();
      return info;
    }
    console.log(info);
    
    $.ajax({
      type: "post",
      url: "../API/get-data-offer-sale-admin.php",
      data: {
        token: localStorage.token
      },
      success: function(response) {
        console.log("Success", response);
        let idAdmin = response.Result[5].id;
        info = response.Result;
        console.log(info);

        let infor = [];
        for(let i = 0; i < infos.length; i++) {
          infor = infos[i].id; 
          console.log(infor);
        }
        console.log(infos[1]);
        console.log(infor);
        
        console.log(idAdmin);
        window.location.href = "../src/invoice.html?id=" + infor;
      }, error: function(err) {
        console.log("Error", err);
      }
    });

  }

  // Get data specifically agent only
 function getDataAgent() {
  let infoData;
  $.ajax({
      type: 'get',
      url: '../API/get-data-agent.php',
      success: function(response) {
          console.log("Success", response);

          infoData = response.Result;
          console.log(infoData);

            if(response.RespCode === 200) {
                let html = '';
                for(let i = 0; i < infoData.length; i++) {
                    html += `
                    <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      ${infoData[i].agent_name}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Gender</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      ${infoData[i].gender}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Status</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      ${infoData[i].status}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      ${infoData[i].address}
                    </div>
                  </div>
                  <hr>
                      <div class="row">
                        <div class="col-sm-12">
                          <button type="button" class="btn btn-warning" onclick="open_modal(${i}, ${infoData[i].id})">Edit</button>
                          <button type="button" class="btn btn-danger" onclick="logout()">Logout</button>
                        </div>
                      </div>
                    `;
                }
                $('#profileInfo').html(html);
            }
      },
      error: function(error) {
          console.log("Error", error);
      }
  });
}
getDataAgent();

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
getProfileImage();

  // Add data material
function getDataMaterial() {
  let renderData;

  $.ajax({
    type: "post",
    url: "../API/get-data-material.php",
    data: {},
    success: function(response) {
      console.log("Response", response.result);
      data = response.result;
      for(i = 0; i < data.length; i++) {
        renderData += `
          <tr>
            <td>${data[i].num_mat}</td>
            <td>${data[i].mat_level}</td>
          </tr>
        `;
      }
      $("#materialContent").html(renderData);
    }, error: function(err) {
      console.log("Error", err);
    } 
  });
}
getDataMaterial();

  // UpdateStockMaterial
  let idStock = [];
function getStockMaterial(offerSaleID, dataStockMaterial) {
    let offerSale_ID = offerSaleID;
    let pass = true;
    let id;
    let amountID = [];
    // console.log(agent_id);
    console.log(offerSale_ID);
    $.ajax({
        type: 'get',
        url: '../API/getStockMaterial.php',
        success: function(response) {
            console.log("Success", response);
            let dataStockMaterial;
            let renderStockMaterial = '';
            dataStockMaterial = response.Result;
            // this.dataStockMaterial = dataStockMaterial.ST_MaterialID;
            // let idStock = [];
            console.log(dataStockMaterial);
            if(response.ResponseCode === 200) {
              for(let i = 0; i < dataStockMaterial.length; i++) {
                // if(idStock[i].ST_MaterialID == idStock[i].ST_MaterialID) {
                //   pass = false;
                // }
                idStock.push({
                  id: dataStockMaterial[i].ST_MaterialID,
                  level: dataStockMaterial[i].Level_Material
                  // amountID
                })
                // console.log(id);
                amountID.push({
                  id: dataStockMaterial[i].ST_MaterialID
                });
              }
              localStorage.setItem("amountID", idStock);
              // if(pass) {
              //   idStock.push({
              //     id: idStock.ST_MaterialID
              //   })
              // }
            }  
            console.log(idStock);
            console.log(amountID);
        },
        error: function(err) {
            console.log("Error", err);
        }
    });
}
getStockMaterial();

let listAmount = [];
function getOfferSale() {
    let pass = true;
    let result = [];
    $.ajax({
        type: 'get',
        url: '../API/getDisplayConfirm.php',
        success: function(response) {
            console.log("Success", response);
            let dataResult = response.Result;
            console.log(dataResult);
            let sumA = 0;
            let sumB = 0;
            let sumC = 0;
            let count = 1;
            let sum = 0;
            if(response.ResponseCode === 200) {
                for(let i = 0; i < dataResult.length; i++) {
                    if(dataResult[i].mat_grad.trim() === 'A') {
                        sumA += dataResult[i].amount * count;
                        console.log(sumA);
                    }
                    else if(dataResult[i].mat_grad.trim() === 'B') {
                        sumB += dataResult[i].amount * count;
                        console.log(sumB);
                    }
                    else if(dataResult[i].mat_grad.trim() === 'C') {
                        sumC += dataResult[i].amount * count;
                        console.log(sumC);
                    }
                    // result.push({
                    //   sumA, sumB, sumC
                    // });
                  }
                  result.push({
                    sumA, sumB, sumC
                  });
                //   listAmount.push({
                //     sumResult: sumA, sumB, sumC
                // })
              //   listAmount.push({
              //     gard: result
              // })
            }
            if(pass) {
                listAmount.push([
                    sumA, sumB, sumC
                ])
            }
            console.log(result);
            console.log(listAmount);
            console.log(idStock);
        },
        err: function(err) {
            console.log("Fail", err);
        }
    });
}
getOfferSale();

function sumResult() {
  console.log(listAmount);
  console.log(idStock);
  $.ajax({
    type: 'post',
    url: '../API/updateStockCopy.php',
    data: {
      sumAmount: listAmount,
      id: idStock
    }, success: function(response) {
      console.log("Success", response);
    }, error: function(err) {
      console.log("Fail", err);
    }
  });
}
// sumResult();



