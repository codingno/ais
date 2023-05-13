import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isStudent } from "./config/police";
import { useSession, getSession } from "next-auth/react"

const db = require("../../models");
const Portfolio = require("../../models/dataPortfolio")(db.sequelize, DataTypes);
const PortfolioType = require("../../models/masterPortfolio")(db.sequelize, DataTypes);
const UserInfo = require("../../models/userinfo")(db.sequelize, DataTypes);
const User = require("../../models/user")(db.sequelize, DataTypes);
Portfolio.belongsTo(UserInfo, { foreignKey: "user_id", targetKey: "user_id", as: "user_info" });
Portfolio.belongsTo(User, { foreignKey: "user_id", as: "user" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  // .use(isLogin)
  .post(async (req, res) => {
    let body = req.body;
		const session  = await getSession({req});
    if (!body.portfolio_id || !body.url)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      body.user_id = session.user.userID
      const data = await Portfolio.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
		const session  = await getSession({req});
    if (req.query.id) {
      try {
        const data = await Portfolio.findOne({
          where: { id: req.query.id },
          include: [
						{
							model: User,
							as: "user",
          	},
						{
							model: UserInfo,
							as: "user_info",
          	},
					],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
				const user_id = session.user.role_id !== 1 && session.user.role_id !== 5 ? { user_id : session.user.userID} : {}
        const preparedData = await Portfolio.findAll({
					where : { ...req.query, ...user_id },
          include: [
						{
							model: User,
							as: "user",
          	},
						{
							model: UserInfo,
							as: "user_info",
          	},
					],
        });
				let data = JSON.parse(JSON.stringify(preparedData))
        if (data.length == 0)
          return res.status(404).json({ error: "Data not found", data });
				data.map(item => {
				// if(item.user.role_id !== 1 || item.user.role_id !== 5)
				//   item.user_name = `${item.user_info.first_name} ${item.user_info.middle_name} ${item.user_info.last_name}`
				// else
				//   item.user_name = ""
				item.user_name = item?.user?.name??""
				}
				)
        return res.status(200).json({ data });
      } catch (error) {
        console.log(`🚀 ~ file: portfolio.js ~ line 57 ~ .get ~ error`, error)
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
      const data = await Portfolio.update(body, {
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
      const data = await Portfolio.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
