const db = require('../db');

const Favorite = db.sequelize.define("favorites", {
	clientId: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	companyId: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Favorite
