 // Get data specifically agent only
 function getDataAgent() {
    $.ajax({
        type: 'get',
        url: '../API/get-data-agent.php',
        success: function(response) {
            console.log("Success", response);
        },
        error: function(error) {
            console.log("Error", error);
        }
    });
}

// Get profile image agent
// function getProfileImage() {
//     let getImage;
//     $.ajax({
//         method: 'get',
//         url: '../API/get-data-agent-copy.php',
//         data: {
//             token: localStorage.token,
//         },
//                 success: (response) => {
//             console.log('success', response);

//             getImage = response.Result;
//             console.log(getImage);
//             if(response.RespCode === 200) {
//                 var html = '';
//                 for(var i = 0; i < getImage.length; i++) {
//                     html += `                    
//                     <div class="card-body" >
//                     <div class="d-flex flex-column align-items-center text-center">     
//                             <img src="${getImage[i].image}" class="rounded-circle" width="200">
//                             <div class="mt-3">
//                                 <h4 id="welcome" onclick="checkToken(${i})">${getImage[i].agent_name}</h4>       
//                             </div> 
//                     </div>
//                     </div>  
//                     `;
//                 }
//                 $("#imageInfo").html(html);
//             }
//         }, error: (err) => {
//             console.log('error', err);
//         }
//     })
// }
// getProfileImage();

let infoData;
// Get data specifically agent only
function getDataAgent() {
    // let infoData = "";
    let renderHTML = "";
    $.ajax({
        type: 'post',
        url: '../API/get-data-agent-copy.php',
        data: {},
        success: function(response) {
            console.log("Success", response);
  
            infoData = response.Result;
            console.log(infoData);
  
              if(response.ResponseCode === 200) {
                  for(let i = 0; i < infoData.length; i++) {
                    renderHTML += `
                        <span>${i+1}</span>
                        <span>${infoData[i].id}</span>
                        <span>${infoData[i].image}</span>
                        <span>${infoData[i].name}</span>
                        <span>${infoData[i].gender}</span>
                        <span>${infoData[i].status}</span>
                        <span>${infoData[i].address}</span>                                                    
                      `;
                  }
                  $("#detailDataAgent").html(renderHTML);
                // document.getElementById("detailDataAgent").innerHTML;
                // document.write(renderHTML);
              }
        },
        error: function(error) {
            console.log("Error", error);
        }
    });
  }
  getDataAgent();