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

                if(data.comments.length > 0) {

                for(let mm=0;mm<data.comments.length;mm++) {

                    //alert(data.comments[mm].product_desc);
                        var newRow = ("<tr>");


                        cols += '<th scope="row">'+(mm+1)+'</th>';

                        cols += '<td style="width: 350px"><img class="img-fluid border rounded-3" src="../uploads/'+data.comments[mm].product_image+'" alt="med-1" style="height: 200px; width: 200px"/></td>';

                        cols += '<td style="width: 10px">'+data.comments[mm].product_name+'</td>';

                        cols += '<td style="width: 500px; text-align: justify">'+data.comments[mm].product_desc+'</td>';

                        cols += '<td style="width: 500px; text-align: justify">'+data.comments[mm].category+'</td>';

                        cols += '<td>$ '+data.comments[mm].price+'</td>';

                        cols += '<td style="width: 200px"><button style="height:100px;width:100%;" id="edit" class="btn btn-primary btn-sm" onclick="startedit(' + data.comments[mm].id + ')">Edit</button>';

                        cols += '<form method="POST" action="/removeproduct" ><button style="height:100px;width:100%;" type="submit" name="id" value="' + data.comments[mm].id + '" class="btn btn-danger btn-sm">Delete</button></form>    </td></tr>';


                }
            } else {

                cols += '<tr align="center"><h2 >No Products.</h2></tr>';
            }


                place_images_container.innerHTML =cols;

            } 
        });
    }

}

const aa=new X();
aa.getImages();


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