const Sequelize = require("sequelize").Sequelize;

// this is code for database connection database name, username , host and type of database we are using
const sequelize = new Sequelize("pharmacy","root","",{dialect:"mysql", host:"localhost"});

// we are exporting sequelize so that we can user db everywhere
module.exports = sequelize;