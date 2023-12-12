'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../utils/PasswordUtils');
const { validateRegisterInput } = require('../utils/Validator');
const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      async beforeCreate(user) {
        const {valid, message, field} = validateRegisterInput(user.username, user.email, user.password)
        if(valid) {
          user.password = await hashPassword(user.password)
        } else {
          throw new GraphQLError(message, {
            extensions: {
              fieldName: field,
              code: ApolloServerErrorCode.BAD_USER_INPUT
            }
          })
        }
      }
    }
  });
  return User;
};