import nextConnect from "next-connect";
import { isLogin, isPublic } from "./config/police";
import { sendEmailForgotPass } from "../../services/emailService";

const db = require("../../models");
const User = db.user;
const UserSecret = db.user_secret;
UserSecret.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
User.hasOne(UserSecret, { foreignKey: "user_id" });
var crypto = require("crypto");

export default nextConnect()
  .use(isPublic)
  .post(async (req, res) => {
    if (!req.body.email)
      res.status(400).json({ message: "Please input your email" });
    else {
      try {
        const user = await User.findOne({
          where: { email: req.body.email },
          include: UserSecret,
        });
        if (user) {
          crypto.randomBytes(16, async function (err, buffer) {
            var token = buffer.toString("hex");
            var expiredDate = new Date();

            expiredDate.setHours(expiredDate.getHours() + 24);
            let data = {};
            data.reset_pass_token = token;
            data.reset_pass_expired = expiredDate;

            const update_user_secret = await UserSecret.update(data, {
              where: { id: user.user_secret.id },
            });
            if (update_user_secret) {
              sendEmailForgotPass(
                req.body.email,
                data.reset_pass_token,
                function (err, data) {
                  if (err) {
                    res
                      .status(400)
                      .json({ message: "failed send email reset password" });
                  } else
                    res
                      .status(200)
                      .send({ message: "success send email reset password" });
                }
              );
            }
          });
        } else {
          res.status(400).json({ message: "your email not registered" });
        }
      } catch (error) {
        res.status(500).json({ message: "failed send email reset password" });
      }
    }
  });
