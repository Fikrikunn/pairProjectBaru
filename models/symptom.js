'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Symptom.belongsTo(models.User, {foreignKey: "UserId"})
      Symptom.belongsToMany(models.Disease, { through: models.DiseaseSymptom });
    }
  }
  Symptom.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `name is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Symptom',
  });
  return Symptom;
};