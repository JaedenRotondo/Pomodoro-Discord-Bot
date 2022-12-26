const Sequelize = require('sequelize');
const fs = require("fs");

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'models/database.sqlite',
});

const Users = require('../models/Users.js')(sequelize, Sequelize.DataTypes);
const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	console.log('Database successfully synced/reset!');
	sequelize.close();
}).catch(console.error);