//  import { receipt, customer } from "./employee-confirm.js";
$(document).ready(() => {

    // render();
    // receipts();
    // const users = offerSaleId;
})
    

var data;
// Create function render when into offer sale page
var html = "";
function render(receipts, toThaiDateString) {
    let DisPlay = "";
    let random_number = Math.floor(Math.random() * 101) + 1000;
    // let nowDay = new Date();
    let date = new Date();
    // let nowDay = new dayjs('2023-03-14').format('DD/MM/YYYY/HH:mm:ss');
    let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  $.ajax({
    type: "post",
    url: "../API/get-data-offer-sale-admin.php",
    // url: "../API/receipt2.php",
    data: {
      token: localStorage.token,
      // name:localStorage.fullname
    },
    success: function (response) {
      console.log("success", response.Result);
      data = response.Result;
      if (response.RespCode === 200) {
        // nowDay = new Date();
        for (let j = 0; j < data.length; j++) {
          DisPlay += `
          <tbody>
            <tr>
                <td>
                  ${data[j].name}
                  <br>Invoice ${random_number}
                  <br>${date.toLocaleString("th-TH")}
                </td>
            </tr>
            <tr>
                <td>
                  <table class="invoice-items" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td> จำนวนยางก้อน ${data[j].amount} กิโลกรัม</td>
                        <td class="alignright">${data[j].price} บาท</td>
                      </tr>
                      <tr>
                        <td> จำนวนวันกรีดยาง ${data[j].numDay} </td>
                        <td class="alignright"> วัน</td>
                      </tr>
                      <tr class="total">
                        <td class="alignright" width="80%">รวม</td>
                        <td class="alignright">${data[j].total} บาท</td>
                      </tr>
                      </tbody>
                  </table>
                  <div onclick="receipts(${data[j].id})" class="btn-print">พิมพ์ใบเสร็จ</div>
                </td>
            </tr>
          </tbody>
          `;
            // data = response.Result
            // console.log(data[j].id);
        }
        $("#receipt").html(DisPlay);
        // window.print();
      }

    },
    error: function (err) {
      console.log("error", err);
    },
  });
}

    // Report receipt
var offerSaleId;
receipts();
function receipts(data) {
  let date = new Date();
  let random_number = Math.floor(Math.random() * 100) + 1000;
  let user = new URLSearchParams(document.location.search); //Get parameter with url
  let product = user.get('id');
    // console.log(product); 

  console.log(product);
  let disPlay = "";
  // let offerSaleId = data.toString();
  let offerSaleId = product;
  console.log(offerSaleId);
  $.ajax({
    type: "post",
    url: "../API/receipt2.php",
    data: {
      id: offerSaleId,
      // id_emp: localStorage.ID
    },
    success: (response) => {
      console.log("Success", response.Result);

      if (response.RespCode === 200) {
        for (let i = 0; i < response.Result.length; i++) {
          let prices = response.Result[i].price;
          let amounts = response.Result[i].amount
          let results = prices * amounts;
          console.log(results);
          disPlay += `
          <tbody>
          <tr>
              <td>
                <span>ชื่อพนักงาน: ${localStorage.fullname}</span><br>
                <span>ชื่อตัวแทน: ${response.Result[i].name}</span>
                <br>เอกสารเลขที่: ${random_number}
                <br>${date.toLocaleString("th-TH")}
              </td>
          </tr>
          <tr>
              <td>
                <table class="invoice-items" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td class="alignleft"> จำนวนยางก้อน: </td>
                      <td class="alignright">${new Intl.NumberFormat().format(response.Result[i].amount)} ตัน</td>
                      
                    </tr>
                    <tr>
                      <td class="alignleft"> ราคา: </td>
                      <td class="alignright">${response.Result[i].price} บาท</td>
                    </tr>
                    <tr>
                      <td class="alignleft"> จำนวนวันกรีดยาง: </td>
                      <td class="alignright">${response.Result[i].numDay} วัน</td>
                    </tr>
                    <tr>
                      <td class="alignleft"> เกรดยางก้อน: </td>
                      <td class="alignright">เกรด ${response.Result[i].matGrad} </td>
                    </tr>
                    <tr class="total">
                      <td class="" >รวม</td>
                      <td class="alignright">${new Intl.NumberFormat().format(results.toFixed(2))} บาท</td>
                    </tr>
                    </tbody>
                </table>             
              </td>
          </tr>
          <div>
            <button>พิมพ์ใบเสร็จ</button>
          </div>
        </tbody>
          `;
        }
        $("#receipt").html(disPlay);
        window.print();
      } 
      // window.print();
    },
    error: (err) => {
      console.log("error", err);
    },
  });
}

// Format datetime thai
function toThaiDateString(date) {
  let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let second = date.getSeconds().toString().padStart(2, "0");

  return `${numOfDay} ${month} ${year} ` +
      `${hour}:${minutes}:${second} น.`;
}
let date1 = new Date();
let date2 = new Date("September 30, 2023 11:28:00");
let date3 = new Date("March 12, 2023 00:00:00");

console.log(toThaiDateString(date1));
console.log(toThaiDateString(date2));
console.log(toThaiDateString(date3));

  // Sum receipt
// function invoice() {
//   ajax({
//     type: "post",
//     url: "../API/invoice.php",
//     data: {
//       id: localStorage.ID
//     },
//     success: function(response) {
//       console.log("Success", response);
//     }, error: function(err) {
//       console.log("Error", err);
//     }
//   });
// }

  // Paymented swith status
function paymented(id) {
  let user = new URLSearchParams(document.location.search); //Get parameter with url
  let idProduct = user.get("id");
  console.log(idProduct);
  $.ajax({
    type: "post",
    url: "../API/payment.php",
    data: {
      idProduct: idProduct
    }, success: function(response) {
      console.log("Success", response);

      // if(response.ResponseCode === 200) {
      //   Swal.fire({
      //     icon: 'success',
      //   });
      // }

    }, error: function(err) {
      console.log("Error", err);
    }

  });
}
paymented();