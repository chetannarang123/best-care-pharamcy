const product=require("../Models/Product");
const user = require("../Models/Users");
const subscribe = require("../Models/Subscribe");
const cart = require("../Models/Cart");
const order = require("../Models/Order");
const flash=require("connect-flash");
const Sequelize = require("sequelize");


exports.add_products = (req,res,next) => {
    const product_name = req.body.pname;
    const product_image = req.body.pimage;
    const product_description = req.body.pdesc;
    const category = req.body.category;
    const price = req.body.price;
    if(product_name !== "" && product_description !== "" && category !== "" && price!==""){
        product.findOne({where:{product_name:product_name,product_image:product_description,category:category}}).then((user) => {
            if(user){
                console.log("Product Already Found");
                res.status(500).send("<script>alert('Product Already Exists.');window.location.href = '/admin/admin';</script>");
            }else{
                product.create({
                    product_name: product_name,
                    product_image:product_image,
                    product_desc: product_description,
                    category:category,
                    price:price
                }).then(comments => {

                    res.status(200).send("<script>alert('Inserted successfully.');window.location.href = '/admin/view';</script>");

                  }).catch((err) => {

                        console.log(err.msg)
                        res.status(500).send("<script>alert('Insertion Failed.');window.location.href = '/admin/admin';</script>");

                  })

            }
        });
    }else{
        res.status(500).send("<script>alert('Insertion Failed.');window.location.href = '/admin/admin';</script>");
    }

};

exports.removeproduct = (req, res, next) => {
    const prod_id = req.body.id;

   product.destroy({where: {id: prod_id}}).then(() => {
        res.status(200).send("<script>alert('Product Removed successfully.');window.location.href = '/admin/view';</script>");
             }).catch((err) => {
        console.log(err.message);
        res.status(500).send("<script>alert('Product Not Removed.');window.location.href = '/admin/view';</script>");
    })
}



exports.addtocart = (req,res,next) => {
    const product_id = req.body.id;

    if(req.session.loggedin) {

        if(product_id !== "" && req.session.email !== ""){
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



exports.subscribe = (req,res,next) => {
    const subname = req.body.subname;
    const subemail = req.body.subemail;
    const submessage = req.body.submessage;


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

exports.gethomeproducts = (req,res) => {

    product.findAll().then(comments => {
        console.log(comments);
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

pid = '';

exports.openproduct = (req, res) => {

    pid = req.body.id;
    console.log(pid);

}

exports.getproduct = (req, res) => {

    product.findOne({where: {id: pid}}).then(comments => {
        console.log(comments);
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


exports.updateproduct = (req, res) => {

    const pname = req.body.pname;

    const pimage = req.body.pimage;

    const pdesc = req.body.pdesc;
    
    const category = req.body.category;
    
    const price = req.body.price;

      product.update(
      {
        product_name: pname,
        product_image:pimage,
        product_desc: pdesc,
        category:category,
        price:price
      }, 
      { where: { id: pid } }).then(comments => {

        res.status(200).send("<script>alert('Product Modified.');window.location.href = '/admin/view';</script>");
      }).catch((err) => {

            console.log(err.msg)
            res.status(500).send("<script>alert('Product Not Modified.');window.location.href = '/admin/view';</script>");

      });

  
}

exports.getproducts = (req,res) => {
    if(req.session.adminloggedin){
        console.log("logged in");
        product.findAll().then(comments => {
            console.log(comments);
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
};


exports.getcontacts = (req,res) => {
    if(req.session.adminloggedin){
        console.log("logged in");
        subscribe.findAll().then(comments => {
            console.log(comments);
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
};

exports.getorders = (req,res) => {
    order.findAll().then(comments => {
        console.log(comments);
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

exports.getorder = (req,res) => {
    order.findAll({where: {userid: req.session.email}}).then(comments => {
        console.log(comments);
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

exports.getmedications = (req,res) => {

    product.findAll({where:{category:'Medication'}}).then(comments => {
        console.log(comments);
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

exports.getallergies = (req,res) => {

    product.findAll({where:{category:"Allergies"}}).then(comments => {
        console.log(comments);
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


exports.getcosmetics = (req,res) => {

    product.findAll({where:{category:"Cosmetics"}}).then(comments => {
        console.log(comments);
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


exports.getcartitems = (req,res) => {

    product.findAll({where:{id: [ Sequelize.literal(
                ' SELECT productid FROM carts WHERE email ="'+req.session.email+'"')]
    }}).then(comments => {
        console.log(comments);
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

exports.checkout = (req, res, next) => {

    const userid = req.session.email;
    const address = req.body.fulladdress;
    const name = req.body.fullname;
    const cardno = req.body.cardno;
    const expmonth = req.body.expmonth;
    const expyear = req.body.expyear;
    const cvv = req.body.cvv;

    if(userid !== "" &&  name !== "" && cardno !== "" && expmonth !== "" && expyear!=="" && cvv !== ""){

        order.create({
            userid: userid,
            product_ids: uid,
            product_quantities: quantity,
            total: total,
            fulladdress: address,
            nameoncard: name,
            cardno: cardno,
            expiry_month: expmonth,
            expiry_year: expyear,
            cvv: cvv
        }).then(() => {
            cart.destroy({where: {email: req.session.email}}).then(() => {
                    res.redirect('/success');
                 }).catch((err) => {
            console.log(err.message);
            res.redirect('/checkout');
        })
            
        }).catch((err) => {
            console.log(err.message);
            res.redirect('/checkout');
        })
    }else{
        res.redirect('/checkout');
    }

}

exports.removefromcart = (req, res, next) => {
    const id = req.body.id;

    cart.destroy({where: {email: req.session.email, productid: id}}).then(() => {
        res.redirect('/cart');
             }).catch((err) => {
        console.log(err.message);
        res.redirect('/cart');
    })
}

exports.cancelorder = (req, res, next) => {
    const id = req.body.id;

    order.destroy({where: {userid: req.session.email, id: id}}).then(() => {
        res.status(200);
             }).catch((err) => {
        console.log(err.message);
        res.status(500);
    })
}