import { useState } from 'react'

export default function useStudentState() {
  const [studentList, setStudentList] = useState([])
  return [studentList, setStudentList]
}
