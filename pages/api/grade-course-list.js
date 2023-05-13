import crudApi from '../../utils/crudApi2'

import db from '../../models'

export default crudApi('academic_krs', {
  include : [
    {
      model : db.academic_schedule,
      as : 'academic_schedule',
      include : [
        {
          model : db.teacher,
          as : 'teacher',
          include : [
            {
              model : db.user,
              as : 'user',
            }
          ]
        }, 
        {
          model : db.course,
          as : 'course',
        },
        {
          model : db.course_grade_aspect,
          as : 'course_grade_aspect',
        },
        {
          model : db.room,
          as : 'room',
        },
      ]
    },
    {
      model : db.student,
      as : 'student',
      include : [
        {
          model : db.user,
          as : 'user',
          include : [
            {
              model : db.user_info,
              as : 'user_info',
            }
          ],
        },
        {
          model : db.departement,
          as : 'departement',
        },
      ]
    }, 
    {
      model : db.student_grade_per_aspect,
      as : 'student_grade_per_aspect',
      include : [
        {
          model : db.course_grade_aspect,
          as : 'course_grade_aspect',
        }
      ]
    }, 
    {
      model : db.master_grade,
      as : 'grade',
    }, 
  ]
}, 'isLogin', false, [],(req, options) => {
  let newOptions = {...options}
  const { academic_year_id } = req.query
  if(academic_year_id) {
    newOptions = {
      ...newOptions,
      include : [
        {
          model : db.academic_schedule,
          as : 'academic_schedule',
          where : { academic_year_id },
          include : [
            ...newOptions.include[0].include
            // {
            //   model : db.teacher,
            //   as : 'teacher',
            //   include : [
            //     {
            //       model : db.user,
            //       as : 'user',
            //     }
            //   ]
            // }, 
            // {
            //   model : db.course,
            //   as : 'course',
            // },
          ]
        },
        ...newOptions.include.slice(1)
      ]
    }
  }
  console.log("🚀 ~ file: grade-course-list.js ~ line 72 ~ newOptions", JSON.stringify(newOptions,null,4))
  return newOptions
})
