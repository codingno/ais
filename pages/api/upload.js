const multer = require("multer");
const path = require("path");
import nextConnect from "next-connect";

// const upload = multer({ dest: 'uploads/images' })
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
		try {
		const folderTarget = req.body.folderTarget || 'files'
		// const pathTarget = 'uploads/'	+ folderTarget + '/' + file.fieldname	
		const pathTarget = `files/${file.fieldname}/${folderTarget}`
    cb(null, pathTarget)
		} catch (error) {
			cb(error)
		}
  },
  filename: function (req, file, cb) {
		try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix + "." +file.originalname.split('.').pop())
    cb(null, file.fieldname + '-' + uniqueSuffix + "-" +file.originalname.replaceAll(' ', ''))
		} catch (error) {
			cb(error)
		}
  }
})

const upload = multer({ storage: storage })

export default nextConnect()
	.use(upload.single('uploads'))
  .post((req, res) => {
    const file = req.file.path;
    if (!file) {
      res.status(400).send({
        status: false,
        data: "No File is selected.",
      });
    }
    res.send(file);
		// res.ok({message:"ok"})
  })
