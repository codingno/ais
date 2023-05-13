// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin } from "./config/police";

const db = require("../../models");
const College = require("../../models/college")(db.sequelize, DataTypes);

// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
.use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (
      !body.name ||
      !body.pt_code ||
      !body.code ||
      !body.address_1 ||
      !body.city ||
      !body.post_code ||
      !body.phone ||
      !body.fax ||
      !body.decision_letter ||
      !body.since ||
      !body.email ||
      !body.site ||
      !body.pt_start_date
    )
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await College.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.id) {
      try {
        const data = await College.findOne({
          where: { id: req.query.id },
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await College.findAll();
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
      const data = await College.update(body, {
        where: { id: id },
      });
      return res.status(200).json({ message: "success update class type" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    const body = req.body;
    if (!body.id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await College.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
