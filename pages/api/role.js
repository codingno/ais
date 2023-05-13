// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect"; 

const db = require("../../models");
const Role = require("../../models/role")(
  db.sequelize,
  DataTypes
);

import apiMasterHandler from "../../utils/api-master-handler";

export default apiMasterHandler(Role)
