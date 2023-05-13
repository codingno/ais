import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ImageWithLoader from "../../../utils/ImageWithLoader";

import axios from "axios";
import { useSession } from "next-auth/react"
import moment from "moment";


export default function CourseRegistrationCard() {
	const [courseData, setCourseData] = useState([])
	const [studentData, setStudentData] = useState(null)
	const [sumCredits, setSumCredits] = useState(0)
	const { data: session, status : statusSession } = useSession()
  const [departement, setDepartement] = useState(null)

  useEffect(() => {
    if(session.user)
      getDepartement()

    async function getDepartement() {
      try {
      const { data, error } = await axios.get("/api/departement?id="+session.user.studentData?.departement.id)
      if(!data)
        return
      if(!data.data)
        return
      setDepartement(data.data)
      } catch (error) {
      }
    }
  }, [session])

  useEffect(() => {
    getDataList();
    getStudentData();
  }, []);

  async function getStudentData() {
    try {
      const { data, error } = await axios.get("/api/student?user_id=" + session.user.userID);
      // console.log(`🚀 ~ file: CourseRegistrationCard.jsx ~ line 77 ~ getDataList ~ data`, data.data)
      if(!data)
        throw Error('Error get data')
      if(!data.data)
        throw Error('Data not found')
      
      setStudentData(data.data)
			// if(data.data.length > 0) {
      // 	setCourseData(data.data.filter(item => item.confirm == true ));
			// 	setSumCredits(data.data.reduce((prev, cur) => prev + cur.schedule.course.credits, 0))
			// }
    } catch (error) {
      if (error.response) {
        if ((error.response.status = 404)) return;
      }
      alert(error);
    }
  }

  async function getDataList() {
    try {
      const { data, error } = await axios.get("/api/academic-krs");
      // console.log(`🚀 ~ file: CourseRegistrationCard.jsx ~ line 77 ~ getDataList ~ data`, data.data)
			if(data.data.length > 0) {
        let confirmed = data.data.filter(item => item.confirm == true )
        console.log("🚀 ~ file: CourseRegistrationCard.jsx ~ line 72 ~ getDataList ~ confirmed", confirmed)
      	setCourseData(confirmed);
				setSumCredits(confirmed.reduce((prev, cur) => prev + cur.schedule.course.credits, 0))
			}
    } catch (error) {
      if (error.response) {
        if ((error.response.status = 404)) return;
      }
      alert(error);
    }
  }
  if(statusSession == 'unauthenticated') {
    router.push('/auth/signin')
    return ""
  }
	if(courseData.length == 0 || statusSession == 'loading' || !studentData)
		return ""
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      wrap="wrap"
    >
      <Grid item xs={10} mt={10} mx={10}>
        <Box>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item xs={4}>
              {/* <Image */}
              <ImageWithLoader
                src="/static/homepage-logo.png"
                alt="Picture of the author"
                width={300}
                height={77.25}
                onClick={() => router.push("/")}
              />
            </Grid>
            <Grid item xs={4.25}>
            </Grid>
            <Grid item xs={.1}>
              <div
                style={{
                  backgroundColor: "#00778B",
                  width: "1px",
                  height: "63px",
                  // marginTop: "10px",
                  // marginBottom: "2px",
                }}
              ></div>
            </Grid>
            <Grid item xs={3.6} sx={{ paddingTop : '0 !important', }}>
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "9px",
                    fontWeight: "700",
                    color: "#003858",
                    // py: 0.7,
                  }}
                >
                University
                </Typography>
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "8px",
                    fontWeight: "500",
                    lineHeight : '.75rem',
                    display : 'block',
                  }}
                >
                  Jl. Raya Street
                </Typography>
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "8px",
                    fontWeight: "500",
                    lineHeight : '.75rem',
                    display : 'block',
                  }}
                >
                  Sub-District, District, Regency, Province 123456
                </Typography>
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "8px",
                    fontWeight: "500",
                    lineHeight : '.75rem',
                    display : 'block',
                  }}
                >
                secretariat@university.ac.id
                </Typography>
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "8px",
                    fontWeight: "500",
                    lineHeight : '.75rem',
                    display : 'block',
                  }}
                >
                www.university.ac.id
                </Typography>
            </Grid>
            {/* <Grid item xs={10}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  UNIVERSITY
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#00778B",
                    py: 0.7,
                  }}
                >
									{session.user.studentData.departement.faculty.name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "8px",
                    fontWeight: "500",
                  }}
                >
                  Jl. Raya Street
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "8px",
                    fontWeight: "500",
                  }}
                >
                  Phone : (021)-1234567, Fax: (021)-7654321, email :
                  academic@university.ac.id
                </Typography>
              </Stack>
            </Grid> */}
          </Grid>
          {/* <div
            style={{
              backgroundColor: "#000",
              height: "1px",
              width: "100%",
              marginTop: "10px",
              marginBottom: "2px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#000",
              height: "3px",
              width: "100%",
            }}
          ></div> */}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
					<Grid
						container
						spacing={1}
						direction="row"
						justifyContent="center"
						alignItems="center"
						alignContent="center"
						wrap="wrap"
					>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color : '#003858',
                    // color : 'red',
                    pt: 1,
                    pb: 3,
                  }}
                >
                  COURSE REGISTRATION CARD
                </Typography>
              </Stack>
            </Grid>
            {/* <Grid item xs={.5}>
            </Grid> */}
            <Grid item xs={2.5}>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
									Name 
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
                Student ID Number
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
                Place and Date of Birth
                </Typography>
              </Stack>
              {/* <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
                Graduation Date
                </Typography>
              </Stack> */}
            </Grid>
            <Grid item xs={2.5}>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:&nbsp;&nbsp;{session.user.name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:&nbsp;&nbsp;{session.user.studentData.student_number}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:&nbsp;&nbsp;{studentData.user_info.place_of_birth?.toUpperCase()}, {moment(studentData.user_info.date_of_birth).format('DD MMMM YYYY')}
                </Typography>
              </Stack>
            </Grid>
            {/* <Grid item xs={3}>
            </Grid> */}
            <Grid item xs={2.5}>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
									Faculty 
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
									Program of Study 
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
                Degree
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
									Semester
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    px: 1,
                  }}
                >
									Academic Year
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2.5}>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:&nbsp;&nbsp;{session.user.studentData.departement.faculty.name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:&nbsp;&nbsp;{session.user.studentData.departement.name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:&nbsp;&nbsp;{session.user.studentData.departement.study_type.description}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:&nbsp;&nbsp;{session.user.semester_active}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:&nbsp;&nbsp;{session.user.studentData.entry_year}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={10} mt={3} mx={10}>
        <Box>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item xs={12}>
							<table 
								className="course-registration"
							style={{ 
									fontSize : '10px',
								}}>
								<thead>
									<tr>
										<td width="5%">No</td>
										<td>Course Code</td>
										<td width="33%">Course</td>
										<td>Credit Hours</td>
										<td width="37%">Lecturer</td>
									</tr>
								</thead>
								<tbody>
									{
										courseData.map((item, index) => {
											return (
												<tr
													style={{
														backgroundColor : index % 2 == 0 ? '#E0E0E0' : '#fff',
													}}
												>
													<td>{index+1}</td>
													<td>{item.schedule.course.code}</td>
													<td style={{ paddingLeft : '10px', textAlign : 'left'}}>{item.name}</td>
													<td>{item.schedule.course.credits}</td>
													<td style={{ paddingLeft : '10px', textAlign : 'left'}}>{item.schedule.teacher_name}{item.teacher_2_name ? `, ${item.teacher_2_name}` : ""}</td>
												</tr>
											)
										})
									}
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td
											style={{
												fontWeight : '700',
											}}
										>
											{sumCredits}
										</td>
										<td></td>
									</tr>
								</tbody>
							</table>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
					<Grid
						container
						spacing={1}
						direction="row"
						justifyContent="flex-end"
						alignItems="flex-end"
						alignContent="center"
						wrap="wrap"
					>
            {/* <Grid item xs={1.7}>
            </Grid>
            <Grid item xs={4.3}>
            </Grid> */}
            <Grid item xs={10}>
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "500",
                    pt: 3,
                  }}
                >
									Depok, {new Date().getDate()} {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={1.7}>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
					pt={1.5}
				>
					<Grid
						container
						spacing={1}
						direction="row"
						justifyContent="center"
						alignItems="center"
						alignContent="center"
						wrap="wrap"
					>
            <Grid item xs={1.7}>
            </Grid>
            <Grid item xs={5.5}>
            </Grid>
            <Grid item xs={4.3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "500",
                    pt: 3,
                  }}
                >
									Head of the study program,
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
								height={50}
                mt={2}
              >
							<ImageWithLoader
              // <img
							// 	src={`http://localhost:3535${session.user.studentData.departement.signature_link}`}
								// src={`${session.user.studentData.departement.signature_link}`}
								src={`${session.user.studentData.departement.signature_link || "#"}`}
                alt="signature"
                width={90}
                height={90}
              />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "500",
                    pt: 3,
                    // pl: 3,
										// textDecoration: 'underline',
                  }}
                >
									{/* (...............................) */}
									(&nbsp;&nbsp;{departement?.teacher?.user?.name}&nbsp;&nbsp;)
                </Typography>
              </Stack>
            </Grid>
            {/* <Grid item xs={4.3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "500",
                    pt: 3,
                    pl: 3,
                  }}
                >
									Student,
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
								height={50}
              >
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "500",
                    pt: 3,
                    pl: 3,
										textDecoration: 'underline',
                  }}
                >
									(...............................)
									{session.user.name}
                </Typography>
              </Stack>
            </Grid> */}
            <Grid item xs={.5}>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
