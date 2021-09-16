const express = require('express');
const sequelize = require("./utils/database");
const User = require("./Models/Users");
const routess=require("./routes/routes_all");
const bodyParser=require("body-parser");
const session=require("express-session");


const app = express();

global.__basedir = __dirname;

app.use(bodyParser.json())

app.set('view engine', 'ejs');

/*
var Publishable_Key = 'Your_Publishable_Key'
var Secret_Key = 'Your_Secret_Key'
  
const stripe = require('stripe')(Secret_Key)
  
const port = process.env.PORT || 3000
  
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
  
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
  
app.get('/', function(req, res){
    res.render('Home', {
       key: Publishable_Key
    })
})
  
app.post('/payment', function(req, res){
  
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
    .then((customer) => {
  
        return stripe.charges.create({
            amount: 2500,     // Charing Rs 25
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
})

*/

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","OPTIONS,POST,GET,PUT,DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
})

app.use(session({
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(express.urlencoded({ extended: true }));
routess(app);


sequelize.sync().then(() => {
    app.listen(3000,() => {
        console.log("app is running now");
    })
}).catch(() => {
    console.log("failed connection")
})
