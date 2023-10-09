$(document).ready(function(){
  // require('dayjs/locale/th');
  dateStart();
  // getDataOrder();
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

let data = [];

function getDataOrder() {
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
        let total = 0;
        for(let i = 0 ; i < data.length; i++) {
              total += data[i].amount_product * data[i].count
              renderDataOrder += `
              <tr>
                  <td>${[i + 1]}</td>
                  <td>${data[i].no_order}</td>
                  <td>${data[i].id_product}</td>
                  <td>${numberWithCommas(data[i].amount_product)}</td>
                  <td>${data[i].level_product}</td>
                  <td>${data[i].type_sale}</td>
                  <td>${data[i].shippingtime}</td>
                  <td>${dayjs(data[i]).date.format('DD/MM/YYYY')}</td>
              </tr>
              `;
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
      }
      $("#report").html(renderDataOrder);                                     
    },
    error: function(err) {
      console.log("Fail :", err);
    }
  });
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

