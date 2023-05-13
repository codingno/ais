import { UUIDV4, DataTypes } from "sequelize";
import { v4 as uuidv4, parse as uuidParse } from "uuid";
const db = require("../models");
const User = require("../models/user")(db.sequelize, DataTypes);
const UserInfo = require("../models/userinfo")(db.sequelize, DataTypes);
const UserSecret = require("../models/usersecret")(db.sequelize, DataTypes);

import bcrypt from 'bcrypt'

export default {
  create: async function (data) {
    return new Promise(async (resolve, reject) => {
      const data_user = {
        id: uuidv4(),
        name:
          data.first_name +
          (data.middle_name ? " " + data.middle_name : "") +
          (data.last_name ? " " + data.last_name : ""),
        email: data.email || null,
        email_verified: new Date(),
        image: data.image || null,
				role_id: data.role_id,
      };
      try {
        const username = data.username
        const email = data.email
        const existing_user = await UserSecret.findOne({ where : { [db.Sequelize.Op.or] : [{username}, {email}] }} )
        if ( existing_user ) {
          if ( existing_user.email == email && existing_user.username == username)
            throw Error("Username or email already exists")
          if ( existing_user.email == email)
            throw Error("Email already exists")
          if (existing_user.username == username)
            throw Error("Username already exists")
        }

        const user = await User.create(data_user);
        const data_user_info = {
          user_id: user.id,
          first_name: data.first_name || "",
          middle_name: data.middle_name || "",
          last_name: data.last_name || "",
          place_of_birth: data.place_of_birth,
          date_of_birth: new Date(data.date_of_birth),
          gender: data.gender || 1,
          identity_id: data.identity_id || null,
          religion: data.religion || null,
          identity_type_id: data.identity_type_id || null,
					role_id: data.role_id,
        };
        const user_info = await UserInfo.create(data_user_info);
        const hashed = data.password ? await bcrypt.hash(data.password, 10) : await bcrypt.hash('123456', 10)
        const dateNow = new Date()
        const hour = dateNow.getHours()
        const data_user_secret = {
          user_id: user.id,
          pass: hashed,
          username: data.username || data.first_name + data.middle_name + data.last_name,
          email: data.email,
          email_token: data.email_token || '',
          email_token_expired: data.email_token_expired || new Date(),
          reset_pass_token: data.reset_pass_token || '',
          reset_pass_expired: data.reset_pass_expire ? new Date(data.reset_pass_expired) : new Date(dateNow.setHours(hour + 1)),
        };
        const user_secret = await UserSecret.create(data_user_secret);
        // callback(null, user.id);
        resolve(user.id);
      } catch (error) {
        reject(error);
        // callback(error);
      }
    });
  },
  update: async function (data) {
    console.log(`🚀 ~ file: UserServices.js ~ line 12 ~ data`, data.image)
    return new Promise(async (resolve, reject) => {
    const user_id = data.user.id;
    const data_user = data.user;
    delete data_user.id;
    delete data_user.email_verified;
    try {
      const user = await User.update(data_user, { where: { id: user_id } });
      const data_user_info = data.user_info;
      delete data_user_info.id;
      // delete data_user_info.user_id;
      const user_info = await UserInfo.update(data_user_info, { where : { user_id : data.user_info.user_id}});
			resolve(user.id);
		} catch (error) {
			reject(error);
    }
    });
  },
};
