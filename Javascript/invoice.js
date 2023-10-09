
let num = 1;

function invoiced() {
    const getInvoice = new URLSearchParams(document.location.search);
    const idInvoice = getInvoice.get("id");
    console.log(idInvoice);
    let date = new Date();
    console.log(date.toLocaleString("th-TH"));
    let random_number = Math.floor(Math.random() * 100) + 1000;
    console.log(random_number);
    let renderHTML = "";
    let data = "";

    $.ajax({
        type: "post",
        url: "../API/get-data-offer-sale-admin.php",
        data: {
            token: localStorage.token
        },
        success: function(response) {
            console.log("Success", response.Result);
            data = response.Result;

            if(response.RespCode === 200) {
                for(let i = (num - 1) * 1; i < num * 1; i++) {
                    if(i < data.length) {
                        renderHTML += `
                        <span>ชื่อพนักงาน: ${localStorage.fullname}</span>
                        <span>ชื่อตัวแทนกลุ่ม: ${data[i].name}</span>
                        <span>เอกสารเลขที่: ${random_number}</span>
                        <span>วันที่: ${date.toLocaleString("th-TH")}</span> 
                    `;
                    }
                }
                $("#detail").html(renderHTML);

                let invoice = "";
                for(let j = 0; j < data.length; j++) {
                   invoice += `
                   <tr>
                        <td></td>
                    </tr>
                   `;
                }
                $("#invoice").html(invoice);
            }

            else {

            }
        },
        error: function(error) {
            console.log("Error", error);
        }
    });
}
invoiced();

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