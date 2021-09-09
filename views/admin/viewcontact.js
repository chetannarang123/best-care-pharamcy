class X {

    getImages(){

        fetch(`http://localhost:3000/getcontacts`).then(res => {
            if(res.status === 200){
                return res.json();
            }
        }).then((data)=>{
            if(data){
                const i=0;
                const place_images_container = document.getElementById("tbody");
                var cols = "";
                //alert(data.comments.length);

                for(let mm=0;mm<data.comments.length;mm++) {

                    
                        var newRow = ("<tr>");

                    cols += '<tr><td  colspan="1">' + (mm+1).toString() + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].name + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].email + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].message + '</td></tr>';
                    //alert(cols);

                }

                place_images_container.innerHTML =cols;

            }
        });
    }

}

const aa=new X();
aa.getImages();