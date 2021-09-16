// we are using sequelize to store mysql data
const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
//these are columns for cart table

const Cart = sequelize.define("cart",{
    email:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    productid:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
    
});

// we are exporting this table so we can use it anywhere
module.exports = Cart;
