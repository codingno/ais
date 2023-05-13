import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import axios from "axios";
import { useSession } from "next-auth/react"


export default function CourseRegistrationCard() {
	const [courseData, setCourseData] = useState([])
	const [sumCredits, setSumCredits] = useState(0)
	const { data: session, status : statusSession } = useSession()

  useEffect(() => {
    getDataList();
  }, []);

  async function getDataList() {
    try {
      const { data, error } = await axios.get("/api/academic-krs");
      console.log(`🚀 ~ file: CourseRegistrationCard.jsx ~ line 77 ~ getDataList ~ data`, data.data)
      setCourseData(data.data);
			setSumCredits(data.data.reduce((prev, cur) => prev + cur.schedule.course.credits, 0))
    } catch (error) {
      if (error.response) {
        if ((error.response.status = 404)) return;
      }
      alert(error);
    }
  }
	if(courseData.length == 0)
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
                  Faculty of Islamic Studies
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
                  COURSE REGISTRATION CARD
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
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
                    px: 1,
                  }}
                >
									Name 
                </Typography>
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:
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
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:
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
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={3}>
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
                    px: 1,
                  }}
                >
									Program
                </Typography>
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:
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
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:
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
                <Typography
                  variant="string"
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
									:
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
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
													<td>{index+30}</td>
													<td>{item.schedule.course.code}</td>
													<td style={{ paddingLeft : '10px', textAlign : 'left'}}>{item.name}</td>
													<td>{item.schedule.course.credits}</td>
													<td style={{ paddingLeft : '10px', textAlign : 'left'}}>{item.schedule.teacher_name}</td>
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
									Depok, ............................... {new Date().getFullYear()}
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
                  }}
                >
									(...............................)
                </Typography>
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
