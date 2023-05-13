"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // class MasterEvalQuestions extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // MasterEvalQuestions.init({
  const MasterEvalQuestions = sequelize.define(
    "master_eval_questions",
    {
      question: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "master_eval_questions",
      freezeTableName: true,
    }
  );
  return MasterEvalQuestions;
};
