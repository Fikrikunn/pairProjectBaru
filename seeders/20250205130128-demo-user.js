'use strict';

const symptom = require('../models/symptom');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    const dataUser = require(`../users.json`).map(user => {
      delete user.id
      user.createdAt = user.updatedAt = new Date()
      return user
    })

    const dataProfile = require(`../Profiles.json`).map(profile => {
      delete profile.id
      profile.createdAt = profile.updatedAt = new Date()
      return profile
    })

    const dataSymptom = require(`../symptoms.json`).map(symptom => {
      delete symptom.id
      symptom.createdAt = symptom.updatedAt = new Date()
      return symptom
    })

    const dataDisease = require(`../Diseases.json`).map(disease => {
      delete disease.id
      disease.createdAt = disease.updatedAt = new Date()
      return disease
    })

    const dataDiseaseSymptom = require(`../DiseasesSymptoms.json`).map(diseaseSymptom => {
      diseaseSymptom.createdAt = diseaseSymptom.updatedAt = new Date()
      return diseaseSymptom
    })


     await queryInterface.bulkInsert('Users', dataUser);
     await queryInterface.bulkInsert('Profiles', dataProfile);
     await queryInterface.bulkInsert('Symptoms', dataSymptom);
     await queryInterface.bulkInsert('Diseases', dataDisease);
     await queryInterface.bulkInsert('DiseaseSymptoms', dataDiseaseSymptom);
   
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('DiseaseSymptoms', null, {});
     await queryInterface.bulkDelete('Profiles', null, {});
     await queryInterface.bulkDelete('Diseases', null, {});
     await queryInterface.bulkDelete('Symptoms', null, {});
     await queryInterface.bulkDelete('Users', null, {});
  }
};
