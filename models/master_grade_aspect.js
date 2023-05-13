'use strict';

module.exports = (db, Sequelize) => {
  var model = db.define('master_grade_aspect', {
    id:{
      primaryKey: true,
      type: Sequelize.INTEGER,
			autoIncrement: true,
    },
    name: {type: Sequelize.STRING},
    percentage: {type: Sequelize.INTEGER},
    position: {type: Sequelize.INTEGER},
    status: {type: Sequelize.BOOLEAN},
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'master_grade_aspect',
    logging: false,
    raw: false
  });
  model.associate = models => {
		// model.belongsTo(models.Personal, { foreignKey: 'personal_id', as : 'personal' })
		// model.belongsTo(models.Personal, { foreignKey: 'admin_id', as : 'admin' })
  }
  return model;
};