'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require(`bcryptjs`)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {foreignKey: "UserId"})
      User.hasMany(models.Symptom, {foreignKey: "UserId"})
    }

    get UserRole(){
      if (this.role == "user") {
        return `👥:${this.role}`
      }else{
        return `🔑:${this.role}`
      }
    }

    static async getEmailEmoji(User){
      try {
        return `💌:${User.email}`
      } catch (error) {
        throw error
      }
    }
    
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `userName is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `email is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `password is required`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `role is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(input, option) {
        var salt = bcrypt.genSaltSync(7);
        var hash = bcrypt.hashSync(input.password, salt);

        input.password = hash
      }
    }
  });
  return User;
};