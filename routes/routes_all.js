const express = require("express");
const router = express.Router();
const path=require("path");
const user=require("../Models/Users");
//const images_model=require("../Models/placeimages");
const auth_controller=require("../controllers/auth");
const products_controller=require("../controllers/products");
const db=require("../utils/database");
const ejs =require("ejs");
//const place_images_controller=require("../controllers/placeimages");
//const place_middleware_file=require("../middleware/upload");
let routes_all = (app) => {
    // Navigation to Home Page
    router.get("/", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        res.sendFile(path.join(__basedir +'/views/index.html'));
        //__dirname : It will resolve to your project folder.);
    });

 

    //Admin Login
    router.get("/admin/login", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        res.sendFile(path.join(__basedir +'/views/admin/login.html'));
        //__dirname : It will resolve to your project folder.);
    });

    //Admin Page
    router.get("/admin/admin", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/admin.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

        //__dirname : It will resolve to your project folder.);
    });

    //Admin Page
    router.get("/admin/view", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/view_products.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

        //__dirname : It will resolve to your project folder.);
    });

    //Admin Page
    router.get("/admin/contact", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/view_contacts.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

        //__dirname : It will resolve to your project folder.);
    });

    //Admin Page
    router.get("/admin/orders", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/view_orders.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

        //__dirname : It will resolve to your project folder.);
    });

    //Admin Page
    router.get("/admin/edit", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/edit_products.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

        //__dirname : It will resolve to your project folder.);
    });



    //Navigation to Signup Page
    router.get("/signup", function(req,res) {
        app.use(express.static(__basedir + '/views'));

    if( ! req.session.loggedin){
        res.sendFile(path.join(__basedir +'/views/signup.html'));
        //__dirname : It will resolve to your project folder.);
        } else {
        res.redirect("/");
        }         //__dirname : It will resolve to your project folder.);
    });

    //Navigation to Login Page
    router.get("/login", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        if( ! req.session.loggedin){
        res.sendFile(path.join(__basedir +'/views/login.html'));
        //__dirname : It will resolve to your project folder.);
        } else {
        res.redirect("/");
        }   
    });

        //Navigation to Login Page
    router.get("/forgotpass", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        if( ! req.session.loggedin){
        res.sendFile(path.join(__basedir +'/views/forgotpassword.html'));
        //__dirname : It will resolve to your project folder.);
        } else {
        res.redirect("/");
        }   
    });

       //Navigation to Login Page
    router.get("/updatepass", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        if( ! req.session.loggedin){
        res.sendFile(path.join(__basedir +'/views/updatepassword.html'));
        //__dirname : It will resolve to your project folder.);
        } else {
        res.redirect("/");
        }   
    });

    //Navigation to Index page if logged in
    router.get("/cart", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/cart.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }

        //__dirname : It will resolve to your project folder.);
    }); 


    //Navigation to Index page if logged in
    router.get("/medication", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/medication.html'));

        //__dirname : It will resolve to your project folder.);
    }); 


    //Navigation to Index page if logged in
    router.get("/allergies", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/allergies.html'));

        //__dirname : It will resolve to your project folder.);
    }); 

    //Navigation to Index page if logged in
    router.get("/cosmetics", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/cosmetics.html'));

        //__dirname : It will resolve to your project folder.);
    }); 

    //Navigation to Index page if logged in
    router.get("/product", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/product.html'));

        //__dirname : It will resolve to your project folder.);
    }); 

    //Navigation to Index page if logged in
    router.get("/checkout", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/checkout.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }

        //__dirname : It will resolve to your project folder.);
    }); 

    //Navigation to Index page if logged in
    router.get("/success", function(req,res) {
        app.use(express.static(__basedir + '/views'));

    if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/success.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }
        //__dirname : It will resolve to your project folder.);
    }); 

     //Navigation to Index page if logged in
    router.get("/orders", function(req,res) {
        app.use(express.static(__basedir + '/views'));

    if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/orders.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }
        //__dirname : It will resolve to your project folder.);
    }); 


    router.post("/signup_form",auth_controller.postSignUp); //Signupform data insert
    router.post("/login_form",auth_controller.postLogin); //User Login
    router.get("/isloggedin",auth_controller.isloggedin); //User Logout
    router.get("/logout",auth_controller.postLogout); //User Logout
    router.post("/checkuser",auth_controller.checkUser); //User Check
    router.post("/updatepassword", auth_controller.updatepassword);

    router.get("/gethomeproducts",products_controller.gethomeproducts);
    router.post("/openproduct",products_controller.openproduct);
    router.get("/getproduct",products_controller.getproduct);
    router.post("/removeproduct",products_controller.removeproduct);
    router.post("/updateproduct",products_controller.updateproduct);
    router.get("/getmedications",products_controller.getmedications);
    router.get("/getallergies",products_controller.getallergies);
    router.get("/getcosmetics",products_controller.getcosmetics);
    router.get("/getcartitems", products_controller.getcartitems);
    router.post("/checking", products_controller.checking);
    router.post("/checkoutform", products_controller.checkout);


    router.post("/login_admin_form",auth_controller.postAdminLogin); //postAdminLogin
    router.post("/add_products",products_controller.add_products); //postAdminLogin
    router.post("/addtocart",products_controller.addtocart); //postAdminLogin
    router.post("/removefromcart",products_controller.removefromcart); //postAdminLogin
    router.post("/subscribe",products_controller.subscribe); //postAdminLogin
    router.get("/adminlogout",auth_controller.postAdminLogout); //Admin Logout

    router.get("/getproducts",products_controller.getproducts);
    router.get("/getcontacts",products_controller.getcontacts);
    router.get("/getorders",products_controller.getorders);
    router.get("/getorder",products_controller.getorder);
    router.post("/cancelorder",products_controller.cancelorder);


    return app.use("/", router);
};

module.exports = routes_all;