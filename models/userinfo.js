'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class UserInfo extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
	// 		// UserInfo.belongsTo(models.users)
	// 		// models.users.hasMany(UserInfo, { as: 'user_info', foreignKey : 'user_id' });
  //   }
  // };
  // UserInfo.init({
  const UserInfo = sequelize.define('user_info',{
    // user_id: DataTypes.STRING,
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: "users",
				key: "id"
			},
			onDelete: "CASCADE"
		},
    first_name: {
      type : DataTypes.STRING,
      defaultValue : '',
    },
    last_name: {
      type : DataTypes.STRING,
      defaultValue : '',
    },
    middle_name: {
      type : DataTypes.STRING,
      defaultValue : '',
    },
    place_of_birth:  {
      type : DataTypes.STRING,
      defaultValue : '',
    },
    date_of_birth: DataTypes.DATE,
		gender: {
			type: DataTypes.ENUM,
        values: [
          'MAN',
          'WOMAN',
        ],
        defaultValue: 'MAN',
		},
		nationality: {
			type: DataTypes.ENUM,
        values: [
          'WNI',
          'WNA',
        ],
        defaultValue: 'WNI',
		},
    region: DataTypes.STRING,
    home_address: DataTypes.STRING,
    identity_id: DataTypes.STRING,
    identity_type_id: DataTypes.INTEGER,
    religion : DataTypes.INTEGER,
    expiredVisa: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'user_info',
		freezeTableName: true,
  });
  UserInfo.associate = models => {
		// model.belongsTo(models.course, { foreignKey: 'course_id', as : 'course' })
    UserInfo.belongsTo(models.user, { foreignKey: 'user_id', as : 'user' })
    UserInfo.belongsTo(models.religion, { foreignKey: 'religion', as : 'religions' })
    // UserInfo.hasOne(models.user_secret, { foreignKey: 'user_id', as : 'user_secret' })
  }
  return UserInfo;
};