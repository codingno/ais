'use strict';

module.exports = (db, Sequelize) => {
  var model = db.define('student_grade_per_aspect', {
    id:{
      primaryKey: true,
      type: Sequelize.INTEGER,
			autoIncrement: true,
    },
    academic_krs_id: {type: Sequelize.INTEGER},
    course_grade_aspect_id: {type: Sequelize.INTEGER},
    grade: {type: Sequelize.INTEGER},
    grade_by_percentage: {type: Sequelize.INTEGER},
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'student_grade_per_aspect',
    logging: false,
    raw: false
  });
  model.associate = models => {
		model.belongsTo(models.academic_krs, { foreignKey: 'academic_krs_id', as : 'academic_krs' })
		model.belongsTo(models.course_grade_aspect, { foreignKey: 'course_grade_aspect_id', as : 'course_grade_aspect' })
    // model.hasMany(models.PersonalSecret, { foreignKey: 'personal_id', as : 'personal_secret' })
  }
  return model;
};