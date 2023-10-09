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
            <td>${data[i].num_mat} วัน</td>
            <td>เกรด ${data[i].mat_level}</td>
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

// Open modal
function openModal() {
  let modalOpen = $("#modal");

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

// Create function validate_offersale to protect blank value
function validate_offerSale() {

  let numberDay = document.getElementById("#inputNumDayMat");
  let matGrad = document.getElementById("#inputGradMat");

  let statusAlert = true;

  if(numberDay.val().length <= 0) {
      Swal.fire({
          icon: "error",
          title: "ขอมูลไม่ครบ",
          text: "โปรดระบุจำนวน"
      })
      numberDay.css("border", "1px solid red");
      statusAlert = false;
  } else {
      numberDay.css("border", "unset");
      statusAlert = true;
  }

  if(matGrad.val().length <= 0) {
      Swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบ",
          text: "โปรดระบุราคา"
      })
      matGrad.css("border", "1px solid red");
      statusAlert = false;
  } else {
      matGrad.css("border", "unset");
      statusAlert = true;
  }

  return statusAlert;
}

  // addDataMaterial
function addDataMaterial() {
  let numDayMat = document.getElementById("#inputNumDayMat");
  let gradMat = document.getElementById("#inputGradMat");

  $.ajax({
    type: "post",
    url: "../API/add-data-material.php",
    data: {
      numDayMat: $("#inputNumDayMat").val(),
      gradMat: $("#inputGradMat").val()
    }, success: function(response) {
      console.log("Success", response);

      if(response.ResponseCode === 200) {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "เพิ่มข้อมูลเรียบร้อย"
        }).then(() => {
          window.location.href = "../src/get-data-material.html";
        })
      }
      else {
        Swal.fire({
          icon: "error",
          title: "ผิดพลาด",
          text: "เพิ่มข้อมูลไม่สำเร็จ"
        })
      }
    }, error: function(err) {
      console.log("Error", err);
    }
  });
}

// clear border form in html
function clearBorder(id) {
  document.querySelector(`#${id.id}`).style.border = "none";
}