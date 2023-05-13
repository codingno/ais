import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import QRCode from "react-qr-code";


import ImageWithLoader from "../../utils/ImageWithLoader";

export default function StudentCard() {
  const router = useRouter()
  console.log("🚀 ~ file: StudentCard.jsx ~ line 16 ~ StudentCard ~ router", router)
  const [baseUrl, setBaseUrl] = useState("")
  console.log("🚀 ~ file: StudentCard.jsx ~ line 18 ~ StudentCard ~ baseUrl", baseUrl)
  const { data: session, status: statusSession } = useSession();
  console.log(
    `🚀 ~ file: StudentCard.jsx ~ line 7 ~ StudentCard ~ session`,
    session
  );

  useEffect(() => {
    if(window)
      setBaseUrl(window.location.origin)
  }, [])

  if (statusSession == 'loading')
    return ""
  
  return (
    <div style={{ width: "100%", height: "100%",
                    boxShadow: "5px 5px 5px #bbb",
										border: "1px solid #bbb",
										borderRadius: "20px",
										overflow : 'hidden',
		 }}>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignContent="stretch"
        wrap="wrap"
        style={{ width: "100%", height: "100%", p: 0, m: 0 }}
      >
        <Grid
          item
          xs={10.5}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Grid
            container
            sx={{
              bgcolor: "#004F66",
              width: "100%",
              height: "75%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              pl: 4,
							pt: 8
            }}
          >
            <Grid item xs={8}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                mb={3}
              >
                <Typography variant="h4" gutterBottom color="#E5FFFF" 
								// sx={{ fontWeight : 500 }}
								>
                  {session.user.name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Typography variant="h5" gutterBottom color="#A1A893" 
								fontWeight={700}
								>
                  {session.user.studentData.student_number}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                mb={3}
              >
                <Typography variant="h5" color="#A1A893" gutterBottom 
								fontWeight={700}
								>
                  {session.user.studentData.departement.faculty.name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Box width={150} height={150} sx={{ bgcolor: "white", display : 'flex', justifyContent: 'center', alignItems : 'center', }}>
									<QRCode 
                  value={baseUrl + router.pathname + "/qrcode/" + session.user.userID }
                  // value={JSON.stringify({
									// 	name : session.user.name,
									// 	student_number : session.student_number,
									// 	faculty : session.user.studentData.departement.faculty.name,
									// 	entry_year : session.user.studentData.entry_year,
									// })} 
										size={140}
									/>
								</Box>
              </Stack>
            </Grid>
            <Grid item xs={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            width="100%"
            m="auto"
          >
            {/* <img
              src="/static/homepage-logo.png"
              alt="Picture of the author"
              width={200}
              height={300}
              onClick={() => router.push("/")}
            /> */}
             <Box width={200} height={250} sx={{ bgcolor: "white", position: "relative", }}>
							{
								session.user.image &&
            <ImageWithLoader
              src={session.user.image}
              alt={session.user.name}
              // width={200} height={250}
							layout="fill"
							objectFit="cover"
            />
							}
						 </Box>
          </Stack>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            width="100%"
            my="auto"
            pl={8}
          >
            <img
              src="/static/homepage-logo.png"
              alt="Picture of the author"
              width={300}
              height={77.25}
              // onClick={() => router.push("/")}
            />
          </Stack>
        </Grid>
        <Grid item xs={1.5} sx={{ height: "100%",
							overflow: 'visible',
			 }}>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="flex-start"
						sx={{
							height : '60%',
							whiteSpace : 'nowrap',
							// transform : 'translate(-80px)',
							transform : 'rotate(90deg)',
							overflow: 'visible',
							// position: 'static',
							mt: '100px',
						}}
					>
						<Box
							sx={{
								// transform : 'rotate(90deg)',
								transform : 'translate(-80px)',
							overflow: 'visible',
							ml: '-100px',
								// position : 'absolute',
							}}
						>
						<Typography variant="h2" gutterBottom color="#0D475C"
						>
							Student ID
						</Typography>
						</Box>
					</Stack>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						m="auto"
						height="25%"
					>
						<Typography variant="h3" gutterBottom color="#0D475C" m={0}>
							{session.user.studentData.entry_year}
						</Typography>
					</Stack>
				</Grid>
      </Grid>
    </div>
  );
}
