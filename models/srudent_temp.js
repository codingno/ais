"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // class Student extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // Student.init({
  const StudentTemp = sequelize.define(
    "student_temp",
    {
      // user_id: DataTypes.STRING,
      name: DataTypes.STRING,
      entry_year: DataTypes.INTEGER,
      departement: DataTypes.INTEGER,
      faculty: DataTypes.INTEGER,
      financial_type_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      nationality: {
        type: DataTypes.ENUM,
        values: ["WNI", "WNA"],
        defaultValue: "WNI",
      },
      generate: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "student_temp",
      freezeTableName: true,
    }
  );
  return StudentTemp;
};
