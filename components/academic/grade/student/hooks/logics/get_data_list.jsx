// import dependecies
import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// import local
import useStudentState from '../states/data_list'
import alertError from '../../../../../../utils/alertError'

export default function useGetDataList() {

  const router = useRouter()

  const { id } = router.query

  const [studentList, setStudentList] = useStudentState()
  console.log("🚀 ~ file: get_data_list.jsx ~ line 17 ~ useGetDataList ~ studentList", studentList)

  const [reload, setReload] = useState(true);

  const headLabel = useMemo(() => {
    if(studentList.length == 0)
      return []
    
    return [
      { id: 'student', label: 'Student Name', objectValue : ['student', 'user', 'name'] },
      ...studentList[0]?.academic_schedule?.course_grade_aspect.sort((a,b) => a-b).map(({id,name, percentage, })=>({ id , label : name, percentage, }))
    ]
  }, [studentList])
  console.log("🚀 ~ file: get_data_list.jsx ~ line 27 ~ headLabel ~ headLabel", headLabel)

  useEffect(() => {
    if (id && reload)
      getDataList()

    async function getDataList() {
      try {
        const { data } = await axios.get('/api/grade-course-list?academic_schedule_id=' + id)
        if (!data)
          return alert("Data not found.")
        setReload(false)
        console.log("🚀 ~ file: get_data_list.jsx ~ line 39 ~ getDataList ~ data", data)
        setStudentList(data)
      } catch (error) {
        alertError(error)
      }
    }

    return () => {
      getDataList()
    }

  }, [id,reload])

  return [ headLabel, studentList, setStudentList, setReload ]
}
