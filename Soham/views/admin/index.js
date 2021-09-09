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

                    cols += '<tr><td>' + data.comments[mm].product_name + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].product_desc + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].category + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].price + '</td></tr>';
                    //alert(cols);

                }

                place_images_container.innerHTML =cols;

            } 
        });
    }

}

const aa=new X();
aa.getImages();