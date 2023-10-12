
var data;
var page = 1;
var totalPage = 0;

function render() {
  const nameUser = localStorage.fullname;
  console.log(nameUser);
  let showNameUser = '';
  // showNameUser += `
  //   <p>ชื่อผู้ใช้: ${localStorage.fullname}</p>
  // `;
  // $("#nameUser").html(showNameUser);
    $.ajax({
      type: "post",
      url: "../API/displayConfirm.php",
      data: {
        token: localStorage.token,
        // name:localStorage.fullname
      },
      success: function (response) {
        console.log("Success", response.Result);
        data = response.Result;
        // console.log(data);
  
        if (response.RespCode === 200) {
          let html = "";
          for (let i = (page - 1) * 10; i < page * 10; i++) {
              if( i < data.length) {
            html += `
                      <tr>
                          <td>${[i + 1]}</td>
                          <td>${data[i].date}</td>
                          <td>${new Intl.NumberFormat().format(data[i].amount)} ตัน</td>
                          <td>${data[i].price} บาท</td>
                          <td>${data[i].numDay} วัน</td>
                          <td>เกรด ${data[i].matGrad}</td>
                          <td>${data[i].name}</td>
                          <td>
                            <div class="btn-control">
                                
                            </div>
                          </td>
                      </tr>
                      `;
              }
          }
          $("#tbody").html(html);
  
          totalPage = Math.ceil(data.length / 10);
          let paginationHTML = '';
          paginationHTML += `<button class="btnPrev" onclick = "backPage()"> <img src="../assets/image/arrow.png" alt=""> Prev</button>`;
          for(let i = 1; i<= totalPage; i++) {
            paginationHTML += `<li id = "page${i}" onclick = "currentPage(${i})" class="number-pagination">${i}</li>`;
          }
          paginationHTML += `<button class="btnNext" onclick = "nextPage()">Next <img src="../assets/image/arrow.png" alt=""> </button>`;
          $("#pagination").html(paginationHTML);

          showNameUser += `
          <p>ชื่อผู้ใช้: ${localStorage.fullname}</p>
        `;
          $("#nameUser").html(showNameUser);
  
          // $("#pagination").html(paginationHTML);
          // render();
          // confirmOffer();
        }
        
        // return data;
      },
      error: function (err) {
        console.log("error", err);
      },
    });
   
}
render();

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