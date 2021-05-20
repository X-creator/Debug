require('dotenv').config();
const Sequelize = require('sequelize');
const {DB, DB_USER, DB_HOST, DB_PASSWORD} = process.env;
                                //database username   password
const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false
});

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
);

module.exports = sequelize;