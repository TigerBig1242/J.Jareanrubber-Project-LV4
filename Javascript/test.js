import { name, doSomething, showMessage } from "./plants.js";

$(document).ready(() => {

    
})
// console.log(name);
// console.log(doSomething());
// console.log(showMessage());
// window.showImportedMessage = function showImportedMessage() {
//     showMessage();
// } 

// function display() {
//     let infoData = "";
//     let renderHTML = "";

//     $.ajax({
//         type: "get",
//         url: '../API/get-data-agent.php',
//         success: function(response) {
//             console.log("Success", response);
  
//             infoData = response.Result;
//             console.log(infoData);
  
//               if(response.ResponseCode === 200) {
//                   for(let i = 0; i < infoData.length; i++) {
//                     renderHTML += `
//                     <div class="table-row">		
//                         <div class="table-data">${i+1}</div>
//                         <div class="table-data"><img src="${infoData[i].image}" class="rounded-circle" width="100"></div>
//                         <div class="table-data">${infoData[i].name}</div>
//                         <div class="table-data">${infoData[i].gender}</div>
//                         <div class="table-data">${infoData[i].status}</div>
//                         <div class="table-data">${infoData[i].address}</div>
//                     </div>                                                                                     
//                     `;
//                   }
//                   $("#display").html(renderHTML);
//                 // document.getElementById("detailDataAgent").innerHTML;
//                 // document.write(renderHTML);
//               }
//         },
//         error: function(error) {
//             console.log("Error", error);
//         }
//     });
// }

// display();

const list = document.querySelectorAll(".list");

function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));