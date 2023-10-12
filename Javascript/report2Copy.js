$(document).ready(function(){
  // require('dayjs/locale/th');
  dateStart();
  // getDataOrder();
  // selectTypeSale();
  render();
})

function dateStart() {
  
  // Select begin date
  $('#dateStart').datepicker({
    format: 'yyyy/mm/dd',
    language: 'th',
    todayHighlight: true
  })

  // Select end date
  $('#dateEnd').datepicker({
    format: 'yyyy/mm/dd',
    language: 'th',
    todayHighlight: true
  })
}

function render() {
  let showNameUser = '';
  showNameUser += `
  <p>ชื่อผู้ใช้: ${localStorage.fullname}</p>
  `;
  $("#nameUser").html(showNameUser);
}
// render();

let data = [];

function getDataOrder() {
  // let showNameUser = '';
  // selectTypeSale();
  let beginDate = document.getElementById("dateStart").value; 
  let endDate = document.getElementById("dateEnd").value;
  // let beginDate = $("#dateStart").val();
  // let endDate = $("#dateEnd").val();
  console.log(beginDate, endDate);
  $.ajax({
    type: "post",
    url: "../API/getDataOrder.php",
    data: {
            beginDate: beginDate,
            endDate: endDate
    },
    success: function(response) {
      console.log("Success :", response);
      data = response.Result;
      console.log(data);
      // let dateINT = parseInt(data.date);
      // console.log(dateINT);
      if(response.ResponseCode === 200) {
        let renderOrder = '';
        let renderOrders = '';
        let total = 0;
        let count = 1;
        for(let i = 0 ; i < data.length; i++) {
              total += data[i].amountProduct * count;
              renderDataOrder += `
              <tr onclick="selectTypeSaleDisplay(${data[i].id_orderProduct}, '${data[i].levelProduct}')">
                  <td>${[i + 1]}</td>
                  <td>${data[i].no_orderProduct}</td>
                  <td>${numberWithCommas(data[i].amountProduct)}</td>
                  <td>${numberWithCommas(data[i].price)}</td>
                  <td>${data[i].levelProduct}</td>
                  <td>${data[i].typeSale}</td>
                  <td>${data[i].shippingTime}</td>
                  <td>${dayjs(data[i].date).format('DD/MM/YYYY')}</td>
              </tr>
              `;

            //   renderOrders += `
            //   <option value="${data[i].type_sale}">${data[i].type_sale}</option>
            // `;

            }
            renderDataOrder += `
                <tr class="table-total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>รวม</td>
                  <td>${numberWithCommas(total)}</td>
                  <td>กิโลกรัม</td>
                </tr>
            `;
        console.log(total);

        // for(let k = 0; k < data.length; k++) {
        //   renderOrders += `
        //     <option value="${data[k].type_sale}">${data[k].type_sale}</option>
        //   `;
        // }
        // $("#selectType").html(renderOrders);

      }
      $("#report").html(renderDataOrder);   
      // showNameUser += `
      //       <p>ชื่อผู้ใช้: ${localStorage.fullname}</p>
      //       `;
      //       $("#nameUser").html(showNameUser);
            
    },
    error: function(err) {
      console.log("Fail :", err);
    }
  });

  // $.ajax({
  //   type: "get",
  //   url: "../API/getTypeSale.php",
  //   success: function(response) {
  //     console.log("Success", response);
  //     dataOrders = response.Result;
  //     console.log(dataOrders);

  //     if(response.ResponseCode === 200) {
       
  //       // for(let k = 0; k < data.length; k++) {
  //       //   renderOrders += `
  //       //     <option value="${data[k].typeSaleName}">${data[k].typeSaleName}</option>
  //       //   `;
  //       // }
  //       // $("#selectType").html(renderOrders);

  //       $("#selectType").on('change', function() {
  //         if($(this).val() === 'สัญญาซื้อขายล่วงหน้า') {
  //           $(productID).val();
  //           $(productTypeSale).val();
  //         }
  //         else if($(this).val() === 'ขายสด') {
  //           $(productID).val();
  //           $(productTypeSale).val();
  //         }
  //       });
  //     }

  //   },
  //   err: function(err) {
  //     console.log("Fail", err);
  //   }
  // });
}
// getDataOrder();

