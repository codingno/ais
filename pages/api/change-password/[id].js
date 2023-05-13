import nextConnect from "next-connect";
import { isLogin, isPublic } from "../config/police";

const bcrypt = require("bcrypt");
const db = require("../../../models");
const UserSecret = db.user_secret;

export default nextConnect()
  .use(isPublic)
  .post(async (req, res) => {
    if (
      !req.body.new_password ||
      !req.body.confirm_password ||
      !req.body.old_password
    )
      res
        .status(400)
        .json({
          message:
            "Please input old password, new password, and confirm password",
        });
    if (req.body.new_password !== req.body.confirm_password)
      res
        .status(400)
        .json({ message: "New password and confirm password not matched" });
    else {
      try {
        console.log("🚀 ~ file: [id].js ~ line 30 ~ .post ~ req.query", req.query)
        const user_secret = await UserSecret.findOne({
          where: { user_id: req.query.id },
        });
        if (!user_secret)
          return res.status(400).json({ message: "User id not valid" });
        console.log("🚀 ~ file: [id].js ~ line 35 ~ .post ~ req.body.old_password", req.body.old_password)
        console.log("🚀 ~ file: [id].js ~ line 37 ~ .post ~ user_secret.pass", user_secret.pass)
        const allowed = await bcrypt.compare(
          req.body.old_password,
          user_secret.pass
        );
        console.log("🚀 ~ file: [id].js ~ line 37 ~ .post ~ allowed", allowed)
        if (allowed) {
          const hashed = await bcrypt.hash(req.body.new_password, 10);
          const update_user_secret = await UserSecret.update(
            { pass: hashed },
            {  
              where: { user_id: req.query.id },
            }
          );
          if (update_user_secret) {
            res.status(200).json({ message: "Success reset password" });
          } else {
            res.status(400).json({ message: "Failed reset password" });
          }
        } else res.status(400).json({ message: "Your password not matched" });
      } catch (err) {
        console.log({ err });
        res.status(500).json({ message: "System error" });
      }
    }
  });
