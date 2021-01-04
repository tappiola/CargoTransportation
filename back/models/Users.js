const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Users = db.define('users', {
	id          : {
		type          : DataTypes.INTEGER,
		autoIncrement : true,
		primaryKey    : true,
		allowNull     : false
	},
	firstName   : {
		type : DataTypes.STRING,
		min  : 3
	},
	lastName    : {
		type : DataTypes.STRING,
		min  : 3
	},
	middleName  : {
		type : DataTypes.STRING
	},
	fullName    : {
		type : DataTypes.VIRTUAL,
		get() {
			return `${this.lastName} ${this.firstName} ${this.middleName}`;
		}
	},
	login       : {
		type   : DataTypes.STRING,
		unique : true
	},
	email       : {
		type     : DataTypes.STRING,
		unique   : true,
		validate : {
			isEmail : true
		}
	},
	password    : {
		type      : DataTypes.STRING,
		allowNull : false
	},
	birthday    : {
		type : DataTypes.DATE
	},
	city        : {
		type : DataTypes.STRING
	},
	street      : {
		type : DataTypes.STRING
	},
	house       : {
		type : DataTypes.STRING
	},
	apartment   : {
		type : DataTypes.STRING
	},
	fullAddress : {
		type : DataTypes.VIRTUAL,
		get() {
			return `${this.city}, ${this.street}, ${this.house}-${this.apartment}`;
		}
	},
	status      : {
		type         : DataTypes.ENUM,
		values       : [ 'registered', 'active', 'disabled' ],
		allowNull    : false,
		defaultValue : 'registered'
	}
});

Users.beforeCreate(( user, options ) => {
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
});

Users.prototype.isValidPassword = password => {
	return bcrypt.compareSync(password, this.password);
};

module.exports = Users;
