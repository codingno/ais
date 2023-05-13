// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import UserServices from "../../services/UserServices";
import StudentService from "../../services/StudentService";
import { isLogin, isStudent } from "./config/police";

const db = require("../../models");
const { Op } = require("sequelize");
const Student = require("../../models/student")(db.sequelize, DataTypes);
const Teacher = require("../../models/teacher")(db.sequelize, DataTypes);
const User = require("../../models/user")(db.sequelize, DataTypes);
const UserInfo = require("../../models/userinfo")(db.sequelize, DataTypes);
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
const MasterStudyType = require("../../models/masterStudyType")(
  db.sequelize,
  DataTypes
);
const MasterIdentityType = require("../../models/masterIdentityType")(
  db.sequelize,
  DataTypes
);
const MasterStudentStatus = require("../../models/masterStudentStatus")(
  db.sequelize,
  DataTypes
);
const FinancialType = require("../../models/financial_type")(
  db.sequelize,
  DataTypes
);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
Student.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });
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
Student.belongsTo(UserInfo, {
  foreignKey: "user_id",
  as: "user_info",
  targetKey: "user_id",
});
UserInfo.hasMany(Student, { foreignKey: "user_id", sourceKey: "user_id" });
UserInfo.belongsTo(MasterIdentityType, {
  foreignKey: "identity_type_id",
  as: "identity_type",
});
UserInfo.belongsTo(db.religion, {
  foreignKey: "religion",
  as: "religions",
});
db.religion.hasOne(UserInfo, { foreignKey: "religion", sourceKey: "id" });
Teacher.hasOne(UserInfo, { foreignKey: "user_id", sourceKey: "user_id" });
Student.belongsTo(FinancialType, { foreignKey: "financial_type_id", as: "financial_type" });
FinancialType.hasMany(Student, { foreignKey: "financial_type_id" });

