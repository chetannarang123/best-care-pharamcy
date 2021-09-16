const product=require("../Models/Product");
const subscribe = require("../Models/Subscribe");
const cart = require("../Models/Cart");
const order = require("../Models/Order");
const Sequelize = require("sequelize"); 
const op = Sequelize.Op;
const fs=require("fs");

//this api will be used to add products in the database
exports.add_products = (req,res,next) => {
    //data coming from front end
    const product_name = req.body.pname;
    const product_description = req.body.pdesc;
    const category = req.body.category;
    const price = req.body.price;

    // we are checking is adding image to product or not if not error will be generated
    if (req.file === undefined) {
        return res.send(`You must select a file.`);
    }

// we are checking here that these feilds should have data other wise error message will be generated
    if(product_name !== "" && product_description !== "" && category !== "" && price!==""){
        // we are checking if product with same name and category exist in databsase
        product.findOne({where:{product_name:product_name,category:category}}).then((user) => {
            if(user){
                console.log("Product Already Found");
                res.status(500).send("<script>alert('Product Already Exists.');window.location.href = '/admin/view';</script>");
            }else{
                //if not product will be added to databse
                product.create({
                    product_name: product_name,
                    product_image:req.file.originalname,
                    product_desc: product_description,
                    category:category,
                    price:price,
                    data: fs.readFileSync(
                __basedir + "/views/uploads/" + req.file.filename
            ),
                }).then((product) => {
// image of medicine will be saved in /views/uploads/ folder
                         fs.writeFileSync(
                    __basedir + "/views/uploads/" + product.name,
                    product.data
                    );

                    res.status(200).send("<script>alert('Inserted successfully.');window.location.href = '/admin/view';</script>");

                  }).catch((err) => {

                        console.log(err)
                        res.status(500).send("<script>alert('Insertion Failed. Try Uploading a valid image format.');window.location.href = '/admin/admin';</script>");

                  })

            }
        });
    }else{
        res.status(500).send("<script>alert('Image Upload Failed. Max Size: 6MB - Max Res: 2900px x 2900px');window.location.href = '/admin/admin';</script>");
    }

};

// in this api we will remove the product from the database admin api
exports.removeproduct = (req, res, next) => {
    const prod_id = req.body.id;

   product.destroy({where: {id: prod_id}}).then(() => {
        res.status(200).send("<script>alert('Product Removed.');window.location.href='/admin/view';</script>");
             }).catch((err) => {
        console.log(err.message);
        res.status(500).send("<script>alert('Product Not Removed.');window.location.href='/admin/view';</script>");
    })
}


//in this api we are addind products intocart
exports.addtocart = (req,res,next) => {
    const product_id = req.body.id;
//checking if the user is alredy logged in if not error will be genereated
    if(req.session.loggedin) {
//here we are checking product id and email from sessions
        if(product_id !== "" && req.session.email !== ""){
            // we are checking if  product is already added in cart
            cart.findOne({where:{productid:product_id,email:req.session.email}}).then((user) => {
                if(user){
                    console.log("Product Already Exists.");
                    res.status(500).json({
                        message: "Product Already Exists.",
                    });
                }else{
                    cart.create({
                        email: req.session.email,
                        productid:product_id
                    }).then(() => {
                        console.log("Product Added to Cart.");
                        res.status(200).json({
                            message: "Product Added to Cart.",
                        });
                    }).catch((err) => {
                        console.log(err.message);
                        res.status(500).json({
                            message: err.message,
                        });
                    })
                }
            })
        }else{
            console.log("Operation failed!");
            res.status(500).json({
                message: "Operation failed!",
            });
        }

    } else {
        console.log("Please Login!");
        res.status(500).json({
                message: "Please Login!",
            });
    }

};


// this api is used to add contact query in the database 
exports.subscribe = (req,res,next) => {
    const subname = req.body.subname;
    const subemail = req.body.subemail;
    const submessage = req.body.submessage;

// if the user has already send the query alert will be generated that user has already send the query 
    if(subname !== "" && subemail !== "" && submessage !== "" ){
        subscribe.findOne({where:{email:subemail}}).then((user) => {
            if(user){
                console.log("Already Subscribed.");
                res.status(500).json({
                    message: "Already Subscribed.",
                });
            }else{
                subscribe.create({
                    name: subname,
                    email:subemail,
                    message: submessage
                }).then(() => {
                    console.log("Subscribed.");
                    res.status(200).json({
                        message: "Subscribed.",
                    });
                }).catch((err) => {
                    console.log(err.message);
                    res.status(500).json({
                        message: err.message,
                    });
                })
            }
        })
    } else{
        console.log("Operation failed!");
        res.status(500).json({
            message: "Operation failed!",
        });
    }

};

