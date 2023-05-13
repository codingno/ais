import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isStudent, isAdmin } from "./config/police";
import StudentService from "../../services/StudentService";
import bcrypt from "bcrypt";
import { sendEmailStudentAdmission } from "../../services/emailService";
const uuidv4 = require("uuid").v4;
const db = require("../../models");
// const StudentService = require("../../services/StudentService");
const User = require("../../models/user")(db.sequelize, DataTypes);
const Role = require("../../models/role")(db.sequelize, DataTypes);
const UserInfo = require("../../models/userinfo")(db.sequelize, DataTypes);
const UserSecret = require("../../models/usersecret")(db.sequelize, DataTypes);
const Student = require("../../models/student")(db.sequelize, DataTypes);
const MasterStudyType = require("../../models/masterStudyType")(
  db.sequelize,
  DataTypes
);
const StudentTemp = require("../../models/srudent_temp")(
  db.sequelize,
  DataTypes
);
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
StudentTemp.belongsTo(Departement, {
  foreignKey: "departement",
  as: "departement_data",
});
Departement.belongsTo(Faculty, { foreignKey: "faculty_id", as: "faculty" });
Departement.belongsTo(MasterStudyType, {
  foreignKey: "study_type_id",
  as: "study_type",
});

export default nextConnect()
    .use(isAdmin)
  .get(async (req, res) => {
    try {
      const data = await StudentTemp.findAll({
        where: { generate: false },
        include: [
          {
            model: Departement,
            as: "departement_data",
            include: [
              {
                model: Faculty,
                as: "faculty",
              },
              { model: MasterStudyType, as: "study_type" },
            ],
          },
        ],
      });
      // return res.status(400).json({data})
      const role = await Role.findOne({ where: { name: "Student" } });
      if (data.length == 0)
        return res.status(404).json({ error: "Data not found", data });
      // else {
      let i = 0;
      let data_user = {};
      let data_user_info = {};
      let data_user_secret = {};
      let data_student = {};
      while (i < data.length) {
        data_user = {
          id: uuidv4(),
          name: data[i].name,
          email: data[i].email || null,
          email_verified: new Date(),
          image: null,
          role_id: role.id,
        };
        const user = await User.create(data_user);
        const name = data[i].name.split(" ");
        const first_name = name[0];
        const middle_name = name.length > 2 ? name[1] : "";
        const last_name =
          name.length > 1
            ? name.filter((word) => word != first_name && word != middle_name).join(" ")
            : "";
        data_user_info = {
          user_id: user.id,
          first_name: first_name || "",
          middle_name: middle_name || "",
          last_name: last_name || "",
          place_of_birth: data[i].place_of_birth || "",
          date_of_birth: data[i].date_of_birth
            ? new Date(data[i].date_of_birth)
            : new Date(),
          gender: data[i].gender || 1,
          identity_id: data[i].identity_id || 0,
          nationality: data[i].nationality || null,
          religion: data[i].religion || null,
          identity_type_id: data[i].identity_type_id || 1,
          role_id: role.id,
        };
        const user_info = await UserInfo.create(data_user_info);
        const student_number = await StudentService.generate(data[i]);
        // console.log({student_number});
        const hashed = student_number
          ? await bcrypt.hash(student_number, 10)
          : await bcrypt.hash("123456", 10);
        const dateNow = new Date()
        const hour = dateNow.getHours()
          data_user_secret = {
          user_id: user.id,
          pass: hashed,
          username: student_number,
          email: data[i].email,
          email_token: data[i].email_token || "",
          email_token_expired: data[i].email_token_expired || new Date(),
          reset_pass_token: data[i].reset_pass_token || "",
          reset_pass_expired: data[i].reset_pass_expire
            ? new Date(data[i].reset_pass_expired)
            : new Date(dateNow.setHours(hour + 1)),
        };
        const user_secret = await UserSecret.create(data_user_secret);
        // callback(null, user.id);
        data_student = {
          user_id: user.id,
          student_number: student_number,
          entry_year: data[i].entry_year,
          // entry_semester: data[i].entry_semester || 1,
          // entry_status: data[i].entry_status || null,
          departement_id: data[i].departement || null,
          financial_type_id: data[i].financial_type_id,
          // status: data[i].status || null,
          mother_name: data[i].mother_name || "",
          father_name: data[i].father_name || "",
          father_income: data[i].father_income || null,
          mother_income: data[i].mother_income || null,
          school_name: data[i].school_name || null,
          school_telp: data[i].school_telp || null,
          school_address: data[i].school_address || null,
          school_departement: data[i].school_departement || "",
          school_end: data[i].school_end || null,
          campus_name: data[i].campus_name || null,
          campus_telp: data[i].campus_telp || null,
          campus_address: data[i].campus_address || null,
          campus_departement: data[i].campus_departement || null,
          campus_end: data[i].campus_end || null,
          institution_name: data[i].institution_name || null,
          institution_telp: data[i].institution_telp || null,
          institution_address: data[i].institution_address || null,
          institution_start: data[i].institution_start || null,
          institution_end: data[i].institution_end || null,
          semester_active: data[i].semester_active || 1,
        };
        const new_student = await Student.create(data_student);
        const update_data = await StudentTemp.update(
          { generate: true },
          { where: { id: data[i].id } }
        );
        // const sendEmail = await sendEmailStudentAdmission(data[i], student_number)
        if (i == data.length - 1)
          return res.status(200).json({ message: "success to generate" });
        i += 1;
      }
      // }
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ error });
    }
  });
