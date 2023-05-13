import crudApi from '../../utils/crudApi'
import db from '../../models'

export default crudApi('academic_schedule', {
  include : [
    {
      model  : db.course,
      as : 'course',
    },
    {
      model : db.course_grade_aspect,
      as : 'course_grade_aspect',
    },
  ]
}, 'isLogin')