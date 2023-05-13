import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Divider } from '@mui/material'
import moment from 'moment'

import { useSession } from 'next-auth/react'

// import { List, MenuItem } from '@mui/material'

function VisaPDF2({data}) {

	const { data : session, status : statusSession } = useSession()
  console.log(`🚀 ~ file: visapdf.jsx ~ line 13 ~ VisaPDF ~ session`, session)

	return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignContent="stretch"
        wrap="wrap"
        sx={{ p: 4 }}
      >
				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						border: "solid thin black",
						'&.MuiGrid-root' : {
								paddingTop : 0,
						}
					}}
				>
					<Typography
						variant="h6"
						color="initial"
						sx={{ fontSize: "10px", fontWeight: 700 }}
					>
						CATATAN PEGAWAI TATA USAHA
					</Typography>
          <Stack
            sx={{ width: "100%", pb: "1%", px: "1%",}}
            justifyContent="space-between"
          >
            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              alignContent="stretch"
              wrap="wrap"
            >
							<Grid item xs={7}>
								<Typography
									variant="h6"
									color="initial"
									sx={{ fontSize: "10px", }}
								>
								Nomor Visa
								</Typography>
								<Stack
									sx={{ width: "100%", my: 0.25 }}
									justifyContent="flex-start"
									direction="row"
								>
									<FillText text="" maxLength={18} />
									{/* <FillText text={data?.nomor_passport?.toUpperCase()??""} maxLength={16} /> */}
								</Stack>
							</Grid>
							<Grid item xs={2.25}>
								<Typography
									variant="h6"
									color="initial"
									sx={{ fontSize: "10px", pl : 1, }}
								>
								Indeks Visa
								</Typography>
								<Stack
									sx={{ width: "100%", my: 0.25 }}
									justifyContent="center"
									direction="row"
								>
									<FillText text="" maxLength={4} />
									{/* <FillText text={data ? moment(data.tgl_dikeluarkan).format('DDMMYY') : ''} maxLength={6} /> */}
								</Stack>
							</Grid>
							<Grid item xs={2.75}>
								<Typography
									variant="h6"
									color="initial"
									sx={{ fontSize: "10px", pl : 1, }}
								>
								Tanggal
								</Typography>
								<Stack
									sx={{ width: "100%", my: 0.25 }}
									justifyContent="center"
									direction="row"
								>
									<FillText text="" maxLength={6} />
									{/* <FillText text={data ? moment(data.berlaku_sampai).format('DDMMYY') : ''} maxLength={6} /> */}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant="h6"
									color="initial"
									sx={{ fontSize: "10px", }}
								>
								Tempat Dikeluarkan
								</Typography>
								<Stack
									sx={{ width: "100%", my: 0.25 }}
									justifyContent="flex-start"
									direction="row"
								>
									<FillText text="" maxLength={30} />
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant="h6"
									color="initial"
									sx={{ fontSize: "10px", }}
								>
								Nomor Slip Keberangkatan
								</Typography>
								<Stack
									sx={{ width: "100%", my: 0.25 }}
									justifyContent="flex-start"
									direction="row"
								>
									<FillText text="" maxLength={30} />
								</Stack>
							</Grid>
              <Grid item xs={9.25}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								Nomor Surat Persetujuan Dirjenim
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text={data?.tempat_lahir?.toUpperCase()??""} maxLength={23} /> */}
                  <FillText text={""} maxLength={23} />
                </Stack>
              </Grid>
              <Grid item xs={2.75}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", textAlign: "left" }}
                >
								Tanggal
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="center"
                  direction="row"
                >
                  <FillText text={""} maxLength={6} />
                </Stack>
              </Grid>
							<Grid item xs={6.5}>
								<Typography
									variant="h6"
									color="initial"
									sx={{ fontSize: "10px", }}
								>
								Nomor Register
								</Typography>
								<Stack
									sx={{ width: "100%", my: 0.25 }}
									justifyContent="flex-start"
									direction="row"
								>
									<FillText text="" maxLength={16} />
									{/* <FillText text={data?.nomor_passport?.toUpperCase()??""} maxLength={16} /> */}
								</Stack>
							</Grid>
							<Grid item xs={2.75}>
								<Typography
									variant="h6"
									color="initial"
									sx={{ fontSize: "10px", pl : 1, }}
								>
								Tanggal
								</Typography>
								<Stack
									sx={{ width: "100%", my: 0.25 }}
									justifyContent="center"
									direction="row"
								>
									<FillText text="" maxLength={6} />
									{/* <FillText text={data ? moment(data.tgl_dikeluarkan).format('DDMMYY') : ''} maxLength={6} /> */}
								</Stack>
							</Grid>
							<Grid item xs={2.75}>
								<Typography
									variant="h6"
									color="initial"
									sx={{ fontSize: "10px", pl : 1, }}
								>
								Berlaku s/d
								</Typography>
								<Stack
									sx={{ width: "100%", my: 0.25 }}
									justifyContent="center"
									direction="row"
								>
									<FillText text="" maxLength={6} />
									{/* <FillText text={data ? moment(data.berlaku_sampai).format('DDMMYY') : ''} maxLength={6} /> */}
								</Stack>
							</Grid>
					<Grid item xs={10}>
					</Grid>
					<Grid item xs={2} px={1}>
						<Typography variant="body1" color="initial" fontSize={10}>Paraf Pegawai,</Typography>
						<div style={{ minHeight : 70 }}></div>
						<Divider sx={{ bgcolor : 'black', }} />
					</Grid>
					</Grid>
					</Stack>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						border: "solid thin black",
						borderTop : 'solid thin transparent',
						'&.MuiGrid-root' : {
								paddingTop : 0,
						}
					}}
				>
					<Typography
						variant="h6"
						color="initial"
						sx={{ fontSize: "10px", fontWeight: 700 }}
					>
						CATATAN PEJABAT IMIGRASI
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						border: "solid thin black",
						borderTop : 'solid thin transparent',
						'&.MuiGrid-root' : {
								paddingTop : 0,
						}
					}}
				>
					<Grid
						container
						spacing={0}
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						alignContent="stretch"
						wrap="wrap"
					>
						<Grid item xs={6}>
							<Grid
								container
								spacing={0}
								direction="row"
								justifyContent="flex-start"
								alignItems="flex-start"
								alignContent="stretch"
								wrap="wrap"
								sx={{
									borderRight : 'solid thin black',
								}}
							>
								<Grid item xs={2}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									NIORA
									</Typography>
								</Grid>
								<Grid item xs={10}>
									<FillText text="" maxLength={12} />
								</Grid>
								<Grid item xs={6}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Tanggal
									</Typography>
									<Stack
										direction="row"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									<FillText text="" maxLength={6} />
									</Stack>
								</Grid>
								<Grid item xs={2}>
								</Grid>
								<Grid item xs={4} px={1}>
									<Typography variant="body1" color="initial" fontSize={10}>Paraf Pegawai,</Typography>
									<div style={{ minHeight : 70 }}></div>
									<Divider sx={{ bgcolor : 'black', }} />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Grid
								container
								spacing={0}
								direction="row"
								justifyContent="flex-start"
								alignItems="flex-start"
								alignContent="stretch"
								wrap="wrap"
								sx={{
									// borderRight : 'solid thin black',
								}}
							>
								<Grid item xs={6}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Kelengkapan persyaratan
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : .5, }}
									>
									Lengkap
									</Typography>
								</Grid>
								<Grid item xs={1} sx={{ pl : 1, }}>
									<FillText text="" maxLength={1} />
								</Grid>
								<Grid item xs={2}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Tidak
									</Typography>
								</Grid>
								<Grid item xs={1}>
									<FillText text="" maxLength={1} />
								</Grid>
								<Grid item xs={6}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Tanggal
									</Typography>
									<Stack
										direction="row"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									<FillText text="" maxLength={6} />
									</Stack>
								</Grid>
								<Grid item xs={2}>
								</Grid>
								<Grid item xs={4} px={1}>
									<Typography variant="body1" color="initial" fontSize={10}>Paraf Pejim,</Typography>
									<div style={{ minHeight : 70 }}></div>
									<Divider sx={{ bgcolor : 'black', }} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						border: "solid thin black",
						borderTop : 'solid thin transparent',
						'&.MuiGrid-root' : {
								paddingTop : 0,
						}
					}}
				>
					<Grid
						container
						spacing={0}
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						alignContent="stretch"
						wrap="wrap"
					>
						<Grid item xs={6}>
							<Grid
								container
								spacing={0}
								direction="row"
								justifyContent="flex-start"
								alignItems="flex-start"
								alignContent="stretch"
								wrap="wrap"
								sx={{
									borderRight : 'solid thin black',
								}}
							>
								<Grid item xs={5}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Daftar Cekal
									</Typography>
								</Grid>
								<Grid item xs={3}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : .5, }}
									>
									Tercantum
									</Typography>
								</Grid>
								<Grid item xs={1} sx={{ pl : 1, }}>
									<FillText text="" maxLength={1} />
								</Grid>
								<Grid item xs={2}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Tidak
									</Typography>
								</Grid>
								<Grid item xs={1}>
									<FillText text="" maxLength={1} />
								</Grid>
								<Grid item xs={6}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Kelainan Surat
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : .5, }}
									>
									Ada
									</Typography>
								</Grid>
								<Grid item xs={1} sx={{ pl : 1, }}>
									<FillText text="" maxLength={1} />
								</Grid>
								<Grid item xs={2}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Tidak
									</Typography>
								</Grid>
								<Grid item xs={1}>
									<FillText text="" maxLength={1} />
								</Grid>
								<Grid item xs={6}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Tanggal
									</Typography>
									<Stack
										direction="row"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									<FillText text="" maxLength={6} />
									</Stack>
								</Grid>
								<Grid item xs={2}>
								</Grid>
								<Grid item xs={4} px={1}>
									<Typography variant="body1" color="initial" fontSize={10}>Paraf Pejim,</Typography>
									<div style={{ minHeight : 70 }}></div>
									<Divider sx={{ bgcolor : 'black', }} />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Grid
								container
								spacing={0}
								direction="row"
								justifyContent="flex-start"
								alignItems="flex-start"
								alignContent="stretch"
								wrap="wrap"
								sx={{
									// borderRight : 'solid thin black',
								}}
							>
								<Grid item xs={6}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Persetujuan
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : .5, }}
									>
									Setuju
									</Typography>
								</Grid>
								<Grid item xs={1} sx={{ pl : 1, }}>
									<FillText text="" maxLength={1} />
								</Grid>
								<Grid item xs={2}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Tidak
									</Typography>
								</Grid>
								<Grid item xs={1}>
									<FillText text="" maxLength={1} />
								</Grid>
								<Grid item xs={12}>
									<FillBox text="" index={0} maxLength={1} style={{ border : "solid thin transparent", borderLeft : "solid thin transparent", }}/>
								</Grid>
								<Grid item xs={6}>
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									Tanggal
									</Typography>
									<Stack
										direction="row"
										sx={{ fontSize: "10px", pl : 1, }}
									>
									<FillText text="" maxLength={6} />
									</Stack>
								</Grid>
								<Grid item xs={2}>
								</Grid>
								<Grid item xs={4} px={1}>
									<Typography variant="body1" color="initial" fontSize={10}>KAKANIM,</Typography>
									<div style={{ minHeight : 70 }}></div>
									<Divider sx={{ bgcolor : 'black', }} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
      </Grid>
    </>
  );
}

function FillBox({text, style, index }) {
	return 	<span style={{ display : 'inline-flex', justifyContent : 'center', alignItems : 'center', alignContent : 'center', width : 17.5, height : 17.5, border : 'solid thin #555', borderLeft : index === 0 ? 'solid thin #555' : 'solid thin transparent', fontWeight : 700, ...style, }}>{text}</span>
}

function FillText({text, style, maxLength }) {
	const emptyString = []
	if(maxLength)
		for (let index = 0; index < maxLength - text.length; index++) {
			emptyString.push("")
		}
	if(typeof(text) != 'string')
		return ""
	return (
		<>
			{
				text.split("").map((item, index) => <FillBox index={index} text={item} style={{ fontSize : '10px', ...style }}/>)
			}
			{
				emptyString.map((item, index) => <FillBox index={text.length == 0 ? index : 1 } text={item} style={{ fontSize : '10px', ...style }}/>)
			}
		</>
	)	
}

export default VisaPDF2