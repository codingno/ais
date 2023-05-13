'use strict';
const {
  Model
} = require('sequelize');
// module.exports = () => {
module.exports = (sequelize, DataTypes) => {
  // class User extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
	
  // User.init({
  const User = sequelize.define('user',{
		id : {
			type: DataTypes.UUID,
    	defaultValue: DataTypes.UUIDV4,	
			primaryKey: true,
		},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.TIME,
    image: DataTypes.STRING,
		role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'users',
		timestamps: false,
  });
  User.associate = models => {
		// model.belongsTo(models.course, { foreignKey: 'course_id', as : 'course' })
    User.hasOne(models.user_info, { foreignKey: 'user_id', as : 'user_info' })
    User.hasOne(models.user_secret, { foreignKey: 'user_id', as : 'user_secret' })
  }
  return User;
};