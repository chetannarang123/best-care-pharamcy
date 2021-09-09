

    
const obtain = fetch(`http://localhost:3000/getproduct`).then(res => {
        if(res.status === 200){
            return res.json();
        }
    }).then((data)=>{
        if(data){

            document.getElementById("pname").value = data.comments.product_name;

            document.getElementById("pimage").value = data.comments.product_image;

            document.getElementById("pdesc").value = data.comments.product_desc;
            
            document.getElementById("category").value = data.comments.category;
            
            document.getElementById("price").value = data.comments.price;


        }  
    });
