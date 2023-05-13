// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isStudent } from "./config/police";

const db = require("../../models");
const Curriculum = require("../../models/curriculum")(db.sequelize, DataTypes);
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
Curriculum.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(Curriculum, { foreignKey: "departement_id" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.departement_id || !body.name)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await Curriculum.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get( async (req, res) => {
    let condition = {}
    if(!req.user.isAdmin && req.user.departement_id)
      condition.departement_id = req.user.departement_id
    if (req.query.id) {
      condition.id = req.query.id
      try {
        const data = await Curriculum.findOne({
          where: condition,
          include: [
            { model: Departement, as: "departement" },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await Curriculum.findAll({
          where: condition,
          include: [
            { model: Departement, as: "departement" },
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
      const data = await Curriculum.update(body, {
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
      const data = await Curriculum.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
