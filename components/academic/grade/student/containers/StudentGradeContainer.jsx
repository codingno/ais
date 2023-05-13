// import dependencies
import React from 'react'
import { Card, Grid, Stack, Typography } from '@mui/material'

// import local
import useGetDataList from '../hooks/logics/get_data_list'
import StudentGradeList from '../presentations/StudentGradeList'
import UserListToolbar from '../../../../utils/ListToolbarGrade'

function StudentGradeContainer() {
  const [ headLabel, studentList, setStudentList, setReload ] = useGetDataList()
  console.log("🚀 ~ file: StudentGradeContainer.jsx ~ line 9 ~ StudentGradeContainer ~ studentList", studentList)
  return (
    <>
    <Grid item xs={10} p={1}>
      <Card
        sx={{
          maxHeight : `calc(100vh + ${-120 + (0 * 47) + 52}px)`,
        }}
      >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            p={5}
						pb={1}
          >
            <Typography variant="h5" gutterBottom>
              Student Grade {studentList[0]?.academic_schedule?.course?.name}
            </Typography>
          </Stack>
        <UserListToolbar 
            toolbarName={'Student'}
        />
        <StudentGradeList studentList={studentList} headLabel={headLabel} setStudentList={setStudentList} setReload={setReload} />
      </Card>
    </Grid>
    </>
  )
}

export default StudentGradeContainer