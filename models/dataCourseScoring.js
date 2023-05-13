"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // class DataCourseScoring extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // DataCourseScoring.init({
  const DataCourseScoring = sequelize.define(
    "data_course_scoring",
    {
      student_id: DataTypes.INTEGER,
      course_code: DataTypes.STRING,
      student_number: DataTypes.STRING,
      faculty_id: DataTypes.INTEGER,
      departements_id: DataTypes.INTEGER,
      academic_year: DataTypes.INTEGER,
      score: DataTypes.JSON,
      total_score: DataTypes.INTEGER,
      feedback: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "data_course_scoring",
      freezeTableName: true,
    }
  );
  return DataCourseScoring;
};
