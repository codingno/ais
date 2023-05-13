// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect"; 

const db = require("../../models");
const MasterStudentStatus = require("../../models/masterStudentStatus")(
  db.sequelize,
  DataTypes
);

// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)
import apiMasterHandler from "../../utils/api-master-handler";

export default apiMasterHandler(MasterStudentStatus)