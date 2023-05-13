import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";


export default function TranscriptCard(props) {
	const router = useRouter()
	const { id } = router.query
	const [courseData, setCourseData] = useState([])
	const [sumCredits, setSumCredits] = useState(0)
	const [gradeAverage, setGradeAverage] = useState({})
	const [gradeCumulative, setGradeCumulative] = useState(0)
	const { data: session, status : statusSession } = useSession()

  useEffect(() => {
    getDataList();
  }, []);

  async function getDataList() {
    try {
      const { data, error } = await axios.get("/api/academic-krs?semester=" + id);
      const { data : result, error : error2 } = await axios.get("/api/transcript?student_number=" + session.user.student_number);
			if(data.data.length > 0) {
				let confirmed = data.data.filter(item => item.confirm == true )
      	setCourseData(confirmed);
				setSumCredits(confirmed.reduce((prev, cur) => prev + cur.schedule.course.credits, 0))
			}
			if(result.data.length > 0) {
				let totalAllPointEarned = result.data.reduce((a, b) => a + b.point_earned, 0)
				let totalAllCredits = result.data.reduce((a, b) => a + parseInt(b.total_credits), 0)
				let cumulative = totalAllPointEarned / totalAllCredits
				let currentSemester = result.data.filter(item => parseInt(item.semester) == id)[0]
				setGradeCumulative(cumulative.toFixed(2))
				setGradeAverage(currentSemester)
			}
    } catch (error) {
      if (error.response) {
        if ((error.response.status = 404)) return;
      }
      alert(error);
    }
  }
	if(courseData.length == 0 && !gradeAverage.ipk)
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
            <Grid item xs={2}>
              <img
                src="/static/logo.png"
                alt="Picture of the author"
                width={70}
                height={70}
                onClick={() => router.push("/")}
              />
            </Grid>
            <Grid item xs={10}>
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
            </Grid>
          </Grid>
          <div
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
          ></div>
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
                    fontWeight: "500",
                    pt: 1,
                    pb: 5,
                  }}
                >
								SEMESTER GRADE POINT CARD
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={4}>
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
									Study Program 
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
									Cumulative Grade Point Average
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={3}>
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
									:&nbsp;&nbsp;{session.user.student_number}
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
									{/* :&nbsp;&nbsp;{session.user.studentData.departement.study_type.description} */}
									:&nbsp;&nbsp;{gradeCumulative}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            {/* <Grid item xs={2}>
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
									Program
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
									Year
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
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
									:&nbsp;&nbsp;{session.user.studentData.departement.study_type_id}
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
            </Grid> */}
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
										<td width="50%">Course</td>
										<td width="20%">Credit</td>
										<td width="20%">Grade</td>
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
													<td>{index+30}</td>
													<td>{item.schedule.course.code}</td>
													<td style={{ paddingLeft : '10px', textAlign : 'left'}}>{item.name}</td>
													<td>{item.schedule.course.credits}</td>
													<td style={{ paddingLeft : '40px', textAlign : 'left'}}>{item.grade_value}</td>
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
            <Grid item xs={10}>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "500",
                    pt: 0,
                  }}
                >
									{
										gradeAverage.ipk &&
										'Semester Grade Point Average: ' +gradeAverage.ipk.toFixed(2)
									}
                </Typography>
              </Stack>
            </Grid>
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
            <Grid item xs={4.3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                {/* <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "500",
                    pt: 3,
                  }}
                >
									Head of the study program,
                </Typography> */}
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
                {/* <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "500",
                    pt: 3,
                  }}
                >
									(...............................)
                </Typography> */}
              </Stack>
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
									{/* (...............................) */}
									{session.user.name}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={1.7}>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
