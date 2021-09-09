const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Products = sequelize.define("order",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userid:{
        type: Sequelize.STRING,
        allowNull:false
    },
    product_ids:{
        type: Sequelize.STRING,
        allowNull:false
    },
    product_quantities:{
        type: Sequelize.STRING,
        allowNull:false
    },
    total:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fulladdress:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nameoncard:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cardno:{
        type: Sequelize.STRING,
        allowNull: false
    },
    expiry_month:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    expiry_year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cvv:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Products;