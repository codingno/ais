// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes, Op } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isPublic } from "./config/police";
import departement from "../../models/departement";

const db = require("../../models");
const AcademicKrs = require("../../models/academic_krs")(db.sequelize, DataTypes);
const Student = require("../../models/student")(db.sequelize, DataTypes);
const AcademicSchedule = require("../../models/academic_schedule")(db.sequelize, DataTypes);
const Course = require("../../models/course")(db.sequelize, DataTypes);
const Departement = require("../../models/departement")(db.sequelize, DataTypes);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
const Grade = require("../../models/masterGrade")(db.sequelize, DataTypes);
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
const User= require("../../models/userinfo")(
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
AcademicKrs.belongsTo(Student, {
  foreignKey: "student_number",
  targetKey: "student_number",
  as: "student",
});
Student.hasMany(AcademicKrs, { foreignKey: "student_number", sourceKey: "student_number" });
AcademicKrs.belongsTo(Grade, {
  foreignKey: "grade_id",
  targetKey: "id",
  as: "grade",
});
Grade.hasMany(AcademicKrs, { foreignKey: "grade_id", sourceKey: "id" });
AcademicKrs.belongsTo(AcademicSchedule, {
  foreignKey: "schedule_id",
  as: "schedule",
});
AcademicSchedule.hasMany(AcademicKrs, { foreignKey: "schedule_id" });
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
Teacher.hasMany(AcademicSchedule, { foreignKey: "teacher_id" });
AcademicSchedule.belongsTo(Teacher, {
  foreignKey: "teacher_2_id",
  as: "teacher2",
});
Teacher.hasMany(AcademicSchedule, { foreignKey: "teacher_2_id" });
Teacher.hasOne(UserInfo, { foreignKey: "user_id", sourceKey:'user_id' });
Student.hasOne(UserInfo, { foreignKey: "user_id", sourceKey:'user_id' });
Student.hasOne(User, { foreignKey: "user_id", sourceKey:'user_id' });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.length > 0)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
			for (let index = 0; index < body.length; index++) {
				const preparedData = body[index]
				preparedData.student_number = req.user.student_number
				preparedData.semester = req.user.semester_active
				const check = await AcademicKrs.findOne({ where : preparedData });
				if(check)
					await AcademicKrs.update(preparedData, { where : { id : check.id }});
				else 
					await AcademicKrs.create(preparedData);
			}
      return res.status(200).json({ message : 'ok' });
    } catch (error) {
      console.log(`🚀 ~ file: academic-krs.js ~ line 92 ~ .post ~ error`, error)
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    let condition = {}
    if (req.query.id) {
      condition.id = req.query.id
      try {
        const data = await AcademicKrs.findOne({
          where: condition,
          include: [
            { model: AcademicSchedule, as: "schedule", 
							include: [
								{ model: Course, as: "course" },
								{ model: Departement, as: "departement" },
								{ model: Room, as: "room" },
								{ model: Teacher, as: "teacher",
									include: [
										{ model: UserInfo, as: "user_info" },
									],
								},
								{ model: Day, as: "day" },
							],
            },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
          let new_data = JSON.parse(JSON.stringify(data))
					new_data.name = data.schedule.course.name
					new_data.schedule.name = data.schedule.course.name
					new_data.schedule.credits = data.schedule.course.credits
					new_data.schedule.teacher_name = data.schedule.teacher.user_info.first_name + ' ' + data.schedule.teacher.user_info.middle_name + ' ' + data.schedule.teacher.user_info.last_name
					new_data.schedule.day_name = data.schedule.day.name
					new_data.schedule.room_name = data.schedule.room.name

        return res.status(200).json({ data: new_data }).end();
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
			if(!req.user.isAdmin && req.user.student_number) {
				condition.student_number = req.user.student_number
				condition.semester = req.user.semester_active
        console.log(`🚀 ~ file: academic-krs.js ~ line 148 ~ .get ~ condition`, condition)
			}
			if(req.query)
				condition = { ...condition, ...req.query}
			let teacherCondition = {}, departementCondition = {}
      let teacher_id = req.user.teacherData?.id
			if(!req.user.isAdmin && req.user.isTeacher) {
        // if(req.user.teacherData?.id !== req.user.teacherData?.departement.teacher_id)
        if(teacher_id == req.user.teacherData?.departement.teacher_id)
          departementCondition.id = req.user.teacherData?.departement.id
        else 
          teacherCondition = {
            [Op.or] : [
              { teacher_id },
              // { teacher_2_id : teacher_id },
              // { teacher_3_id : teacher_id },
              // { teacher_4_id : teacher_id },
            ]
          }
          // return res.status(200).json({ data : [] });
				// teacherCondition.id = req.user.teacherData.id
      }
      console.log(`🚀 ~ file: academic-krs.js ~ line 134 ~ .get ~ teacherCondition`, teacherCondition, departementCondition)
      try {
        console.log(`🚀 ~ file: academic-krs.js ~ line 63 ~ .get ~ condition`, condition)
        let result = await AcademicKrs.findAll({
          where: condition,
          include: [
            { model: AcademicSchedule, as: "schedule",
              where : teacherCondition,
							include: [
								{ model: Course, as: "course" },
								{ model: Departement, as: "departement", where : departementCondition },
								{ model: Room, as: "room" },
								{ model: Teacher, as: "teacher",
									// where : teacherCondition,
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
						},
						{ model: Student, as: "student",
							include: [
								{ model: UserInfo, as: "user_info" },
								// { model: User, as: "user" },
							],
						},
						{ model: Grade, as: "grade"},
          ],
        });
        if (result.length == 0)
          return res.status(404).json({ error: "Data not found", result });
				let data = JSON.parse(JSON.stringify(result))
				data = data.filter(item => item.schedule !== null)
        console.log(`🚀 ~ file: academic-krs.js ~ line 168 ~ .get ~ data`, data.length)
				data.map(item => {
					item.name = item.schedule.course.name
					item.schedule.name = item.schedule.course.name
					item.schedule.credits = item.schedule.course.credits
					item.schedule.teacher_name = item.schedule.teacher.user_info.first_name + ' ' + item.schedule.teacher.user_info.middle_name + ' ' + item.schedule.teacher.user_info.last_name
					item.teacher_name = item.schedule.teacher.user_info.first_name + ' ' + item.schedule.teacher.user_info.middle_name + ' ' + item.schedule.teacher.user_info.last_name
					item.teacher_2_name = item.schedule.teacher2?.user_info ? item.schedule.teacher2.user_info.first_name + ' ' + item.schedule.teacher2.user_info.middle_name + ' ' + item.schedule.teacher2.user_info.last_name : ""
					item.schedule.day_name = item.schedule.day.name
					item.schedule.room_name = item.schedule.room.name
					item.schedule.student_name = item.student.user_info.first_name + ' ' + item.student.user_info.middle_name + ' ' + item.student.user_info.last_name
					item.student_name = item.student.user_info.first_name + ' ' + item.student.user_info.middle_name + ' ' + item.student.user_info.last_name
					item.grade_value = item.grade ? item.grade.grade : ""
					item.grade_point = item.grade ? item.grade.point : ""
				})
        return res.status(200).json({ data });
      } catch (error) {
        console.log(`🚀 ~ file: academic-krs.js ~ line 76 ~ .get ~ error`, error)
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
      const data = await AcademicKrs.update(body, {
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
      const data = await AcademicKrs.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
