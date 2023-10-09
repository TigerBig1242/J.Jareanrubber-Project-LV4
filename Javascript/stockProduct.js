$(document).ready(function() {
    getStockMaterial();
})

function getStockMaterial() {
    $.ajax({
        type: 'get',
        url: '../API/getStockProduct.php',
        success: function(response) {
            console.log("Success", response);
            let dataStockMaterial;
            let renderStockMaterial = '';
            dataStockMaterial = response.Result;
            console.log(dataStockMaterial);
            if(response.ResponseCode === 200) {
                // let renderStockMaterial = "";
                for(let i = 0; i < dataStockMaterial.length; i++) {
                    renderStockMaterial += `
                        <tr>
                            <td>${[i + 1]}</td>
                            <td>เกรด ${dataStockMaterial[i].LevelProduct}</td>
                            <td>${new Intl.NumberFormat().format(dataStockMaterial[i].AmountProduct)} ตัน</td>
                        </tr>
                    `;
                }
                $("#tbody").html(renderStockMaterial);
            }
        },
        error: function(err) {
            console.log("Error", err);
        }
    });
}