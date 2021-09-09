class X {

    getImages(){

        fetch(`http://localhost:3000/getproducts`).then(res => {
            if(res.status === 200){
                return res.json();
            }
        }).then((data)=>{
            if(data){
                const i=0;
                const place_images_container = document.getElementById("tbody");
                var cols = "";

                for(let mm=0;mm<data.comments.length;mm++) {

                    //alert(data.comments[mm].product_desc);
                        var newRow = ("<tr>");

                    cols += '<tr><td colspan="1"><img height="50px" width="50px"src=".' + data.comments[mm].product_image + '" alt="' + data.comments[mm].product_name + '"></td>';

                    cols += '<td>' + data.comments[mm].product_name + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].product_desc + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].category + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].price + '</td>';
                    cols += '<td colspan="1" class="text-center"><button style="color:skyblue;background-color:transparent;border:none" onclick="startedit(' + data.comments[mm].id + ')" class="fas fa-edit"></button><button style="color:red;background-color:transparent;border:none" onclick="deleteProduct(' + data.comments[mm].id + ')">&#x2716;</button></td></tr>';

                }

                place_images_container.innerHTML =cols;

            } 
        });
    }

}

const aa=new X();
aa.getImages();


function deleteProduct(pid) {
    
    const deleting = fetch(`http://localhost:3000/removeproduct`, 
    {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({id: pid})

    }).then(res => {
            if(res.status === 200){
                alert("Product Removed.");
            } else {
                alert("Product Not Removed.");
            }
        });

    window.location = "/admin/view";

}


function startedit(pid) {
    
    const deleting = fetch(`http://localhost:3000/openproduct`, 
    {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({id: pid})

    });

    window.location = "/admin/edit";

}