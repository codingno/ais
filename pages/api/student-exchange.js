import crudApi from '../../utils/crudApi'
import db from '../../models'

export default crudApi('student_exchange', {include:[{model: db.faculty, as: 'faculty'}]}, 'isLogin')