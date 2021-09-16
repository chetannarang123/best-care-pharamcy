// we are using sequelize to store mysql data
const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
//these are columns for product table

const Products = sequelize.define("products",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    product_name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    product_image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data:{
        type: Sequelize.BLOB("long"),
        allowNull:false
    },
    product_desc:{
        type: Sequelize.STRING,
        allowNull:false
    },
    category:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

// we are exporting this table so we can use it anywhere
module.exports = Products;