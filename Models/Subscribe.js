// we are using sequelize to store mysql data
const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
//these are columns for contactus table

const Subscribe = sequelize.define("subscribe",{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    message:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});
// we are exporting this table so we can use it anywhere
module.exports = Subscribe;