const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'models/database.sqlite',
});

const Users = require('../models/Users.js')(sequelize, Sequelize.DataTypes);


Users.prototype.print = function(){
    return this;
};

//
// The below are ways to add methods to the Model class in Sequelize
//


/* eslint-disable-next-line func-names */
// Users.prototype.addItem = async function(item) {
// 	const userItem = await UserItems.findOne({
// 		where: { user_id: this.user_id, item_id: item.id },
// 	});

// 	if (userItem) {
// 		userItem.amount += 1;
// 		return userItem.save();
// 	}

// 	return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
// };

// /* eslint-disable-next-line func-names */
// Users.prototype.getItems = function() {
// 	return UserItems.findAll({
// 		where: { user_id: this.user_id },
// 		include: ['item'],
// 	});
// };

module.exports = { Users };