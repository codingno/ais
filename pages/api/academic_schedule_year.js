import crudApi from '../../utils/crudApi'
import db from '../../models'

export default crudApi('academic_schedule', {
  attributes : ['academic_year_id'],
  where : { academic_year_id : { [db.Sequelize.Op.gt] : 0 }},
  group : ['academic_year_id'],
  order : [
    ['academic_year_id', 'desc']
  ]
}, 'isLogin')