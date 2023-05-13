import { useSession, getSession } from "next-auth/react"
module.exports = {
	isLogin : async (req, res, next) => {
		const session  = await getSession({req});
    console.log(`🚀 ~ file: police.js ~ line 5 ~ isLogin: ~ session`, session)
		req.user = session ? session.user : null
		if(req.user)
			return next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isAdmin : async (req, res, next) => {
		const session  = await getSession({req});
		if(session.user && session.user.isAdmin)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isManager : async (req, res, next) => {
		const session  = await getSession({req});
		if(session.user && sesson.user.role_id <= 2)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isCourseCreator : async (req, res, next) => {
		const session  = await getSession({req});
		if(session.user && sesson.user.role_id <= 3)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isTeacher : async (req, res, next) => {
		const session  = await getSession({req});
		if(session.user && session.user.isTeacher)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isNonEditTeacher : async (req, res, next) => {
		if(req.user && req.user.role_id <= 5)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isStudent : async (req, res, next) => {
		const session  = await getSession({req});
		if(session.user && session.user.isStudent)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isPublic : (req, res, next) => {
			next()
	},
}