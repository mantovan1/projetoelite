const db = require('../db');

const Client = db.sequelize.define('clients', {
	id: {
		type: db.Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: db.Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: db.Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Client;
