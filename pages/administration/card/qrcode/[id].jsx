import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ImageWithLoader from '../../../../utils/ImageWithLoader'
import alertError from '../../../../utils/alertError'

import axios from 'axios'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import moment from 'moment'

function QrCodeCard() {

  const router = useRouter()

  const { id } = router.query

  const [studentData, setStudentData] = useState(null)

  useEffect(() => {
    if(id)
      getStudentData()

    async function getStudentData() {
     try {
      const { data } = await axios.get('/api/student?user_id=' + id)
      console.log("🚀 ~ file: [id].jsx ~ line 22 ~ getStudentData ~ data", data)
      if (data?.data)
        setStudentData(data.data)

     } catch (error) {
      alertError(error) 
     } 
    }
  
  }, [id])


  return (
    <div
      style={{
        width : '100vw',
        height : '100vh',
        display : 'flex',
        flexDirection : 'column',
        justifyConter : 'center',
        alignItems : 'center',
      }}
    >
      {
        !studentData ? <CircularProgress sx={{ margin : 'auto' }} /> :
        <>
          <div
            style={{
              width : 300,
              height : 150,
              margin : 'auto',
              marginBottom : 10,
            }}
          >
              <ImageWithLoader
              // <img
                src="/static/homepage-logo.png"
                alt="logo"
                width={300}
                height={150}
                onClick={() => router.push("/")}
              />
          </div>
          <Stack sx={{
            width : '80%',
            maxWidth : 600,
            m : 'auto',
            mt : 0,
          }}>
          <Grid container spacing={0}>
            <ViewStudentData studentData={studentData} />
          </Grid>
          </Stack>
        </>
      }
    </div>
  )
}

export default QrCodeCard

function ViewStudentData({studentData}) {
  const student_data = {
    "Name" : studentData?.name??"",
    "Gender" : studentData?.user_info?.gender == 'MAN' ? 'Male' : 'Female',
    "Date of birth" : moment(studentData?.user_info?.date_of_birth??new Date(), "YYYY-MM-DD").format("MM/DD/YYYY"),
    "Citizenship" : studentData?.user_info?.nationality??"",
    "Faculty name" : studentData?.departement?.faculty?.name??"",
    "Program" : studentData?.departement?.study_type?.description??"",
    "Study Program" : studentData?.departement?.name??"",
    "Academic Year" : studentData?.entry_year??"",
    "Semester" : studentData?.semester_active??"",
  }
  const viewStudentData = Object.keys(student_data).map(item =>
    <>
        <Grid item xs={5}>
          <Typography variant="body1" color="initial">{item}</Typography>
        </Grid>  
        <Grid item xs={1}>
          <Typography variant="body1" color="initial">:</Typography>
        </Grid>  
        <Grid item xs={6}>
          <Typography variant="body1" color="initial">{student_data[item]}</Typography>
        </Grid>  
    </>
    )
  return (
    <>{viewStudentData}</>
  )
}