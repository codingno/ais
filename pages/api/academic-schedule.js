// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes, Op } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isPublic } from "./config/police";

const db = require("../../models");
const AcademicSchedule = require("../../models/academic_schedule")(db.sequelize, DataTypes);
const Departement = require("../../models/departement")(db.sequelize, DataTypes);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
const Course = require("../../models/course")(db.sequelize, DataTypes);
const Day = require("../../models/day")(
  db.sequelize,
  DataTypes
);
const Room = require("../../models/room")(
  db.sequelize,
  DataTypes
);
const Teacher = require("../../models/teacher")(
  db.sequelize,
  DataTypes
);
const UserInfo = require("../../models/userinfo")(
  db.sequelize,
  DataTypes
);
AcademicSchedule.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(AcademicSchedule, { foreignKey: "departement_id" });
Departement.belongsTo(Faculty, {
  foreignKey: "faculty_id",
  as: "faculty",
});
AcademicSchedule.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course",
});
Course.hasMany(AcademicSchedule, { foreignKey: "course_id" });
AcademicSchedule.belongsTo(Day, {
  foreignKey: "day_id",
  as: "day",
});
Day.hasMany(AcademicSchedule, { foreignKey: "day_id" });
AcademicSchedule.belongsTo(Room, {
  foreignKey: "room_id",
  as: "room",
});
Room.hasMany(AcademicSchedule, { foreignKey: "room_id" });
AcademicSchedule.belongsTo(Teacher, {
  foreignKey: "teacher_id",
  as: "teacher",
});
AcademicSchedule.belongsTo(Teacher, {
  foreignKey: "teacher_2_id",
  as: "teacher2",
});
Teacher.hasMany(AcademicSchedule, { foreignKey: "teacher_id" });
Teacher.hasMany(AcademicSchedule, { foreignKey: "teacher_2_id" });
Teacher.hasOne(UserInfo, { foreignKey: "user_id", sourceKey:'user_id' });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.course_id || !body.departement_id || !body.teacher_id || !body.semester || !body.academic_year_id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await AcademicSchedule.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    let attributes = Object.keys(db.academic_schedule.rawAttributes)
    let queryAttributes = attributes.reduce((a,b) => req.query[b] ? ({...a,[b] : req.query[b]}) : a, {})
    console.log(`🚀 ~ file: academic-schedule.js ~ line 80 ~ .get ~ attributes`, attributes)
    console.log("🚀 ~ file: academic-schedule.js ~ line 80 ~ .get ~ queryAttributes", queryAttributes)
    let condition = {...queryAttributes} 
    let isBOD = req.user.role_id == parseInt(process.env.NEXT_PUBLIC_BOD_ROLE)
    console.log("🚀 ~ file: academic-schedule.js ~ line 80 ~ .get ~ isBOD", isBOD)
    if(!req.user.isAdmin && req.user.departement_id && !isBOD)
      condition.departement_id = req.user.departement_id
    let teacher_id = req.user.teacherData?.id
    if(teacher_id != req.user.teacherData?.departement?.teacher_id && !isBOD)
      condition = {
        ...condition,
        [Op.or] : [
          { teacher_id },
          { teacher_id : { $eq : teacher_id } },
          { teacher_2_id : { $eq : teacher_id } },
          { teacher_3_id : { $eq : teacher_id } },
          { teacher_4_id : { $eq : teacher_id } },
        ]
      }
    console.log("🚀 ~ file: academic-schedule.js ~ line 96 ~ .get ~ condition", condition)
    if (req.query.id) {
      condition.id = req.query.id
      try {
        const data = await AcademicSchedule.findOne({
          where: condition,
          include: [
            { model: Course, as: "course" },
            { model: Departement, as: "departement" },
            { model: Room, as: "room" },
            { model: Teacher, as: "teacher",
							include: [
            		{ model: UserInfo, as: "user_info" },
							],
						},
            { model: Teacher, as: "teacher2",
							include: [
            		{ model: UserInfo, as: "user_info" },
							],
						},
            { model: Day, as: "day" },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        let new_data = JSON.parse(JSON.stringify(data))
          new_data.name = data.course.name
					new_data.credits = data.course.credits
					new_data.teacher_name = data.teacher?.user_info ? (data.teacher.user_info.first_name + ' ' + data.teacher.user_info.middle_name + ' ' + data.teacher.user_info.last_name) : ''
					new_data.teacher_2_name = data.teacher2?.user_info ? (data.teacher2.user_info.first_name + ' ' + data.teacher2.user_info.middle_name + ' ' + data.teacher2.user_info.last_name) : ''
					new_data.day_name = data.day.name
					new_data.room_name = data.room.name
          new_data.course_code = data.course.code
          new_data.departement_name = data.departement.name

        return res.status(200).json({ data });
      } catch (error) {
        console.log("🚀 ~ file: academic-schedule.js ~ line 118 ~ .get ~ error", error)
        return res.status(500).json({ error });
      }
    } else {
      try {
        const preparedData = await AcademicSchedule.findAll({
          where: condition,
          include: [
            { model: Course, as: "course" },
            { model: Departement, as: "departement" },
            { model: Room, as: "room" },
            { model: Teacher, as: "teacher",
							include: [
            		{ model: UserInfo, as: "user_info" },
							],
						},
            { model: Teacher, as: "teacher2",
							include: [
            		{ model: UserInfo, as: "user_info" },
							],
						},
            { model: Day, as: "day" },
          ],
        });
        if (preparedData.length == 0)
          return res.status(404).json({ error: "Data not found", data : [] });
				let data = JSON.parse(JSON.stringify(preparedData))
				data.map(item => {
					item.name = item.course.name
					item.credits = item.course.credits
					// item.teacher_name = item.teacher?.user_info.first_name + ' ' + item.teacher?.user_info.middle_name + ' ' + item.teacher?.user_info.last_name
					item.teacher_name = item.teacher?.user_info ? item.teacher?.user_info.first_name + ' ' + item.teacher?.user_info.middle_name + ' ' + item.teacher?.user_info.last_name : ""
					item.teacher_2_name = item.teacher2?.user_info ? item.teacher2?.user_info.first_name + ' ' + item.teacher2?.user_info.middle_name + ' ' + item.teacher2?.user_info.last_name : ""
					item.day_name = item.day.name
					item.room_name = item.room.name
          item.course_code = item.course.code,
          item.departement_name = item.departement.name
				}) 
        // console.log(`🚀 ~ file: academic-schedule.js ~ line 135 ~ .get ~ data`, data)
        return res.status(200).json({ data });
      } catch (error) {
        console.log("🚀 ~ file: academic-schedule.js ~ line 148 ~ .get ~ error", error)
        return res.status(500).json({ error });
      }
    }
  })
  .patch(async (req, res) => {
    const body = req.body;
    const id = body.id;
    if (!id) return res.status(400).json({ error: "Incomplete parameters" });
    delete body.id;
    try {
      const data = await AcademicSchedule.update(body, {
        where: { id: id },
      });
      return res.status(200).json({ message: "success update data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    const body = req.body;
    if (!body.id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await AcademicSchedule.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
