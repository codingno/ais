// This is an example of how to read a JSON Web Token from an API route
import { getToken } from 'next-auth/jwt'
import apiHandler from '../../utils/api-handler';
import UserServices from '../../services/UserServices'

const secret = process.env.SECRET

const db = require('../../models')
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default async (req, res) => {
  const token = await getToken({ req, secret })
  // res.send(JSON.stringify(token, null, 2))
	apiHandler(res, req.method, {
    POST: async (response) => {
      // const body = req.body;
      // try {
      //   const user_id = await UserServices.create(body);
      //   return res.status(200).json({ user_id });
      // } catch (error) {
      //   return res.status(500).json({ error });
      // }
      // models.User.create({ name }, (error, user) => {
      //   if (error) {
      //     connection.close();
      //     response.status(500).json({ error });
      //   } else {
      //     response.status(200).json(user);
      //     connection.close();
      //   }
      // });
    },
		GET: (response) => {
			response.json({message : "ok"})
		},
		PATCH: (response) => {

		},
		DELETE: (response) => {

		},
  });
}

export async function getStaticProps() {
  // const message = await redis.get('message')
  return {
    message : "ok",
  }
}