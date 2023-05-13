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
  const Student = sequelize.define(
    "student",
    {
      // user_id: DataTypes.STRING,
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      student_number: DataTypes.STRING,
      teacher_id: DataTypes.INTEGER,
      entry_year: DataTypes.INTEGER,
      entry_semester: {
        type: DataTypes.ENUM,
        values: ["1", "2"],
        defaultValue: "1",
      },
      entry_status: {
        type: DataTypes.ENUM,
        values: ["NEW", "TRANSFER"],
        defaultValue: "NEW",
      },
      departement_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      financial_type_id : DataTypes.INTEGER,
      mother_name: DataTypes.STRING,
      father_name: DataTypes.STRING,
      // father_income: DataTypes.INTEGER,
      // mother_income: DataTypes.INTEGER,
      father_income: DataTypes.STRING,
      mother_income: DataTypes.STRING,
      school_name: DataTypes.STRING,
      school_telp: DataTypes.STRING,
      school_address: DataTypes.STRING,
      school_departement: DataTypes.STRING,
      school_end: DataTypes.INTEGER,
      campus_name: DataTypes.STRING,
      campus_telp: DataTypes.STRING,
      campus_address: DataTypes.STRING,
      campus_departement: DataTypes.STRING,
      campus_end: DataTypes.INTEGER,
      institution_name: DataTypes.STRING,
      institution_telp: DataTypes.STRING,
      institution_address: DataTypes.STRING,
      institution_start: DataTypes.INTEGER,
      institution_end: DataTypes.INTEGER,
      semester_active: DataTypes.INTEGER,
      mobile_number: DataTypes.STRING,
      emergency_contact	: DataTypes.STRING,
      marriage_status	: {
        type: DataTypes.ENUM,
          values: [
            'Married',
            'Single',
            'Single Parent'
          ],
          defaultValue: 'Single',
      },
      edu_background_degree	: DataTypes.STRING,
      edu_background_name	: DataTypes.STRING,
      edu_background_faculty : DataTypes.STRING,
      edu_background_departement : DataTypes.STRING,
      edu_background_major: DataTypes.STRING,
      residence_type	: {
        type: DataTypes.ENUM,
          values: [
            "With parents", "Boarding house", "Hostel", "Others"
          ],
          defaultValue: 'With parents',
      },
      transport	: {
        type: DataTypes.ENUM,
          values: [
            "Public transportation", "Private cars", "Shuttle buses", "Bicycles", "Motorbikes", "Others"
          ],
          defaultValue: 'Public transportation',
      },
    },
    {
      sequelize,
      modelName: "student",
    }
  );
  Student.associate = models => {
		Student.belongsTo(models.user, { foreignKey: 'user_id', as : 'user' })
		Student.belongsTo(models.departement, { foreignKey: 'departement_id', as : 'departement' })
    Student.hasMany(models.academic_krs, { foreignKey: 'student_number', as : 'academic_krs' })
  }
  return Student;
};