export default nextConnect()
  // .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    try {
      const user_id = await UserServices.create(body);
      const student_number = await StudentService.generate(body)
      const data_student = {
        user_id: user_id,
        student_number: student_number,
        teacher_id: body.teacher_id,
        entry_year: body.entry_year,
        entry_semester: body.entry_semester,
        entry_status: body.entry_status,
        departement_id: body.departement_id,
        status: body.status,
        mother_name: body.mother_name,
        father_name: body.father_name,
        father_income: body.father_income,
        mother_income: body.mother_income,
        school_name: body.school_name,
        school_telp: body.school_telp,
        school_address: body.school_address,
        school_departement: body.school_departement,
        school_end: body.school_end,
        campus_name: body.campus_name,
        campus_telp: body.campus_telp,
        campus_address: body.campus_address,
        campus_departement: body.campus_departement,
        campus_end: body.campus_end,
        institution_name: body.institution_name,
        institution_telp: body.institution_telp,
        institution_address: body.institution_address,
        institution_start: body.institution_start,
        institution_end: body.institution_end,
        semester_active: body.semester_active || 1,
        residence_type: body.residence_type,
        transport : body.transport,
      };
      const data = await Student.create(data_student);
      return res.status(200).json({ data });
    } catch (error) {
      console.log("🚀 ~ file: student.js ~ line 107 ~ .post ~ error", error)
      const message = error?.errors ? error.errors[0]?.message : ( error.message || error )
      return res.status(500).json(message);
    }
  })
  .get(async (req, res) => {
    const options = req.query;
    if (options.id || options.user_id) {
      try {
        const data = await Student.findOne({
          where: options,
          include: [
            {
              model: Teacher,
              as: "teacher",
              include: [
                {
                  model: UserInfo,
                  as: "user_info",
                },
              ],
            },
            {
              model: Departement,
              as: "departement",
              include: [
                { model: Faculty, as: "faculty" },
                { model: MasterStudyType, as: "study_type" },
              ],
            },
            { model: User, as: "user" },
            {
              model: UserInfo,
              as: "user_info",
              include: [{ model: MasterIdentityType, as: "identity_type" }, { model : db.religion, as: "religions" }],
            },
            { model: MasterStudentStatus, as: "student_status" },
            { model: FinancialType, as: "financial_type" },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
          let new_data = JSON.parse(JSON.stringify(data));
          new_data.name = data.user
            ? data.user.name
            : null;
          new_data.teacher_name = data.teacher?.user_info
            ? data.teacher.user_info.first_name +
              (data.teacher.user_info.middle_name
                ? " " + data.teacher.user_info.middle_name + " "
                : " ") +
              data.teacher.user_info.last_name
            : null;
          new_data.departement_name = data.departement
            ? data.departement.name
            : null;
          new_data.faculty_name =
            data.departement && data.departement.faculty
              ? data.departement.faculty.name
              : null;
          new_data.study_type_name =
            data.departement && data.departement.study_type
              ? data.departement.study_type.name
              : null;
					new_data.studentData = data.user.student
          return res.status(200).json({ data: new_data });
      } catch (error) {
        console.log({ error });
        return res.status(500).json({ error });
      }
    } else {
      try {
        let condition = {};
        if (req.user && req.user.isTeacher)
          condition = {
            teacher_id: req.user.id,
          };
        const data = await Student.findAll({
          where: condition,
          include: [
            {
              model: Teacher,
              as: "teacher",
              include: [
                {
                  model: UserInfo,
                  as: "user_info",
                },
              ],
            },
            {
              model: Departement,
              as: "departement",
              include: [
                { model: Faculty, as: "faculty" },
                { model: MasterStudyType, as: "study_type" },
              ],
            },
            { model: User, as: "user" },
            {
              model: UserInfo,
              as: "user_info",
              include: [{ model: MasterIdentityType, as: "identity_type" }],
							where : options.expiredVisa ? { identity_type_id : 2 , expiredVisa : { [Op.lt] : new Date(new Date().setDate(new Date(options.expiredVisa).getDate() + 30)) } } : {}
            },
            { model: MasterStudentStatus, as: "student_status" },
            { model: FinancialType, as: "financial_type" },
          ],
        });
        if (data.length == 0)
          return res.status(404).json({ error: "Data not found", data });
        else {
          let result = JSON.parse(JSON.stringify(data));
          result.map((student) => {
            student.name = student.user_info
              ? student.user_info.first_name +
                (student.user_info.middle_name
                  ? " " + student.user_info.middle_name + " "
                  : " ") +
                student.user_info.last_name
              : null;
            student.citizen = student.user_info
              ? student.user_info.nationality
              : null;
            student.teacher_name =
              student.teacher && student.teacher.user_info
                ? student.teacher.user_info.first_name +
                  (student.teacher.user_info.middle_name
                    ? " " + student.teacher.user_info.middle_name + " "
                    : " ") +
                  student.teacher.user_info.last_name
                : null;
            student.departement_name = student.departement
              ? student.departement.name
              : null;
            student.faculty_name =
              student.departement && student.departement.faculty
                ? student.departement.faculty.name
                : null;
            student.study_type_name =
              student.departement && student.departement.study_type
                ? student.departement.study_type.name
                : null;
						student.status = student.student_status.name
						student.citizen = student.user_info ? student.user_info.nationality : ""
						student.student_program = student.financial_type ? student.financial_type.name : ""
						student.expiredVisa = student.user_info ? student.user_info.expiredVisa : ""
            return student;
          });
          return res.status(200).json({ data: result });
        }
      } catch (error) {
        console.log(`🚀 ~ file: student.js ~ line 248 ~ .get ~ error`, error)
        return res.status(500).json({ error });
      }
    }
  })
  .patch(async (req, res) => {
    const body = req.body;
    const id = body.id;
    if (!id) return res.status(400).json({ error: "Incomplete parameters" });
    // delete body.id;
    // UserServices.update(body, async function (err, data) {
    //   if(err)
    //     res.status(500).json({err})
    //   else {
    //     try {
    //       const data = await Student.update(body, {
    //         where: { id: id },
    //       });
    //       return res.status(200).json({ message: "success update data" });
    //     } catch (error) {
    //       return res.status(500).json({ error });
    //     }
    //   }
    // })
    try {
      await UserServices.update(body);
      const data = await Student.update(body, {
        where: { id: id },
      });
      return res.status(200).json({ message: "success update data" });
    } catch (error) {
      console.log(`🚀 ~ file: student.js ~ line 135 ~ .patch ~ error`, error);
      if(error.original)
        return res.status(500).end(error.original.toString());
      return res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    const body = req.body;
    if (!body.id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await Student.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
