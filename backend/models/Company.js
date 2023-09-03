const db = require('../db');

const Company = db.sequelize.define('companies', {
	id: {
		type: db.Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	owner: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: db.Sequelize.STRING,
		allowNull: false,
		unique: true
        },
	cnpj: {
		type: db.Sequelize.STRING(14),
		allowNull: true,
		unique: true
        },
	cep: {
		type: db.Sequelize.STRING(8),
		allowNull: false,
		unique: true
        },
	category: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	phone: {
		type: db.Sequelize.STRING(8),
		allowNull: true,
		unique: true
	},
	whatsapp: {
		type: db.Sequelize.STRING(11),
		allowNull: false,
		unique: true
	},
	email: {
		type: db.Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	site: {
		type: db.Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	instagram: {
		type: db.Sequelize.STRING,
		allowNull: true,
                unique: true
	},
	facebook: {
		type: db.Sequelize.STRING,
		allowNull: true,
                unique: true
	},
	desc: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	profile_picture_address: {
		type: db.Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Company;
