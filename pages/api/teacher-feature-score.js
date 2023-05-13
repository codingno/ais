import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isStudent, isAdmin } from "./config/police";

const db = require("../../models");
const TeacherScoring = require("../../models/dataTeacherScoring")(
  db.sequelize,
  DataTypes
);

export default nextConnect()
  .use(isLogin)
  .post(isAdmin, async (req, res) => {
    let body = req.body;
    console.log(body);
    if (!body)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      body.user_id = req.user.id;
      const data = await TeacherScoring.bulkCreate(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.teacher_id) {
      try {
        const data = await TeacherScoring.findAll({
          where: { teacher_id: req.query.teacher_id },
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await TeacherScoring.findAll();
        if (data.length == 0)
          return res.status(404).json({ error: "Data not found", data });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  })
  .patch(isAdmin, async (req, res) => {
    const body = req.body;
    const id = body.id;
    if (!id) return res.status(400).json({ error: "Incomplete parameters" });
    delete body.id;
    try {
      const data = await TeacherScoring.update(body, {
        where: { id: id },
      });
      return res.status(200).json({ message: "success update data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .delete(isAdmin, async (req, res) => {
    const body = req.body;
    if (!body.id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await TeacherScoring.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
