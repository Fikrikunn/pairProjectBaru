'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseSymptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiseaseSymptom.belongsTo(models.Disease, { foreignKey: 'DiseaseId' });
      DiseaseSymptom.belongsTo(models.Symptom, { foreignKey: 'SymptomId' });
    }
  }
  DiseaseSymptom.init({
    DiseaseId: { 
    type: DataTypes.INTEGER,
    references: {
      model: "Diseases",
      key: "id"
    }
  },

    SymptomId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Symptoms",
      key: "id"
    }
  }
  }, {
    sequelize,
    modelName: 'DiseaseSymptom',
  });
  return DiseaseSymptom;
};