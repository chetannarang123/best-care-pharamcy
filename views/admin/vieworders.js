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

                    cols += '<tr class="text-center"><td  colspan="1">' + data.comments[mm].id + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].userid + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].fulladdress + '</td>';
                    cols += '<td colspan="2" class="text-center">';

                    const ids = data.comments[mm].product_ids.split('#');
                    for (var i = 0; i < ids.length; i++) {
                        cols += ids[i] + '<br/>';
                    }

                    cols += '</td>';

                    cols += '<td colspan="2" class="text-center">';

                    const qty = data.comments[mm].product_quantities.split('#');
                    for (var i = 0; i < qty.length; i++) {
                        cols += qty[i] + '<br/>';
                    }

                    cols += '</td>';

                    cols += '<td colspan="2">' + data.comments[mm].total + '</td></tr>';
                    //alert(cols);

                }

                place_images_container.innerHTML =cols;

            }
        });
    }

}

const aa=new X();
aa.getImages();