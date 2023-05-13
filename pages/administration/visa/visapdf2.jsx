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
          my={0.25}
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
          <Stack sx={{ width: "100%", pl: '1%', py: "1%" }}>
						<Grid
							container
							spacing={0.75}
							direction="row"
							justifyContent="flex-start"
							alignItems="flex-start"
							alignContent="stretch"
							wrap="wrap"
						>
							<Grid item xs={4} sx={{ borderRight : 'solid thin black', paddingBottom : '1rem',}}>
								<Typography
									variant="body1"
									color="initial"
									sx={{ fontSize: "10px" }}
								>
									STATUS SIPIL *{" "} 
									<FillBox text={data?.status_sipil??""} index={0} style={{ marginLeft : '1.5rem', marginBottom : '-.5rem', }} />
								</Typography>
								<ol style={{ paddingLeft : '1rem', }}>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Kawin
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Tidak Kawin
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Cerai Mati
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Cerai Hidup
									</li>
								</ol>
							</Grid>
							<Grid item xs={4} sx={{ borderRight : 'solid thin black', paddingBottom : '1rem', }}>
								<Typography
									variant="body1"
									color="initial"
									sx={{ fontSize: "10px" }}
								>
									KATEGORI PENJAMIN *{" "} 
									<FillBox text={data?.kategori_penjamin??""} index={0} style={{ marginLeft : '1.5rem', marginBottom : '-.5rem', }} />
								</Typography>
								<ol style={{ paddingLeft : '1rem', }}>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Swasta
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Pemerintah
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Perorangan
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Organisasi Internasional
									</li>
								</ol>
							</Grid>
							<Grid item xs={4} >
								<Typography
									variant="body1"
									color="initial"
									sx={{ fontSize: "10px" }}
								>
									STATUS USAHA *{" "} 
									<FillBox text={data?.status_usaha??""} index={0} style={{ marginLeft : '1.5rem', marginBottom : '-.5rem', }} />
								</Typography>
								<ol style={{ paddingLeft : '1rem', }}>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Pegawai
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Anggota Keluarga
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Pemegang Saham
									</li>
									<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
									Lainnya
									</li>
								</ol>
							</Grid>
							<Grid item xs={12} sx={{ borderTop : 'solid thin black', }}>
								<Typography
									variant="body1"
									color="initial"
									sx={{ fontSize: "10px" }}
								>
									BIDANG PEKERJAAN *{" "} 
									<FillBox text={data?.bidang_pekerjaan??""} index={0} style={{ marginLeft : '1rem', marginBottom : '-.5rem', }} />
								</Typography>
								<Grid
									container
									spacing={1}
									direction="row"
									justifyContent="flex-start"
									alignItems="flex-start"
									alignContent="stretch"
									wrap="wrap"
									
								>
									<Grid item xs={3}>
										<ol style={{ paddingLeft : '1rem', }}>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											Perdagangan
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											Perindustrian
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											Pertambangan & Energi
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											Pekerjaan Umum
											</li>
										</ol>
									</Grid>	
									<Grid item xs={2.25}>
										<ol style={{ paddingLeft : '1rem', listStyle : 'none', }}>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											5. Pertanian
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											6. Kehutanan
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											7. Parpostel
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											8. Keuangan
											</li>
										</ol>
									</Grid>	
									<Grid item xs={3.75}>
										<ol style={{ paddingLeft : '1rem', listStyle : 'none', }}>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											9. Keagamaan/Rohaniawan
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											10. Sosial & Kesehatan
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											11. Pelajar / Mahasiswa
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											12. Pendidikan & Kebudayaan	
											</li>
										</ol>
									</Grid>	
									<Grid item xs={3}>
										<ol style={{ paddingLeft : '1rem', listStyle : 'none', }}>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											13. Perhubungan
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											14. Anggota Keluarga
											</li>
											<li style={{ fontSize: "10px", lineHeight: 1.25 }}>
											15. Lainnya
											</li>
										</ol>
									</Grid>	
								</Grid>
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
						'&.MuiGrid-root' : {
								paddingTop : 0,
						}
          }}
        >
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
              <Grid item xs={9.25}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								Bagi anak dengan penjamin satu orang tuanya WNI
                </Typography>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								Nomor KTP Ayah / Ibu
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={23} /> */}
                  <FillText text={data?.ktp_penjamin?.toString()?.toUpperCase()??""} maxLength={23} />
                </Stack>
              </Grid>
              <Grid item xs={2.75}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								&nbsp;
                </Typography>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", textAlign: "left" }}
                >
								Tanggal Dikeluarkan
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="center"
                  direction="row"
                >
                  {/* <FillText text={""} maxLength={6} /> */}
                  <FillText text={data ? moment(data.tgl_ktp).format('DDMMYY') : ''} maxLength={6} />
                </Stack>
              </Grid>
              <Grid item xs={9.25}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								Bagi anak yang lahir di Indonesia
                </Typography>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								Nomor Akte Kelahiran Anak
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={23} /> */}
                  <FillText text={data?.no_akte?.toString()?.toUpperCase()??""} maxLength={23} />
                </Stack>
              </Grid>
              <Grid item xs={2.75}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								&nbsp;
                </Typography>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", textAlign: "left" }}
                >
								Tanggal Dikeluarkan
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="center"
                  direction="row"
                >
                  <FillText text={data ? moment(data.tgl_akte).format('DDMMYY') : ''} maxLength={6} />
                </Stack>
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
						'&.MuiGrid-root' : {
								paddingTop : 0,
						}
          }}
        >
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
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								Seluruh keterangan dan data yang saya nyatakan dalam formulir ini adalah sah dan sesuain dengan keadaan yang sebenarnya, dan apabila di kemudian hari ternyata pernyataan ini tidak benar, saya bersedia dituntu sesuai ketentuan peraturan perundangan yang berlaku.
                </Typography>
              </Grid>
              <Grid item xs={12}>
								<Grid
									container
									spacing={0}
									direction="row"
									justifyContent="flex-start"
									alignItems="flex-start"
									alignContent="stretch"
									wrap="wrap"
								>
									<Grid item xs={2.5} sx={{ minHeight : 150, border : 'solid thin black', }}>
                <Stack
                  sx={{ width: "100%", 
									// my: 0.25 
									height : '100%',
									minHeight : 150,
								}}
                  justifyContent="center"
									alignItems="center"
									alignContent="center"
                  direction="column"
                >
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								PASFOTO
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								3 X 4
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								2 lembar
                </Typography>
								</Stack>
									</Grid>
									<Grid item xs={9.5} sx={{ mt : 1, }}>
										<Grid
											container
											spacing={0}
											direction="row"
											justifyContent="flex-start"
											alignItems="flex-start"
											alignContent="stretch"
											wrap="wrap"
											px={1}
										>
											<Grid item xs={5}>
												<Typography variant="body1" color="initial" fontSize={10}>Tanda tangan yang diberi kuasa</Typography>
												<div style={{ minHeight : 70 }}></div>
												<Divider sx={{ bgcolor : 'black', }} />
											</Grid>
											<Grid item xs={3.5}></Grid>
											<Grid item xs={3.5}>
												<Typography variant="body1" color="initial" fontSize={10}>Tanda tangan pemohon,</Typography>
												<div style={{ minHeight : 60 }}></div>
												<Typography variant="body1" color="initial" fontSize={10}>{data?.nama_lengkap?.toUpperCase()}</Typography>
												<Divider sx={{ bgcolor : 'black', }} />
											</Grid>
											<Grid item xs={12}>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  // justifyContent="flex-start"
                  justifyContent="space-between"
									alignContent="center"
									alignItems="center"
                  direction="row"
                >
									<Typography
										variant="body1"
										color="initial"
										sx={{ fontSize: "10px", }}
									>
									Nama yang diberi kuasa
									</Typography>
                  {/* <FillText text="" maxLength={18} /> */}
                  <FillText text={data?.nama_kuasa?.toUpperCase()??""} maxLength={18} />
                </Stack>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  // justifyContent="flex-start"
                  justifyContent="space-between"
									alignContent="center"
									alignItems="center"
                  direction="row"
                >
									<Typography
										variant="body1"
										color="initial"
										sx={{ fontSize: "10px", paddingRight : 4}}
									>
									Nomor KTP
									</Typography>
                  {/* <FillText text="" maxLength={18} /> */}
                  <FillText text={data?.ktp_kuasa?.toString()?.toUpperCase()??""} maxLength={18} />
                </Stack>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
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
						CATATAN PETUGAS LOKET
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
              // alignItems="flex-start"
              alignItems="center"
              alignContent="stretch"
              wrap="wrap"
            >
					<Grid item xs={12} sx={{ mb : 1, }}>
						<Typography
							variant="body1"
							color="initial"
							sx={{ fontSize: "10px", }}
						>
						Lampiran persyaratan :
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<FillBox text={""} index={0} style={{ marginLeft : '1rem', 
						// marginBottom : '-.5rem', 
						}} />
					</Grid>
					<Grid item xs={4} sx={{ alignItems : 'center', alignContent : 'center', }}>
						<Typography
							variant="body1"
							color="initial"
							sx={{ fontSize: "10px", }}
						>
						Surat Penjamin
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<FillBox text={""} index={0} style={{ marginLeft : '1rem', 
						// marginBottom : '-.5rem', 
						}} />
					</Grid>
					<Grid item xs={6} sx={{ alignItems : 'center', alignContent : 'center', }}>
						<Typography
							variant="body1"
							color="initial"
							sx={{ fontSize: "10px", }}
						>
						Surat Rekomendasi dari Instansi terkait
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<FillBox text={""} index={0} style={{ marginLeft : '1rem', 
						// marginBottom : '-.5rem', 
						}} />
					</Grid>
					<Grid item xs={4} sx={{ alignItems : 'center', alignContent : 'center', }}>
						<Typography
							variant="body1"
							color="initial"
							sx={{ fontSize: "10px", }}
						>
						Copy Akte Perkawinan/Surat Nikah
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<FillBox text={""} index={0} style={{ marginLeft : '1rem', 
						// marginBottom : '-.5rem', 
						}} />
					</Grid>
					<Grid item xs={6} sx={{ alignItems : 'center', alignContent : 'center', }}>
						<Typography
							variant="body1"
							color="initial"
							sx={{ fontSize: "10px", }}
						>
						Pasfoto Terbaru Latar Belakang Merah
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<FillBox text={""} index={0} style={{ marginLeft : '1rem', 
						// marginBottom : '-.5rem', 
						}} />
					</Grid>
					<Grid item xs={4} sx={{ alignItems : 'center', alignContent : 'center', }}>
						<Typography
							variant="body1"
							color="initial"
							sx={{ fontSize: "10px", }}
						>
						Copy Akte Kelahiran Anak
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<FillBox text={""} index={0} style={{ marginLeft : '1rem', 
						// marginBottom : '-.5rem', 
						}} />
					</Grid>
					<Grid item xs={6} sx={{ alignItems : 'center', alignContent : 'center', }}>
						<Typography
							variant="body1"
							color="initial"
							sx={{ fontSize: "10px", }}
						>
						Surat Kuasa/Kartu Tanda Pengenal Pengurusan Keimigrasian
						</Typography>
					</Grid>
					<Grid item xs={10}>
					</Grid>
					<Grid item xs={2} px={1}>
						<Typography variant="body1" color="initial" fontSize={10}>Paraf Petugas,</Typography>
						<div style={{ minHeight : 70 }}></div>
						<Divider sx={{ bgcolor : 'black', }} />
					</Grid>
						</Grid>
					</Stack>
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