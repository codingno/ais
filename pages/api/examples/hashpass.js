// This is an example of how to read a JSON Web Token from an API route
import { getToken } from 'next-auth/jwt'
import bcrypt from 'bcrypt'
import { UUIDV4, DataTypes } from 'sequelize'

const db = require('../../../models')
const User = require("../../../models/user")(db.sequelize, DataTypes);

// console.log(`🚀 ~ file: hashpass.js ~ line 14 ~ db`, db)
// const User = require("../../../models/user")();
// console.log(`🚀 ~ file: hashpass.js ~ line 7 ~ db`, db)
import { v4 as uuidv4, parse as uuidParse } from 'uuid';

const secret = process.env.SECRET

export default async (req, res) => {
	const hashed = await bcrypt.hash('secretkeyforhashed', 10)
	// const testing = await db.User.findAll()
  // console.log(`🚀 ~ file: hashpass.js ~ line 16 ~ testing`, testing)
	const userData = {
		// id : uuidv4(),
		name : 'username',
		email : 'user@mail.com',
	}
  console.log(`🚀 ~ file: hashpass.js ~ line 20 ~ userData`, userData)
	let user
	try {
		user = await User.findOne({where : userData})
	} catch (error) {
      console.log(`🚀 ~ file: hashpass.js ~ line 27 ~ error`, error)
			
	}
  console.log(`🚀 ~ file: hashpass.js ~ line 18 ~ user`, user)
  const token = await getToken({ req, secret })
  res.send(JSON.stringify({...token, hashed}, null, 2))
}