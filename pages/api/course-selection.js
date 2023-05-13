// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isPublic } from "./config/police";

const db = require("../../models");
const CourseSelection = require("../../models/course_selection")(
  db.sequelize,
  DataTypes
);
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
const Student = require("../../models/student")(
  db.sequelize,
  DataTypes
);
const Course = require("../../models/course")(
  db.sequelize,
  DataTypes
);
const ClassType = require("../../models/masterClassType")(
  db.sequelize,
  DataTypes
);
const Teacher = require("../../models/teacher")(
  db.sequelize,
  DataTypes
);
CourseSelection.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(CourseSelection, { foreignKey: "departement_id" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)
CourseSelection.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});
Student.hasMany(CourseSelection, { foreignKey: "student_id" });

CourseSelection.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course",
});
Course.hasMany(CourseSelection, { foreignKey: "course_id" });

CourseSelection.belongsTo(ClassType, {
  foreignKey: "class_type_id",
  as: "class_type",
});
ClassType.hasMany(CourseSelection, { foreignKey: "class_type_id" });

CourseSelection.belongsTo(Teacher, {
  foreignKey: "teacher_id",
  as: "teacher",
});
Teacher.hasMany(CourseSelection, { foreignKey: "teacher_id" });

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.departement_id || !body.student_id || !body.course_id || !body.class_type_id || !body.teacher_id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await CourseSelection.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.id) {
      const condition = {id: req.query.id}
      if(req.user && req.user.departement_id)
        condition.departement_id = req.user.departement_id
      try {
        const data = await CourseSelection.findOne({
          where: condition,
          include: [
              { model: Departement, as: "departement" },
              { model: Student, as: "student" },
              { model: Course, as: "course" },
              { model: ClassType, as: "class_type" },
              { model: Teacher, as: "teacher" },
        ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      if(req.user && req.user.departement_id)
        condition.departement_id = req.user.departement_id
      try {
        const data = await CourseSelection.findAll(
          {where: condition},{
          include: [
              { model: Departement, as: "departement" },
              { model: Student, as: "student" },
              { model: Course, as: "course" },
              { model: ClassType, as: "class_type" },
              { model: Teacher, as: "teacher" },
            ],
        });
        if (data.length == 0)
          return res.status(404).json({ error: "Data not found", data });
        return res.status(200).json({ data });
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
    try {
      const data = await CourseSelection.update(body, {
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
      const data = await CourseSelection.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
