// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import UserServices from "../../services/UserServices";
import { isLogin, isStudent } from "./config/police";
import { te } from "date-fns/locale";

const db = require("../../models");
const Teacher = require("../../models/teacher")(db.sequelize, DataTypes);
const User = require("../../models/user")(db.sequelize, DataTypes);
const UserInfo = require("../../models/userinfo")(db.sequelize, DataTypes);
const MasterIdentityType = require("../../models/masterIdentityType")(db.sequelize, DataTypes)
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
const MasterTeacherStatus = require("../../models/masterTeacherStatus")(
  db.sequelize,
  DataTypes
);
Teacher.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
Departement.hasMany(Teacher, { foreignKey: "departement_id" });
Departement.belongsTo(Faculty, { foreignKey: "faculty_id", as: "faculty" });
Teacher.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Teacher, { foreignKey: "user_id" });
Teacher.belongsTo(UserInfo, {
  foreignKey: "user_id",
  as: "user_info",
  targetKey: "user_id",
});
UserInfo.hasMany(Teacher, { foreignKey: "user_id", sourceKey: "user_id" });
Teacher.belongsTo(MasterTeacherStatus, {
  foreignKey: "status",
  as: "teacher_status",
});
UserInfo.belongsTo(MasterIdentityType, { foreignKey : "identity_type_id", as : "identity_type"})
MasterIdentityType.hasMany(UserInfo, { foreignKey: "identity_type_id", sourceKey: "id",  });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  // .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    try {
      const user_id = await UserServices.create(body);
      const data_teacher = {
        user_id: user_id,
        ein: body.ein,
        nidn_code: body.nidn_code,
        title: body.title,
        departement_id: body.departement_id,
        marriage_status: body.marriage_status || 2,
        status: body.status,
      };
      const data = await Teacher.create(data_teacher);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.id) {
      try {
        const data = await Teacher.findOne({
          where: { id: req.query.id },
          include: [
            {
              model: Departement,
              as: "departement",
              include: [{ model: Faculty, as: "faculty" }],
            },
            { model: User, as: "user" },
            {
              model: UserInfo,
              as: "user_info",
              include: [{ model: MasterIdentityType, as: "identity_type" }],
            },
            { model: MasterTeacherStatus, as: "teacher_status" },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        if (data) {
          let new_data = JSON.parse(JSON.stringify(data));
          new_data.name = data.user_info
            ? data.user_info.first_name +
              (data.user_info.middle_name
                ? " " + data.user_info.middle_name + " "
                : " ") +
              data.user_info.last_name
            : "";
          new_data.citizen = data.user_info
            ? data.user_info.nationality
            : "";
          new_data.departement_name = data.departement
            ? data.departement.name
            : "";
          new_data.faculty_name =
            data.departement && data.departement.faculty
              ? data.departement.faculty.name
              : "";
          return res.status(200).json({ data: new_data });
        }
      } catch (error) {
        console.log({error});
        return res.status(500).json({ error });
      }
    } else {
      try {
        const options = req.query || {}
        const { departement_id, faculty_id } = options
        const data = await Teacher.findAll({
          where : departement_id ? { departement_id} : {},
          include: [
            {
              model: Departement,
              as: "departement",
              where : faculty_id ? {faculty_id} : {},
              include: [{ model: Faculty, as: "faculty",
            }],
            },
            { model: User, as: "user" },
            { model: UserInfo, as: "user_info" },
            { model: MasterTeacherStatus, as: "teacher_status" },
          ],
        });
        if (data.length == 0)
          return res.status(404).json({ error: "Data not found", data });
        else {
          let result = JSON.parse(JSON.stringify(data));
          result.map((teacher) => {
            teacher.name = teacher.user_info
              ? teacher.user_info.first_name +
                (teacher.user_info.middle_name
                  ? " " + teacher.user_info.middle_name + " "
                  : " ") +
                teacher.user_info.last_name
              : "";
            teacher.name = teacher.user_info
              ? teacher.user_info.nationality 
              : "";
            teacher.departement_name = teacher.departement
              ? teacher.departement.name
              : "";
            teacher.faculty_name =
              teacher.departement && teacher.departement.faculty
                ? teacher.departement.faculty.name
                : "";
						teacher.nidn = teacher.nidn_code
						teacher.citizen = teacher.user_info ? teacher.user_info.nationality : ""
						teacher.status = teacher.teacher_status.name
						teacher.employment_name = ""
            return teacher;
          });
          return res.status(200).json({ data: result });
        }
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  })
  .patch(async (req, res) => {
    const body = req.body;
    const id = body.id;
    if (!id) return res.status(400).json({ error: "Incomplete parameters" });
    delete body.id;
    // UserServices.update(body, async function (err, data) {
    //   if(err)
    //     res.status(500).json({err})
    //   else {
    //     try {
    //       const data = await Teacher.update(body, {
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
      const data = await Teacher.update(body, {
        where: { id: id },
      });
      return res.status(200).json({ message: "success update data" });
    } catch (error) {
      console.log(`🚀 ~ file: student.js ~ line 135 ~ .patch ~ error`, error);
      return res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    const body = req.body;
    if (!body.id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await Teacher.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