function renderDataOrder() {

}

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}

function clearList() {
  list = [];
}

// Create function NextPage with arrow function below
let nextPage = () => {
  if(page != totalPage) {
      $(".number-pagination").removeClass("active-pagination");
      $("#page" + page).on("click");
      page++;
      getDataOrder()
      $("#page" + page).addClass("active-pagination");
  }
}

  // Create function backPage with arrow function below
let backPage = () => {
  if(page != 1) {
      $(".number-pagination").removeClass("active-pagination");
      page--;
      getDataOrder()
      $("#page" + page).addClass("active-pagination");                                                
  }
}

  // Create function Current with arrow function below
let currentPage = (current_Page) => {
    $(".number-pagination").removeClass("active-pagination");
    // $("#page" + page).on("click");
    page = current_Page;
    getDataOrder()
    $("#page" + page).addClass("active-pagination");
}

let reportList = [];
function selectTypeSale(productID, productTypeSale) {
  console.log(productID, productTypeSale);
    let renderOrders = '';
    let dataOrders;
    let selectElement = document.querySelector("#selectType");
    let output;
    console.log(selectElement);
    // output = selectElement.value;
    // document.querySelector('.report').textContent = output

    $.ajax({
      type: "get",
      url: "../API/getTypeSale.php",
      success: function(response) {
        console.log("Success", response);
        dataOrders = response.Result;
        console.log(dataOrders);

        if(response.ResponseCode === 200) {
          for(let i = 0; i < dataOrders.length; i++) {
            renderOrders += `
              <option value="${dataOrders[i].typeSaleName}"  onclick="selectTypeSaleDisplay(${dataOrders[i].typesale_id}, '${dataOrders[i].typeSaleName}')">${dataOrders[i].typeSaleName}</option>
          `;
          // if(dataOrders[i].typeSaleName === output.toString()) {
          //   console.log('ขายสด OK');
          // }
          // else if(dataOrders[i].typeSaleName === output.toString()) {
          //   console.log('สัญญาซื้อขายล่วงหน้า OK');
          // }
          }
          $("#selectType").html(renderOrders);

          for(let k = 0; k < dataOrders.length; k++) {
            renderOrders += `
              <option value="${dataOrders[k].typeSaleName}">${dataOrders[k].typeSaleName}</option>
            `;
          }
          // $("#selectType").html(renderOrders);
        }

      },
      err: function(err) {
        console.log("Fail", err);
      }
    });

    // $.ajax({
    //   type: "get",
    //   url: "../API/getAllDataOrders.php",
    //   success: function(response) {
    //     console.log("Success", response);
    //     let type = response.Result;
    //     console.log(type);
    //     console.log(dataOrders);
    //     if(response.ResponseCode === 200) {
    //       for(let i = 0; i < type.length; i++) {
    //         renderOrders += `
    //           <option value="${type[i].type_sale}">${type[i].type_sale}</option>
    //         `;
    //       }
    //     }
    //   },
    //   err: function(err) {
    //     console.log("Fail", err);
    //   }
    // });
}
selectTypeSale();

function selectTypeSaleDisplay(productID, productTypeSale) {
  console.log(productID, productTypeSale);
  // $("#selectType").on('change', function() {
  //   if($(this).val() === 'สัญญาซื้อขายล่วงหน้า') {
  //     $(productID).val();
  //     $(productTypeSale).val();
  //   }
  //   else if($(this).val() === 'ขายสด') {
  //     $(productID).val();
  //     $(productTypeSale).val();
  //   }
  // })
}

function selectMonthTH() {
  let months_th = [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ];
  let months_th_mini = [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ];
  console.log(months_th);
  console.log(months_th_mini);
}
selectMonthTH();

