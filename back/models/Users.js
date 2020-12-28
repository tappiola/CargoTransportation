const { DataTypes } = require( 'sequelize' );
const db = require( '../database/db' );

const Users = db.define( 'users', {
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
   surName     : {
      type : DataTypes.STRING
   },
   fullName    : {
      type : DataTypes.VIRTUAL,
      get() {
         return `${this.lastName} ${this.firstName} ${this.surName}`;
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
   role        : {
      type : DataTypes.STRING
   }
} );

module.exports = Users;