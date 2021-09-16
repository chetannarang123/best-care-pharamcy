class X {

    getImages(){

        fetch(`http://localhost:3000/getorders`).then(res => {
            if(res.status === 200){
                return res.json();
            }
        }).then((data)=>{
            if(data){
                const place_images_container = document.getElementById("tbody");
                var cols = "";
                //alert(data.comments.length);

                for(let mm=0;mm<data.comments.length;mm++) {

                    
                        var newRow = ("<tr>");


                    // cols += '<tr><th scope="row">'+data.comments[mm].id+'</th>';

                    cols += '<th scope="row">'+data.comments[mm].id+'</th>';

                    cols += '<td>'+data.comments[mm].userid+'</td>';

                    cols += '<td>';

                    const ids = data.comments[mm].product_ids.split('#');
                    for (var i = 0; i < ids.length; i++) {
                        cols += ids[i] + '<br/>';
                    }

                    cols +='</td>';


                    cols += '<td>';

                    const qty = data.comments[mm].product_quantities.split('#');
                    for (var i = 0; i < qty.length; i++) {
                        cols += qty[i] + '<br/>';
                    }

                    cols += '</td>';

                    cols += '<td style="width: 200px">'+data.comments[mm].total+'</td>';

                    cols += '<td style="width: 200px">'+data.comments[mm].fulladdress+'</td>';

                    cols += '<td>'+data.comments[mm].updatedAt+'</td></tr>';


                }

                place_images_container.innerHTML =cols;

            }
        });
    }

}

const aa=new X();
aa.getImages();