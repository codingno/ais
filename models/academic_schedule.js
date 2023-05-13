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
  const AcademicSchedule = sequelize.define(
    "academic_schedule",
    {
      academic_year_id: DataTypes.INTEGER,
      departement_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      day_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      teacher_id: DataTypes.INTEGER,
      teacher_2_id: DataTypes.INTEGER,
      teacher_3_id: DataTypes.INTEGER,
      teacher_4_id: DataTypes.INTEGER,
      semester: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "academic_schedule",
	    freezeTableName: true,
    }
  );
  AcademicSchedule.associate = models => {
		AcademicSchedule.belongsTo(models.course, { foreignKey: 'course_id', as : 'course' })
		AcademicSchedule.belongsTo(models.teacher, { foreignKey: 'teacher_id', as : 'teacher' })
		AcademicSchedule.belongsTo(models.teacher, { foreignKey: 'teacher_2_id', as : 'teacher_2' })
		AcademicSchedule.belongsTo(models.teacher, { foreignKey: 'teacher_3_id', as : 'teacher_3' })
		AcademicSchedule.belongsTo(models.teacher, { foreignKey: 'teacher_4_id', as : 'teacher_4' })
		AcademicSchedule.belongsTo(models.room, { foreignKey: 'room_id', as : 'room' })
    AcademicSchedule.hasMany(models.course_grade_aspect, { foreignKey: 'academic_schedule_id', as : 'course_grade_aspect' })
    // AcademicSchedule.hasMany(models.academic_schedule, { foreignKey: 'course_id', as : 'academic_schedule' })
  }
  return AcademicSchedule;
};
