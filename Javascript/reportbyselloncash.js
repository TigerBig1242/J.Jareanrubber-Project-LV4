var data;
var page = 1;
var totalPage = 0;

function renderReportBySellOnCash() {
    let dataReportBySellOnCash;
    let renderReportBySellOnCash = '';
    // let total = 0;
    $.ajax({
        type: "get",
        url: "../API/getOrderSellOnCash.php",
        success: function(response) {
            console.log("Success >>> ", response);
            dataReportBySellOnCash = response.Result;
            data = response.Result;
            console.log(dataReportBySellOnCash);
            if(response.ResponseCode === 200) {
                let total = 0;
                for(let i = 0; i < data.length; i++) {
                    total += data[i].amount_product * data[i].count;
                    // if(i < data.length) {
                        renderReportBySellOnCash += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${data[i].no_order}</td>
                                <td>${data[i].id_product}</td>
                                <td>${numberWithCommas(data[i].amount_product)}</td>
                                <td>${data[i].level_product}</td>
                                <td>${data[i].type_sale}</td>
                                <td>${data[i].shippingtime}</td>
                                <td>${dayjs(data[i].date).format('DD/MM/YYYY')}</td>
                            </tr> 
                        `;
                    // }
                }
                        renderReportBySellOnCash += `
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
            $("#report").html(renderReportBySellOnCash);

            // totalPage = Math.ceil(data.length / 10);
            // let paginationHTML = '';
            // paginationHTML += `<button class="btnPrev" onclick = "backPage()"> <img src="../assets/image/arrow.png" alt=""> Prev</button>`;
            // for(let i = 1; i<= totalPage; i++) {
            //   paginationHTML += `<li id = "page${i}" onclick = "currentPage(${i})" class="number-pagination">${i}</li>`;
            // }
            // paginationHTML += `<button class="btnNext" onclick = "nextPage()">Next <img src="../assets/image/arrow.png" alt=""> </button>`;
            // $("#pagination").html(paginationHTML);
        },
        error: function(err) {
                console.log("Fail >>> ", err);
        }
    });
    console.log('Hello');
}
renderReportBySellOnCash();

// Create function NextPage with arrow function below
let nextPage = () => {
    if(page != totalPage) {
        $(".number-pagination").removeClass("active-pagination");
        $("#page" + page).on("click");
        page++;
        renderReportBySellOnCash();
        $("#page" + page).addClass("active-pagination");
    }
}
  
    // Create function backPage with arrow function below
  let backPage = () => {
    if(page != 1) {
        $(".number-pagination").removeClass("active-pagination");
        page--;
        renderReportBySellOnCash();
        $("#page" + page).addClass("active-pagination");                                                
    }
}
  
    // Create function Current with arrow function below
  let currentPage = (current_Page) => {
      $(".number-pagination").removeClass("active-pagination");
      // $("#page" + page).on("click");
      page = current_Page;
      renderReportBySellOnCash();
      $("#page" + page).addClass("active-pagination");
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  }