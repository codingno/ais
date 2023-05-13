// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isStudent } from "./config/police";

const db = require("../../models");
const Departement = require("../../models/departement")(db.sequelize, DataTypes);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
const StudyType = require("../../models/masterStudyType")(db.sequelize, DataTypes);
const Teacher = require("../../models/teacher")(db.sequelize, DataTypes);
const User = require("../../models/user")(db.sequelize, DataTypes);
Departement.belongsTo(Faculty, { foreignKey: "faculty_id", as: "faculty" });
Faculty.hasMany(Departement, { foreignKey: "faculty_id" });
// StudyType.hasMany(Departement, { foreignKey: "study_type_id", as: "study_type" });
Departement.hasOne(StudyType, { sourceKey: 'study_type_id', foreignKey: 'id', as:"study_type" });
Departement.hasOne(Teacher, { foreignKey: "id", sourceKey: 'teacher_id', as: "teacher" });
Teacher.hasOne(User, {foreignKey:'id', sourceKey: 'user_id', as: "user"})
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  // .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.name || !body.faculty_id || !body.code)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await Departement.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.id) {
      try {
        const data = await Departement.findOne({
          where: { id: req.query.id },
          include: [ 
            {model: Faculty, as: "faculty"}, 
            {model: StudyType, as: 'study_type'}, 
            {model: Teacher, as: 'teacher', include : ['user']} 
        ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        let new_data = JSON.parse(JSON.stringify(data))
          new_data.teacher_name = data.teacher && data.teacher.user ? data.teacher.user.name : null
          new_data.study_type_name = data.study_type ? data.study_type.name : null
        return res.status(200).json({ data: new_data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const options = req.query || {}
        const data = await Departement.findAll({
          where : options,
          include: [
            {model: Faculty, as: "faculty"}, 
            {model: StudyType, as: "study_type" }, 
            {model: Teacher, as: "teacher", include: {model: User, as: "user"} }
          ]
        });
        if (data.length == 0)
          return res.status(404).json({ error: "Data not found", data });
        let new_data = JSON.parse(JSON.stringify(data))
        new_data.map((dt)=>{
          dt.teacher_name = dt.teacher && dt.teacher.user ? dt.teacher.user.name : null
          dt.study_type_name = dt.study_type ? dt.study_type.name : null
          return dt
        })
        return res.status(200).json({ data: new_data });
      } catch (error) {
        console.log({error});
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
      const data = await Departement.update(body, {
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
      const data = await Departement.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
