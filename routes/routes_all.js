const express = require("express");
const router = express.Router();
const path=require("path");
const auth_controller=require("../controllers/auth");
const products_controller=require("../controllers/products");
const uploadfile = require("../middleware/upload");
 
let routes_all = (app) => {

    // Navigation to Home Page 
    router.get("/", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        res.sendFile(path.join(__basedir +'/views/index.html'));
    });

 
    // Navigation to Admin Login
    router.get("/admin/login", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        res.sendFile(path.join(__basedir +'/views/admin/login.html'));
    });

    //Navigation to Admin Home Page
    router.get("/admin/admin", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/admin.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }
    });

    //Navigation to Admin add product Page
    router.get("/admin/addprod", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/addprod.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

    });

       //Navigation to Admin add view product Page
       
    router.get("/admin/view", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){ 
            res.sendFile(path.join(__basedir +'/views/admin/view_products.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

    });

    //Navigation to Admin see contact us view Page

    router.get("/admin/contact", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/view_contacts.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

    });

   //Navigation to Admin see orders view product Page

    router.get("/admin/orders", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/view_orders.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

    });

    //naviagtion to admin edit specific product page
    router.get("/admin/edit", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.adminloggedin){
            res.sendFile(path.join(__basedir +'/views/admin/edit_products.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/admin/login');
        }

    });



    //Navigation to Signup Page
    router.get("/signup", function(req,res) {
        app.use(express.static(__basedir + '/views'));

    if( ! req.session.loggedin){
        res.sendFile(path.join(__basedir +'/views/signup.html'));
        } else {
        res.redirect("/");
        }       
    });


    //Navigation to Login Page
    router.get("/login", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        if( ! req.session.loggedin){
        res.sendFile(path.join(__basedir +'/views/login.html'));
        } else {
        res.redirect("/");
        }   
    });

        //Navigation to forgot password Page
    router.get("/forgotpass", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        if( ! req.session.loggedin){
        res.sendFile(path.join(__basedir +'/views/forgotpassword.html'));
        } else {
        res.redirect("/");
        }   
    });

       //Navigation to update password Page
    router.get("/updatepass", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        if( ! req.session.loggedin){
        res.sendFile(path.join(__basedir +'/views/updatepassword.html'));
        } else {
        res.redirect("/");
        }   
    });

    //Navigation to cart page if logged in
    router.get("/cart", function(req,res) {
        app.use(express.static(__basedir + '/views'));
        if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/cart.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }
    }); 


    //Navigation to medication page if logged in
    router.get("/medication", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/medication.html'));

    }); 


    //Navigation to allergies page if logged in
    router.get("/allergies", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/allergies.html'));

    }); 

    //Navigation to cosmetics page if logged in
    router.get("/cosmetics", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/cosmetics.html'));

    }); 

    //Navigation to product page if logged in
    router.get("/product", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/product.html'));

    }); 

    //Navigation to checkout page if logged in
    router.get("/checkout", function(req,res) {

        app.use(express.static(__basedir + '/views'));
        if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/checkout.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }

    }); 

    //Navigation to success page if payment is successful
    router.get("/success", function(req,res) {
        app.use(express.static(__basedir + '/views'));

    if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/success.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }
    }); 

    //Navigation to failde page if payment is not successful
    router.get("/failed", function(req,res) {
        app.use(express.static(__basedir + '/views'));

    if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/failed.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }
        //__dirname : It will resolve to your project folder.);
    }); 

//Navigation to Index page if logged in
    router.get("/paymentfailed", function(req,res) {
        app.use(express.static(__basedir + '/views'));

    if(req.session.loggedin){
            res.sendFile(path.join(__basedir +'/views/payment_failed.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }
    }); 


     //Navigation to orders page if logged in
    router.get("/orders", function(req,res) {
        app.use(express.static(__basedir + '/views'));

    if(req.session.loggedin){ 
            res.sendFile(path.join(__basedir +'/views/orders.html'));
        }else{
            console.log("Please Login First");
            res.redirect('/login');
        }
    }); 

    //Navigation to search page 
    router.get("/search", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/searchprod.html'));

    }); 

    //Navigation to aboutus page
    router.get("/aboutus", function(req,res) {
        app.use(express.static(__basedir + '/views'));

        res.sendFile(path.join(__basedir +'/views/aboutus.html'));

        //__dirname : It will resolve to your project folder.);
    }); 

    //This route is for adding signup data 
    router.post("/signup_form",auth_controller.postSignUp);

    //This route is for login
    router.post("/login_form",auth_controller.postLogin); //User Login

    //This route is to checked is user is login
    router.get("/isloggedin",auth_controller.isloggedin); //User Logout

    //This route is user for logout
    router.get("/logout",auth_controller.postLogout); //User Logout

    //This route is to checkuser for update password
    router.post("/checkuser",auth_controller.checkUser); //User Check

    //This route is used to update password
    router.post("/updatepassword", auth_controller.updatepassword);

    //This route will navigate to home produts page
    router.get("/gethomeproducts",products_controller.gethomeproducts);
    
    //this route will open the specific product
    router.post("/openproduct",products_controller.openproduct);

    //this route get the produts
    router.get("/getproduct",products_controller.getproduct);

    //this route is to check search products
    router.post("/searchProducts", products_controller.searchProducts);

    //this route is used tonaviagte to search products
    router.get("/getsearch", products_controller.getsearch);

    //this route is used by admin to remove product from db
    router.post("/removeproduct",products_controller.removeproduct);
    
    //this route is used to remove product from cart by user
    router.post("/updateproduct",uploadfile.single('file'),products_controller.updateproduct);

    //this route is used to navigate to medicine with medication category
    router.get("/getmedications",products_controller.getmedications);

    //this route is used to navigate to medicine with allergies category
    router.get("/getallergies",products_controller.getallergies);

    //this route is used to navigate to medicine with cosmetics category
    router.get("/getcosmetics",products_controller.getcosmetics);

    //this route is used to navigate to cart page
    router.get("/getcartitems", products_controller.getcartitems);

    router.post("/checking", products_controller.checking);

    //this route is used to navigate for checkout page
    router.post("/checkoutform", products_controller.checkout);

    //this route is used to navigate to admin login page
    router.post("/login_admin_form",auth_controller.postAdminLogin); //postAdminLogin
    
    //this route is used by admin to add products
    router.post("/add_products",uploadfile.single('file'), products_controller.add_products);

    //this route is used to add product in cart
    router.post("/addtocart",products_controller.addtocart); 

    //this route is used to remove product from cart
    router.post("/removefromcart",products_controller.removefromcart); 

    //this route is used for send contact query
    router.post("/subscribe",products_controller.subscribe); 

    //this route is used for admin logout
    router.get("/adminlogout",auth_controller.postAdminLogout); //Admin Logout

    //this route is used to navigate to all product page in admin panel
    router.get("/getproducts",products_controller.getproducts);
    
    //this route is used to navigate to all contacts page in admin panel
    router.get("/getcontacts",products_controller.getcontacts);

    //this route is used to navigate to all orders page in admin panel
    router.get("/getorders",products_controller.getorders);

    //this route is used to navigate to see his orders by user
    router.get("/getorder",products_controller.getorder);

    //this route is used to navigate to cancel order by user
    router.post("/cancelorder",products_controller.cancelorder);


    return app.use("/", router);
};

module.exports = routes_all;