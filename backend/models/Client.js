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

Cliente.belongsToMany(Microempresa, {
	through: 'avaliacoes',
	foreignKey: 'clienteId',
	constraint: true
});

Microempresa.belongsToMany(Cliente, {
	through: 'avaliacoes',
	foreignKey: 'microempresaId',
	constraint: true
});

Cliente.belongsToMany(Microempresa, {
        through: 'favorites',
        foreignKey: 'clienteId',
        //constraint: true
});

Microempresa.belongsToMany(Cliente, {
        through: 'favorites',
        foreignKey: 'microempresaId',
        //constraint: true
});

//db.sequelize.sync({force: true})

module.exports = Client;