//in this api we will findall the products on the homepage
exports.gethomeproducts = (req,res) => {

    product.findAll().then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};


//this api will be used to open page for specific product
pid = '';

exports.openproduct = (req, res) => {

    pid = req.body.id;
    console.log(pid);

}

//this api will send the data of specific seleted product to the frontend
exports.getproduct = (req, res) => {

    product.findOne({where: {id: pid}}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });

}

pname = '';

//this api is used to search products from the db

exports.searchProducts = (req, res) => {

    pname = req.body.name;
    console.log(pname);

}

//this api is used to get result of search data and data will be send to frontend

exports.getsearch = (req, res) => {

    console.log('searched');

    product.findAll({where: {product_name: {
        [op.like]: '%'+pname+'%'
    }}}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });

}

// this api will be user to update the products in the databse
exports.updateproduct = (req, res) => {
// this is the data coming from frontend
    const pname = req.body.pname;

    const pdesc = req.body.pdesc;
    
    const category = req.body.category;
    
    const price = req.body.price;

     console.log(req.file);
// we are checking if admin update the image file if not error will be generated
    if (req.file === undefined) {
        return res.send(`You must select a file.`);
    }

      product.update(
      {
        product_name: pname,
        product_image:req.file.originalname,
        product_desc: pdesc,
        category:category,
        price:price,
        data: fs.readFileSync(
                __basedir + "/views/uploads/" + req.file.filename
            ),
      }, 
      { where: { id: pid } }).then((product) => {

        //new image will be stored in viewa/uploads folder
        fs.writeFileSync(
            __basedir + "/views/uploads/" + product.name,
            product.data
            );

//if every thing goes well
        res.status(200).send("<script>alert('Product Modified.');window.location.href = '/admin/view';</script>");
      }).catch((err) => {

            console.log(err.msg);
            if(err.msg === undefined) {
                res.status(200).send("<script>alert('Product Modified.');window.location.href = '/admin/view';</script>");
            } else {
                res.status(500).send("<script>alert('Product Not Modified. Check your image format !');window.location.href = '/admin/view';</script>");

            }

      });

  
}

// this api is for admin to get the list of the products
exports.getproducts = (req,res) => {
    if(req.session.adminloggedin){
        // we are check if admin is logged in otherwise admin has to login first
        console.log("logged in");
        product.findAll({order: [['id', 'DESC']]}).then(comments => {
            console.log(comments.length);
            // here all the data will be send to frontend
            res.status(200).json({
                message: "retrieved successfully",
                comments: comments
            });
        }).catch((err) => {
            console.log(err.msg)
            //if err errir will be generated
            res.status(500).json({
                message: "retriving failed!!!",
                comments: []
            });
        });
    }
};

//this api is used by admin to get all the contact query
exports.getcontacts = (req,res) => {
    if(req.session.adminloggedin){
        console.log("logged in");
        subscribe.findAll().then(comments => {
            console.log(comments.length);
            //here data will be send to frontend
            res.status(200).json({
                message: "retrieved successfully",
                comments: comments
            });
        }).catch((err) => {
            console.log(err.msg)
            //if error then error messsage will be generated
            res.status(500).json({
                message: "retriving failed!!!",
                comments: []
            });
        });
    }
};

