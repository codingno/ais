"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // class Student extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The models/index file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // Student.init({
  const AcademicKrs = sequelize.define(
    "academic_krs",
    {
      student_number: DataTypes.STRING,
      schedule_id: DataTypes.INTEGER,
      semester: DataTypes.INTEGER,
      grade_id: DataTypes.INTEGER,
      grade_value: {type: DataTypes.DECIMAL(6, 2)},
      confirm: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "academic_krs",
	    freezeTableName: true,
    }
  );
  AcademicKrs.associate = models => {
		AcademicKrs.belongsTo(models.academic_schedule, { foreignKey: 'schedule_id', as : 'academic_schedule' })
		AcademicKrs.belongsTo(models.student, { foreignKey: 'student_number', targetKey: "student_number", as : 'student' })
		AcademicKrs.belongsTo(models.master_grade, { foreignKey: 'grade_id', as : 'grade' })
		AcademicKrs.hasMany(models.student_grade_per_aspect, { foreignKey: 'academic_krs_id', as : 'student_grade_per_aspect' })
    // AcademicKrs.hasMany(models.course_grade_aspect, { foreignKey: 'course_id', as : 'course_grade_aspect' })
    // AcademicKrs.hasMany(models.academic_schedule, { foreignKey: 'course_id', as : 'academic_schedule' })
  }
  return AcademicKrs;
};
