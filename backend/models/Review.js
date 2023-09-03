const db = require('../db');

const Review = db.sequelize.define("reviews", {
	note: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	clientId: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	companyId: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Review;
