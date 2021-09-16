// we are using sequelize to store mysql data
const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
//these are columns for user table

const User = sequelize.define("user",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

// we are exporting this table so we can use it anywhere
module.exports = User;