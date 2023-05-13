import { UUIDV4, DataTypes, Op } from "sequelize";
// import { isLogin, isStudent } from "./config/police";

const db = require("../models");
const Student = require("../models/student")(db.sequelize, DataTypes);
const Teacher = require("../models/teacher")(db.sequelize, DataTypes);
const UserInfo = require("../models/userinfo")(db.sequelize, DataTypes);
const User = require("../models/user")(db.sequelize, DataTypes);
const Departement = require("../models/departement")(db.sequelize, DataTypes);
const MasterStudyType = require("../models/masterStudyType")(
  db.sequelize,
  DataTypes
);
const MasterStudentStatus = require("../models/masterStudentStatus")(
  db.sequelize,
  DataTypes
);
const Faculty = require("../models/faculty")(db.sequelize, DataTypes);
Student.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });
// Student.hasOne(FinancialType, { foreignKey: "financial_type_id", as: "program" });
Teacher.hasMany(Student, { foreignKey: "teacher_id" });
Student.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(Student, { foreignKey: "departement_id" });
Departement.belongsTo(MasterStudyType, {
  foreignKey: "study_type_id",
  as: "study_type",
});
Departement.belongsTo(Faculty, { foreignKey: "faculty_id", as: "faculty" });
Student.belongsTo(MasterStudentStatus, {
  foreignKey: "status",
  as: "student_status",
});
Student.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Student, { foreignKey: "user_id" });

export default {
  generate: async function (student) {
    // const student = await Student.findOne({
    //     where:{user_id: user_id},
    //     include: [
    //       {model: Departement, as: "departement",
    //         include:[{model: MasterStudyType, as: "study_type"}]
    //       },
    //       {model: Faculty, as: "faculty"}
    //     ],
    // })
    return new Promise(async (resolve, reject) => {
      try {
        let student_number = "";
        const departement_data = await Departement.findOne({
          where: { id: student.departement_id || student.departement },
          include: [
            { model: Faculty, as: "faculty" },
            { model: MasterStudyType, as: "study_type" },
          ],
        });
        if (!student.student_number || student.student_number == "") {
          if (student.departement_data) {
            student_number +=
              (student.departement_data.faculty.code || "00") +
              (student.departement_data && student.departement_data.study_type
                ? student.departement_data.study_type.name.slice(1)
                : "0") +
              (student.departement_data.code || "0") +
              (student.entry_year.toString().slice(-2) || "00") +
              (student.nationality == "WNI" ? "1" : "2");
          } else {
            student_number +=
              (departement_data.faculty.code || "00") +
              (departement_data && departement_data.study_type
                ? departement_data.study_type.name.slice(1)
                : "0") +
              (departement_data.code || "0") +
              (student.entry_year.toString().slice(-2) || "00") +
              (student.nationality == "WNI" ? "1" : "2");
          }
        }
        const student_in_departement = await Student.findAll({
          where: {
            student_number: {
              [Op.like]: student_number + "%",
            },
          },
        });
        if (student_in_departement) {
          if (student_in_departement.length + 1 < 10)
            student_number += "000" + (student_in_departement.length + 1);
          else if (student_in_departement.length + 1 < 100)
            student_number += "00" + (student_in_departement.length + 1);
          else if (student_in_departement.length + 1 < 1000)
            student_number += "0" + (student_in_departement.length + 1);
          else student_number += student_in_departement.length + 1;
        }
        resolve(student_number);
      } catch (error) {
        reject(error);
      }
    });
  },
};
