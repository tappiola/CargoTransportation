const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');
const elastic = require('../config/elastic.config');
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

User.beforeCreate(async (user) => {
  user.password = hashPassword(user.password);
});

User.afterCreate(({ id, firstName, lastName }) => {
  elastic.index({
    id,
    index: 'users',
    body: { firstName, lastName },
  });
});

User.beforeUpdate((user, { password }) => {
  const { id, firstName, lastName } = user;
  
  elastic.update({
    id,
    index: 'users',
    body: {
      doc: { firstName, lastName },
    },
  });

  if (password && isValidPassword(password)) {
    user.password = hashPassword(password);
  }
});

User.beforeBulkDestroy(async ({ where: { id: ids } }) => {
  ids.forEach((id) => elastic.delete({ id, index: 'users' }));
});

User.prototype.isValidPassword = (password, hash) =>
  bcrypt.compareSync(password, hash);

User.prototype.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this.id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    process.env.jwtToken || 'secret',
  );
};

module.exports = User;
