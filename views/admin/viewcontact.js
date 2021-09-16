class X {

    getImages(){

        fetch(`http://localhost:3000/getcontacts`).then(res => {
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


                    cols += '<tr><th scope="row">'+(mm+1)+'</th>';


                    cols += '<td>'+data.comments[mm].name+'</td>';

                    cols += '<td>'+data.comments[mm].email+'</td>';

                    cols += '<td>'+data.comments[mm].message+'</td>';

                    cols += '<td>'+data.comments[mm].updatedAt+'</td></tr>';


                }

                place_images_container.innerHTML =cols;

            }
        });
    }

}

const aa=new X();
aa.getImages();