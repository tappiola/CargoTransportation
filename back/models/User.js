const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');
const db = require('../database/db');
const { isValidPassword } = require('../utils/password.utils');

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    min: 3,
  },
  lastName: {
    type: DataTypes.STRING,
    min: 3,
  },
  middleName: {
    type: DataTypes.STRING,
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.lastName} ${this.firstName} ${this.middleName}`;
    },
  },
  shortFullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.lastName} ${this.firstName[0]}. ${this.middleName[0]}.`;
    },
  },
  login: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
  country: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
  },
  house: {
    type: DataTypes.STRING,
  },
  apartment: {
    type: DataTypes.STRING,
  },
  fullAddress: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.country}, ${this.city}, ${this.street} ${this.house}-${this.apartment}`;
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

User.beforeUpdate((user, { password }) => {
  // TODO: Not sure that we need this, user is registered and usable even without these lines
  // TODO: method beforeCreate() should be enough, as we don't need to update password during each update
  if (password && isValidPassword(password)) {
    // eslint-disable-next-line no-param-reassign
    user.password = hashPassword(password);
  }
});

User.beforeCreate((user) => {
  // eslint-disable-next-line no-param-reassign
  user.password = hashPassword(user.password);
});

User.prototype.isValidPassword = (password, hash) => bcrypt.compareSync(password, hash);

User.prototype.generateJWT = function generateJWT() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this.id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    process.env.jwtToken || 'secret'
  );
};

module.exports = User;
