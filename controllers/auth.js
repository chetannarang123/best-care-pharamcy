const User = require("../Models/Users");
const admin=require("../Models/Admin");
 
//This is used for the signup form user will get registred here all the data will be saved to database
exports.postSignUp = (req,res,next) => {
    // this is data we are getting from frontend
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if(username !== "" && email !== "" && password !== ""){
        // Here we are finding user from database if the user is already registed
        User.findOne({where:{email:email}}).then((user) => {
            if(user){
                console.log("user not valid");
                res.status(208).send("<script>alert('Account already exists.');window.location.href='/login';</script>");
            }else{
                User.create({
                    username: username,
                    password: password,
                    email:email,
                }).then(() => {
                    res.status(200).send("<script>alert('Signup Successfull.');window.location.href='/login';</script>");
                }).catch((err) => {
                    console.log(err.message);
                    res.status(500).send("<script>alert('Oops !, Something Went Wrong.');window.location.href='/signup';</script>");
                })
            }
        })
    }else{
        console.log("empty values found");
        res.status(500).send("<script>alert('Empty Values Found.');window.location.href='/signup';</script>");
    }

};

//This is used for the login form user will get registred here all the data will be saved to database
exports.postLogin = (req,res,next) => {
    // this is data we are getting from frontend
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    if(email !== "" && password !== ""){
        // Here we are finding user from database by compairing email and password
    User.findOne({where:{email:email,password:password}}).then((user) => {
        if(user){
            //sessions will be generated here
            req.session.loggedin = true;
            req.session.email = user.email;
            res.status(200).send("<script>alert('Login Successfull.');window.location.href='/';</script>");

        }else{
            req.session.loggedin = false;
            console.log("Incorrect Details");
            res.status(500).send("<script>alert('Incorrect Credentials.');window.location.href='/login';</script>");
        }
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send("<script>alert('Oops !, Something Went Wrong.');window.location.href='/login';</script>");
    })

    }else{
        req.session.loggedin = false;
        //res.status(500).json({message: "Empty values found !"});
        res.status(500).send("<script>alert('Empty values found.');window.location.href='/login';</script>");
    }

};


var useremail = '';
// we are checking if user is in the db for updating password
exports.checkUser = (req, res, next) => {

    const email = req.body.email;
// we are checking user here in db with email
    User.findOne({where:{email:email}}).then((user) => {
        if(user){
            useremail = email;

            console.log(useremail);
            res.redirect("/updatepass");

        } else {
            res.status(500);
            res.redirect("/forgotpass");
        }
    });

}

// we are updating password of user here in this api
exports.updatepassword = (req, res, next) => {

    //password coming from frontend
    const passwd = req.body.npass;

//we are updating here password in db
    User.update({
        password: passwd
    }, {
        where: {email: useremail}
    }).then(comments => {

        res.status(200).send("<script>alert('Updated Successfully.');window.location.href = '/login';</script>");
      }).catch((err) => {

            console.log(err.msg);
            res.status(500).send("<script>alert('Update Failed!.');window.location.href = '/forgotpass';</script>");
      });

}

// we are logging out user here
exports.postLogout = (req,res,next) => {
//sessions will be destroyed here and user will be logged out
    req.session.loggedin = false;
    req.session.email = null;
    res.status(200).send("<script>alert('Logged Out.');window.location.href='/';</script>");
};


//here we are checking is user is already logged in or not
exports.isloggedin = (req,res) => {
    
    if(req.session.loggedin) {
        res.status(200).send({
            message: true
        });
    } else {
        res.status(200).send({
            message: false
        });
    }
    

};


//this api is used for admin login
exports.postAdminLogin = (req,res,next) => {
    //data coming for frontend
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    if(email !== "" && password !== ""){
        //we are finding admin in db and if we found the admin with correct credentials admin will be logged in otherwise error message will be given
        admin.findOne({where:{login:true}}).then(admin => {
            if(admin){
                admin.update({login:false},{where:{login:true}});
                return admin.save();
            }
            return
        }).then(() => {
            admin.findOne({where:{email:email,password:password}}).then((admin) => {
                if(admin){
                    admin.update({login:true});
                    admin.save();
                    req.session.adminloggedin = true;
                    req.session.email = admin.email;
                    res.status(200).send("<script>alert('Login Successfull.');window.location.href = '/admin/admin';</script>");

                }else{
                    req.session.adminloggedin = false;
                    console.log("Incorrect Details");
                    res.status(500).send("<script>alert('Incorrect Credentials.');window.location.href = '/admin/login';</script>");
                }
            })
        })

    }else{
        res.status(500).send("<script>alert('Empty Values Found.');window.location.href = '/admin/login';</script>");
    }

};

// we are logging out admin here
exports.postAdminLogout = (req,res,next) => {
    //admin sessions will be destroyed here
    req.session.adminloggedin = false;
    req.session.email = null;
    res.status(500).send("<script>alert('Logged Out.');window.location.href='/admin/login';</script>");

};
