var data;
var page = 1;
var totalPage = 0;

function renderReportBySellOnCrash() {
    let dataReportBySellOnCash;
    let renderReportBySellOnCash = '';
    // let total = 0;
    $.ajax({
        type: "get",
        url: "../API/getOrderSellOnPromise.php",
        success: function(response) {
            console.log("Success >>> ", response);
            dataReportBySellOnCash = response.Result;
            data = response.Result;
            console.log(dataReportBySellOnCash);
            if(response.ResponseCode === 200) {
                let total = 0;
                for(let i = (page - 1) * 10; i < page * 10; i++) {
                    total += data[i].amount_product * data[i].count;
                    if(i < data.length) {
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
                    }
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
        },
        error: function(err) {
                console.log("Fail >>> ", err);
        }
    });
    console.log('Hello');
}
renderReportBySellOnCrash();

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

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  }