// this api will be used by admin to get all the oders placed by users
exports.getorders = (req,res) => {
    order.findAll().then(comments => {
        console.log(comments.length);
        //here data will be sent to frontend
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        //error message will be generated here
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

//this api will be used by user to get all the order made by users
exports.getorder = (req,res) => {
    order.findAll({where: {userid: req.session.email}}).then(comments => {
        console.log(comments.length);
        //data will be send to frontend
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        //error will be generated
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

//this api will be used by users to get the medicined where category is "medication"
exports.getmedications = (req,res) => {

    product.findAll({where:{category:'Medication'}}).then(comments => {
        console.log(comments.length);
        //all the product with category 'medication' will be sent to front end
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        //error will be generated
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

//this api will be used by users to get the medicined where category is "Allergies"

exports.getallergies = (req,res) => {

    product.findAll({where:{category:"Allergies"}}).then(comments => {
        console.log(comments.length);
        //all the product with category 'Allergies' will be sent to front end
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        //error will be generated
        console.log(err.msg)
        res.status(500).json({ 
            message: "retriving failed!!!",
            comments: []
        });
    });
};

//this api will be used by users to get the medicined where category is "Cosmetics"

exports.getcosmetics = (req,res) => {

    product.findAll({where:{category:"Cosmetics"}}).then(comments => {
        //all the product with category 'Cosmetics' will be sent to front end
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        //error will be generated
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

//this api will help the user the get back his cart items
exports.getcartitems = (req,res) => {
//here we will find the products in the database which the cx had added
    product.findAll({where:{id: [ Sequelize.literal(
                ' SELECT productid FROM carts WHERE email ="'+req.session.email+'"')]
    }}).then(comments => {
        console.log(comments.length);
        //data send successfully to frontend
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        // error will be generated
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

var uid = '';
var quantity = '';
var total = '';

exports.checking = (req, res) => {

    uid = req.body.uids;
    quantity = req.body.quantity;
    total = req.body.total;
    console.log(uid);
    console.log(quantity);
    console.log(total);
}

//this is the payment api we are using stripe as a payment gateway integration it is implemented in test mode so all the payemts done are not real
exports.checkout = (req, res, next) => {
// we are gtting email and full address from user
    const userid = req.session.email;
    const address = req.body.fulladdress;
    console.log(address);
// these are the keys which we can find on stripe dashboard
    const Publishable_Key = 'pk_test_51HVmJKJq1hL4PqA0CVPxUfgiw9bKQDCnB27GnkEOpsuPfgKSzC2F6wQhC21htJtZG25PHg0uigbbhohpVwj9PMGo00U7B2S9Ts';
    const Secret_Key = 'sk_test_51HVmJKJq1hL4PqA0u1CeeYeUE887CytdPomXsq5UFY645dnExIDZ6j5EAMuaRVoMKdat69BUqZOqn0wQXDm8w0KL00Fo85ogRU';
    var status = '';
      
    const stripe = require('stripe')(Secret_Key);
                  // we are creating a customer in stripe
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Pharmacy',
    })
    .then((customer) => {
  //this is used to deduct payments
        return stripe.charges.create({
            amount: total * 100,
            currency: 'CAD',
            customer: customer.id
        });
        
    })
    .then((charge) => {
        status = "Success";
        console.log(charge)  // If no error occurs
    })
    .catch((err) => {
        status = "failed";  
        console.log(err)     // If some error occurs
    });
    
    if(status !== "failed") {
// if evrything goes well the order details will be saved to the database
    if(userid !== "" && address !== ""){

        order.create({
            userid: userid,
            product_ids: uid,
            product_quantities: quantity,
            total: total,
            fulladdress: address,
            status: status
        }).then(() => {
            // if successfull the card will be destroyed and cart will be empty
            cart.destroy({where: {email: req.session.email}}).then(() => {
                    res.status(200).send("<script>alert('Order Successful');window.location.href='/success';</script>");      }).catch((err) => {
            console.log(err.message);
            res.status(500).send("<script>alert('Order Failed!');window.location.href='/failed';</script>");
        })
            
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send("<script>alert('Order Failed!');window.location.href='/failed';</script>");
        })
    }else{
        res.status(500).send("<script>alert('Address Empty.');window.location.href='/cart';</script>");
    }
} else {
    res.status(500).send("<script>alert('Payment Failed !');window.location.href='/paymentfailed';</script>");
}

}

//this api is used to remove the product from cart
exports.removefromcart = (req, res, next) => {
    const id = req.body.id;
// here we are getting the id of the product to be removed
    cart.destroy({where: {email: req.session.email, productid: id}}).then(() => {
        res.status(200).send("<script>alert('Product Removed from Cart.');window.location.href='/cart';</script>");
             }).catch((err) => {
        console.log(err.message);
        res.status(500).send("<script>alert('Product Not Removed from Cart.');window.location.href='/cart';</script>");

    });
}

// this api will be used to cancel the order
exports.cancelorder = (req, res, next) => {
    const id = req.body.id;
// here the order will be deleted from the database
    order.destroy({where: {userid: req.session.email, id: id}}).then(() => {
        res.status(200).send("<script>alert('Order Cancelled.');window.location.href='/orders';</script>");
             }).catch((err) => {
        console.log(err.message);
        res.status(500).send("<script>alert('Order Not Cancelled.');window.location.href='/orders';</script>");
    })
}