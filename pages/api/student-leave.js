import crudApi from '../../utils/crudApi'
import db from '../../models'

export default crudApi('student_leave', {include:[{model: db.faculty, as: 'faculty'}]}, 'isLogin')