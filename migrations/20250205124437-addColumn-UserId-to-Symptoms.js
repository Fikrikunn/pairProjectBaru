'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.addColumn(
      'Symptoms',
      'UserId',
      {
        type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.removeColumn('Symptoms', 'UserId', null);
     
  }
};
