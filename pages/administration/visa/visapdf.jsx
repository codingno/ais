import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { useSession } from 'next-auth/react'
import moment from 'moment'

// import { List, MenuItem } from '@mui/material'

function VisaPDF({data}) {

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
        <Grid item xs={8}>
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontSize: "12px", fontWeight: 700, lineHeight : 1, }}
          >
            KEMENTERIAN HUKUM DAN HAK ASASI MANUSIA RI
          </Typography>
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontSize: "12px", fontWeight: 700, lineHeight : 1, }}
          >
            KANTOR WILAYAH <span style={{ marginLeft : '2rem', display : 'inline-block' }}>{data?.kantor_wilayah??""}</span>
          </Typography>
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontSize: "12px", fontWeight: 700, lineHeight : 1, }}
          >
            KANTOR IMIGRASI <span style={{ marginLeft : '2rem', display : 'inline-block' }}>{data?.kantor_imigrasi??""}</span>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontSize: "12px", fontWeight: 700 }}
          >
            PERDIM :{ data?.perdim??" "}
          </Typography>
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontSize: "12px", fontWeight: 700 }}
          >
            NO :{ data?.no??" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontSize: "12px", fontWeight: 700 }}
          >
            FORMULIR IZIN TINGGAL TERBATAS DAN TETAP
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
            PERHATIAN
          </Typography>
          <Stack sx={{ width: "98%", pb : '.5%', }}>
            <ol style={{ listStyle : 'none', }}>
              <li style={{ fontSize: "12px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "10px", 
									lineHeight: 1,
								 }}
                >
                  1.&nbsp;&nbsp;Isi formulir dengan{" "}
                  <span style={{ fontWeight: 700 }}>HURUF CETAK</span> dan{" "}
                  <span style={{ fontWeight: 700 }}>TINTA HITAM</span>.
                </Typography>
              </li>
              <li style={{ fontSize: "12px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "10px", lineHeight: 1 }}
                >
                  2.&nbsp;Tanda asterisk (*) diisi sesuai pilihan.
                </Typography>
              </li>
              <li style={{ fontSize: "12px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "10px", lineHeight: 1 }}
                >
                  3.&nbsp;Kolom pekerjaan diisi lengkap sesuai surat keterangan dari
                  Depnaker atau instansi lain.
                </Typography>
              </li>
              <li style={{ fontSize: "12px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "10px", lineHeight: 1.5 }}
                >
                  4. Cara pengisian tanggal adalah dengan urutan
                  tanggal-bulan-tahun, masing-masing dinyatakan dengan dua
                  &nbsp;&nbsp;&nbsp;&nbsp;angka. CONTOH : 26 Januari 2008
                  <FillBox text={2} style={{ marginLeft: 5 }} index={0} />
                  <FillBox text={6} />
                  <FillBox text={0} />
                  <FillBox text={1} />
                  <FillBox text={0} />
                  <FillBox text={8} />
                </Typography>
              </li>
            </ol>
          </Stack>
        </Grid>
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
          <Stack
            sx={{ width: "98%" }}
            direction="row"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              color="initial"
              sx={{ fontSize: "10px", fontWeight: 700 }}
            >
              PERMOHONAN *
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              sx={{ fontSize: "10px", fontWeight: 700 }}
            >
              TGL PERMOHONAN
            </Typography>
          </Stack>
          <Stack sx={{ width: "98%", px: "2%", pt: "1%" }}>
            <ol type="A" style={{ listStyle : 'none', }}>
              <li style={{ fontSize: "12px" }}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  alignContent="stretch"
                  wrap="wrap"
                >
                  <Grid item xs={2.5}>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ fontSize: "10px" }}
                    >
                      A. BARU *{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {/* <FillBox text="" index={0} /> */}
                    <FillBox text={data?.jenis_permohonan == 1 ? data.lama_permohonan : ''} index={0} />
                  </Grid>
                  {/* <Grid item xs={0.5}>
                    :
                  </Grid> */}
                  <Grid item xs={2}>
                    <ol>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>
                        Itas 1 th
                      </li>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>
                        Itas 2 th
                      </li>
                    </ol>
                  </Grid>
                  <Grid item xs={3}>
                    <ol start="3" style={{ listStyle : 'none'}}>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>
                        3. Itas maks. 6 bln
                      </li>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>
                        4. Itap
                      </li>
                    </ol>
                  </Grid>
                  {/* <Grid item xs={1}>
								</Grid> */}
                  <Grid item xs={3.5}>
                    <Stack
                      sx={{ width: "100%" }}
                      justifyContent="flex-end"
                      direction="row"
                    >
											<FillText text={data ? moment(data.tgl_permohonan).format('DDMMYY') : ''} maxLength={6}/>
                      {/* <FillBox text="" style={{ marginLeft: 5 }} index={0} />
                      <FillBox text="" />
                      <FillBox text="" />
                      <FillBox text="" />
                      <FillBox text="" />
                      <FillBox text="" /> */}
                    </Stack>
                  </Grid>
                </Grid>
              </li>
              <li style={{ fontSize: "12px" }}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  alignContent="stretch"
                  wrap="wrap"
                >
                  <Grid item xs={2.5}>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ fontSize: "10px" }}
                    >
                      B. PERPANJANG *
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <FillBox text={data?.jenis_permohonan == 2 ? data.lama_permohonan : ''} index={0} />
                  </Grid>
                  <Grid item xs={2}>
                    <ol>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>
                        Itas 1 th
                      </li>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>
                        Itas 2 th
                      </li>
                    </ol>
                  </Grid>
                  <Grid item xs={3}>
                    <ol start="3" style={{ listStyle : 'none'}}>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>
                        3. Itas maks. 6 bln
                      </li>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>
                        4. Itap
                      </li>
                    </ol>
                  </Grid>
                  {/* <Grid item xs={1}>
								</Grid> */}
                  <Grid item xs={4}></Grid>
                </Grid>
              </li>
              <li style={{ fontSize: "12px" }}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  alignContent="stretch"
                  wrap="wrap"
                >
                  <Grid item xs={2.5}>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ fontSize: "10px" }}
                    >
                      C. DUPLIKAT *
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {/* <FillBox text="" index={0} /> */}
                    <FillBox text={data?.jenis_permohonan == 3 ? data.lama_permohonan : ''} index={0} />
                  </Grid>
                  <Grid item xs={2}>
                    <ol>
                      <li style={{ fontSize: "12px" }}>Kitas</li>
                    </ol>
                  </Grid>
                  <Grid item xs={2.5}>
                    <ol start="3" style={{ listStyle : 'none'}}>
                      <li style={{ fontSize: "12px" }}>2. Kitap</li>
                    </ol>
                  </Grid>
                  {/* <Grid item xs={1}>
								</Grid> */}
                  <Grid item xs={4}></Grid>
                </Grid>
              </li>
              <li style={{ fontSize: "12px" }}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  alignContent="stretch"
                  wrap="wrap"
                >
                  <Grid item xs={2.5}>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ fontSize: "10px" }}
                    >
                      D. ALIH STATUS
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {/* <FillBox text="" index={0} /> */}
                    <FillBox text={data?.jenis_permohonan == 4 ? data.lama_permohonan : ''} index={0} />
                  </Grid>
                  <Grid item xs={2.5}>
                    <ol>
                      <li style={{ fontSize: "12px" }}>Itas ke Itap</li>
                    </ol>
                  </Grid>
                  <Grid item xs={2.5}></Grid>
                  {/* <Grid item xs={1}>
								</Grid> */}
                  {/* <Grid item xs={4}>
								</Grid> */}
                </Grid>
              </li>
            </ol>
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
              <Grid item xs={9}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
                  NAMA LENGKAP
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  <FillText text={data?.nama_lengkap?.toUpperCase()??""} maxLength={24} />
                </Stack>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  <FillText text="" maxLength={24} />
                </Stack>
              </Grid>
              <Grid item xs={2.5}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px",  textAlign: "right" }}
                >
                  JENIS KELAMIN *
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-end"
                  direction="row"
                >
                  <Stack
                    sx={{ width: "100%", my: 0.25, pl: 3 }}
                    justifyContent="flex-start"
                    direction="row"
                  >
                    <FillText text="" maxLength={1} />
                  </Stack>
                  <Stack
                    sx={{ width: "100%", my: 0.25 }}
                    justifyContent="flex-start"
                    direction="row"
                  >
                    <ol>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>L</li>
                      <li style={{ fontSize: "12px", lineHeight: 1.25 }}>P</li>
                    </ol>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={9.25}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
									TEMPAT LAHIR
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  <FillText text={data?.tempat_lahir?.toUpperCase()??""} maxLength={23} />
                </Stack>
              </Grid>
              <Grid item xs={2.75}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", textAlign: "left" }}
                >
									TANGGAL LAHIR
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="center"
                  direction="row"
                >
                  <FillText text={data ? moment(data.tgl_lahir).format('DDMMYY') : ''} maxLength={6} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
									KEWARGANEGARAAN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text={data?.kewarganegaraan.toUpperCase()??""} maxLength={30} /> */}
                  <FillText text={"INDONESIA"} maxLength={30} />
                </Stack>
              </Grid>
              <Grid item xs={6.5}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								NOMOR PASPOR / DOKUMEN PERJALANAN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  <FillText text={data?.nomor_passport?.toUpperCase()??""} maxLength={16} />
                </Stack>
              </Grid>
              <Grid item xs={2.75}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", pl : 1, }}
                >
								TGL DIKELUARKAN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="center"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={6} /> */}
                  <FillText text={data ? moment(data.tgl_dikeluarkan).format('DDMMYY') : ''} maxLength={6} />
                </Stack>
              </Grid>
              <Grid item xs={2.75}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", pl : 1, }}
                >
								BERLAKU S/D
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="center"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={6} /> */}
                  <FillText text={data ? moment(data.berlaku_sampai).format('DDMMYY') : ''} maxLength={6} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								TEMPAT DIKELUARKAN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  <FillText text={data?.tempat_dikeluarkan?.toUpperCase()??""} maxLength={30} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								PEKERJAAN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={30} /> */}
                  <FillText text={data?.pekerjaan?.toUpperCase()??""} maxLength={30} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								ALAMAT KANTOR / PEKERJAAN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={30} /> */}
                  <FillText text={data?.alamat_pekerjaan?.toUpperCase()??""} maxLength={30} />
                </Stack>
                <Stack
                  sx={{ width: "98%", my: 0.25 }}
                  // justifyContent="flex-start"
                  justifyContent="space-between"
									alignContent="center"
									alignItems="center"
                  direction="row"
                >
                  <FillText text="" maxLength={13} />
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", px : .75, }}
									>
									TELP/HP
									</Typography>
                  {/* <FillText text="" maxLength={14} /> */}
                  <FillText text={data?.telpon_kantor?.toUpperCase()??""} maxLength={14} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								ALAMAT TEMPAT TINGGAL DI INDONESIA
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={30} /> */}
                  <FillText text={data?.alamat_tempat_tinggal?.toUpperCase()??""} maxLength={30} />
                </Stack>
                <Stack
                  sx={{ width: "98%", my: 0.25 }}
                  // justifyContent="flex-start"
                  justifyContent="space-between"
									alignContent="center"
									alignItems="center"
                  direction="row"
                >
                  <FillText text="" maxLength={13} />
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", px : .75, }}
									>
									TELP/HP
									</Typography>
                  {/* <FillText text="" maxLength={14} /> */}
                  <FillText text={data?.telpon?.toUpperCase()??""} maxLength={30} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								ALAMAT EMAIL PENJAMIN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={30} /> */}
                  <FillText text={data?.alamat_email_penjamin?.toUpperCase()??""} maxLength={30} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								NAMA PENJAMIN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={30} /> */}
                  <FillText text={data?.nama_penjamin?.toUpperCase()??""} maxLength={30} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontSize: "10px", }}
                >
								ALAMAT PENJAMIN
                </Typography>
                <Stack
                  sx={{ width: "100%", my: 0.25 }}
                  justifyContent="flex-start"
                  direction="row"
                >
                  {/* <FillText text="" maxLength={30} /> */}
                  <FillText text={data?.alamat_penjamin?.toUpperCase()??""} maxLength={30} />
                </Stack>
                <Stack
                  sx={{ width: "98%", my: 0.25 }}
                  // justifyContent="flex-start"
                  justifyContent="space-between"
									alignContent="center"
									alignItems="center"
                  direction="row"
                >
                  <FillText text="" maxLength={13} />
									<Typography
										variant="h6"
										color="initial"
										sx={{ fontSize: "10px", px : .75, }}
									>
									TELP/HP
									</Typography>
                  {/* <FillText text="" maxLength={14} /> */}
                  <FillText text={data?.telpon_penjamin?.toUpperCase()??""} maxLength={14} />
                </Stack>
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

export default VisaPDF