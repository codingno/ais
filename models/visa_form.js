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
  const VisaForm = sequelize.define('visa_form',{
    // user_id: DataTypes.STRING,
		user_id: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: "users",
				key: "id"
			},
			onDelete: "CASCADE"
		},
    alamat_email_penjamin: DataTypes.STRING,
    alamat_pekerjaan: DataTypes.STRING,
    alamat_penjamin: DataTypes.STRING,
    alamat_tempat_tinggal: DataTypes.STRING,
    berlaku_sampai: DataTypes.DATE,
    bidang_pekerjaan: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    jenis_permohonan: DataTypes.STRING,
    kantor_imigrasi: DataTypes.STRING,
    kantor_wilayah: DataTypes.STRING,
    kategori_penjamin: DataTypes.STRING,
    ktp_kuasa: DataTypes.STRING,
    ktp_penjamin: DataTypes.STRING,
    lama_permohonan: DataTypes.INTEGER,
    nama_kuasa: DataTypes.STRING,
    nama_lengkap: DataTypes.STRING,
    nama_penjamin: DataTypes.STRING,
    no: DataTypes.INTEGER,
    no_akte: DataTypes.INTEGER,
    nomor_passport: DataTypes.INTEGER,
    pekerjaan: DataTypes.STRING,
    perdim: DataTypes.STRING,
    status_sipil: DataTypes.STRING,
    status_usaha: DataTypes.STRING,
    tanggal_dikeluarkan: DataTypes.DATE,
    tanggal_lahir: DataTypes.DATE,
    telpon: DataTypes.STRING,
    telpon_kantor: DataTypes.STRING,
    telpon_penjamin: DataTypes.STRING,
    tempat_dikeluarkan: DataTypes.STRING,
    tgl_akte: DataTypes.DATE,
    tempat_lahir: DataTypes.STRING,
    tgl_ktp: DataTypes.DATE,
    tgl_permohonan: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'visa_form',
		freezeTableName: true,
		timestamps: false
  });
  return VisaForm ;
};