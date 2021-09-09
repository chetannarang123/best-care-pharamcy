const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Admin = sequelize.define("admin",{
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
    },
    login:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Admin;