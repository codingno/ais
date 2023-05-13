require("dotenv").config();
import NextAuth from "next-auth";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import Sequelize, { DataTypes } from "sequelize";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

// console.log({models});

import * as db from "../../../models";
// const db = require('../../../models')
const User = require("../../../models/user")(db.sequelize, DataTypes);
const UserInfo = require("../../../models/userinfo")(db.sequelize, DataTypes);
const UserSecret = require("../../../models/usersecret")(
  db.sequelize,
  DataTypes
);
const Student = require("../../../models/student")(db.sequelize, DataTypes);
const Teacher = require("../../../models/teacher")(db.sequelize, DataTypes);
const Departement = require("../../../models/departement")(db.sequelize, DataTypes);
const Faculty = require("../../../models/faculty")(db.sequelize, DataTypes);
const MasterStudyType = require("../../../models/masterStudyType")(db.sequelize, DataTypes);
UserInfo.belongsTo(User, { foreignKey: "user_id" });
UserSecret.belongsTo(User, { foreignKey: "user_id" });
Student.belongsTo(UserSecret, { foreignKey: "user_id" });
Student.belongsTo(Departement, { foreignKey: "departement_id" });
Teacher.belongsTo(UserSecret, { foreignKey: "user_id" });
Teacher.belongsTo(Departement, { foreignKey: "departement_id" });
Departement.belongsTo(Faculty, { foreignKey: "faculty_id" });
Departement.belongsTo(MasterStudyType, { foreignKey: "study_type_id", as : "study_type" });
User.hasOne(UserInfo, { as: "user_info", foreignKey: "user_id" });
User.hasOne(UserSecret, { as: "user_secret", foreignKey: "user_id" });
UserSecret.hasOne(Student, {
  as: "student",
  foreignKey: "user_id",
  sourceKey: "user_id",
});
UserSecret.hasOne(Teacher, {
  as: "teacher",
  foreignKey: "user_id",
  sourceKey: "user_id",
});
// console.log(`🚀 ~ file: [...nextauth].js ~ line 19 ~ db`, db.sequelize)

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async (req, res) =>  {
	// process.env.NEXTAUTH_URL = 'http://' + req.headers.host;
	// process.env.NEXTAUTH_URL = 'http://' + req.headers.host.split(":")[0];
	return await NextAuth(req, res, {
  // https://next-auth.js.org/configuration/providers
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
      
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      scope: "read:user",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "User" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let user;
        // // console.log(`🚀 ~ file: [...nextauth].js ~ line 79 ~ authorize ~ credentials`, credentials)
        // // Add logic here to look up the user from the credentials supplied

        try {
          const condition = {
            [db.Sequelize.Op.or] : [
              {
                username: credentials.username,
              },
              {
                email: credentials.username,
              },
            ]
          };
          console.log(`🚀 ~ file: [...nextauth].js:129 ~ authorize ~ condition`, condition)
          // const getUser = await User.findOne({
          // 	// where : condition,
          // 	include : [
          // 		{
          // 			model : UserSecret,
          // 			where : condition,
          // 			as : 'user_secret',
          // 		},
          // 		{
          // 			model : UserInfo,
          // 			as : 'user_info',
          // 		},
          // 	],
          // })
          const user_secret = await UserSecret.findOne({
            where: condition,
            include: [
              {
                model: User,
                as: "user",
              },
              {
                model: Student,
                as: "student",
								include : [
									{
										model : Departement,
										as: "departement",
										include : [
											{
												model : Faculty,
												as: "faculty",
											},
											{
												model : MasterStudyType,
												as: "study_type",
											},
										]
									}
								],
              },
              {
                model: Teacher,
                as: "teacher",
								include : [
									{
										model : Departement,
										as: "departement",
										include : [
											{
												model : Faculty,
												as: "faculty",
											}
										]
									}
								],
              },
            ],
            // raw: true,
          });
          // return null
          // user = await db.sequelize.models.user.findAll()
          const allowed = await bcrypt.compare(
            credentials.password,
            user_secret.pass
          );
          console.log("🚀 ~ file: [...nextauth].js ~ line 188 ~ authorize ~ allowed", allowed, user)
          // const allowed = await bcrypt.compare(credentials.password, getUser.user_secret.pass)
          if (allowed) {
            user = user_secret.user.dataValues;
            if (user_secret.teacher) {
              user.isTeacher = true;
              user.departement_id = user_secret.teacher.departement_id;
							user.teacherData = user_secret.teacher;
            } else if (user_secret.student) {
              user.isStudent = true;
              user.student_number = user_secret.student.student_number;
              user.semester_active = user_secret.student.semester_active;
              user.departementID = user_secret.student.departement_id;
							user.studentData = user_secret.student;
            } else {
							if(user.role_id == 1)
              	user.isAdmin = true;
            }
							user.userID = user_secret.user_id
          }
          // else
          // 	return null

          // return user
        } catch (error) {
          console.log(
            `🚀 ~ file: [...nextauth].js ~ line 86 ~ authorize ~ error`,
            error
          );
          throw error;
        }

        // user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          // delete user.user_secret
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          // return null;
          // throw "/auth/signin?error=CredentialsSignin"
          throw new Error("Unauthorized")
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error("error message") // Redirect to error page
          // throw "/path/to/redirect"        // Redirect to a URL
        }
      },
    }),
  ],
  adapter: SequelizeAdapter(db.sequelize),
  // adapter: SequelizeAdapter(db.sequelize, db.sequelize.models),
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    error: '/auth/signin', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
			if (req.url === "/api/auth/session?update") {
         // hit the DB and return token with updated values
				if(token.user.isStudent)
					if(!token.user.studentData.status)
						token.user.studentData.status = 1
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      if(user) {
        token.user = user
      }
      return token;
    },
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token from a provider.
      if(token) {
        user = token.user
        delete token.user.id
        session.user = token.user
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (credentials.username == "" || credentials.password == "")
        return "/auth/signin?error=usernameorpassword";

      // const username = credentials.username
      // const password = credentials.username
      // const user = await User.findOne({ where : {  }})

      // const isAllowedToSignIn = true
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    // colorScheme: "light",
    colorScheme: "dark",
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
})};
