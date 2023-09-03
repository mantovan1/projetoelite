const db = require('../db');

const Comment = db.sequelize.define("comments", {
	text: {
		type: db.Sequelize.STRING,
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

module.exports = Comment;
