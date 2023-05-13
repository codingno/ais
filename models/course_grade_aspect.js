'use strict';

module.exports = (db, Sequelize) => {
  var model = db.define('course_grade_aspect', {
    id:{
      primaryKey: true,
      type: Sequelize.INTEGER,
			autoIncrement: true,
    },
    academic_schedule_id: {type: Sequelize.INTEGER},
    name: {type: Sequelize.STRING},
    percentage: {type: Sequelize.INTEGER},
    position: {type: Sequelize.INTEGER},
    status: {type: Sequelize.BOOLEAN},
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'course_grade_aspect',
    logging: false,
    raw: false
  });
  model.associate = models => {
		model.belongsTo(models.academic_schedule, { foreignKey: 'academic_schedule_id', as : 'academic_schedule' })
    model.hasMany(models.student_grade_per_aspect, { foreignKey: 'course_grade_aspect_id', as : 'student_grade_per_aspect' })
  }
  return model;
};