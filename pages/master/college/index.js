import Head from 'next/head';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import plusFill from '@iconify/icons-eva/plus-fill';

import { useState, useRef, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import MenuPopover from "../../../components/utils/MenuPopover";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

import TopMenu from "../../../components/utils/TopMenu";
import StackContainer from '../../../components/utils/StackContainer';
import Stack from "@mui/material/Stack";

import editFill from '@iconify/icons-eva/edit-fill';
import { Icon } from '@iconify/react';
import CardMedia from '@mui/material/CardMedia'

import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

import axios from 'axios';

export default function () {
	const router = useRouter()
	const { data: session, status } = useSession()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [code, setCode] = useState("")
	const [ptCode, setPtCode] = useState("")
	const [address1, setAddress1] = useState("")
	const [address2, setAddress2] = useState("")
	const [city, setCity] = useState("")
	const [postCode, setPostCode] = useState("")
	const [phone, setPhone] = useState("")
	const [fax, setFax] = useState("")
	const [decisionLetter, setDecisionLetter] = useState("")
	const [since, setSince] = useState("")
	const [site, setSite] = useState("")
	const [ptStartDate, setPtStartDate] = useState("")

	useEffect(() => {
		getCollegeData()
	},[])

	async function getCollegeData() {
		try {
			const { data } = await axios.get('/api/college?id=1')
			const collegeData = data.data
			setName(collegeData.name)
			setEmail(collegeData.email)
			setCode(collegeData.code)
			setPtCode(collegeData.pt_code)
			setAddress1(collegeData.address_1)
			setAddress2(collegeData.address_2)
			setCity(collegeData.city)
			setPostCode(collegeData.post_code)
			setPhone(collegeData.phone)
			setFax(collegeData.fax)
			setDecisionLetter(collegeData.decision_letter)
			setSince(collegeData.since)
			setSite(collegeData.site)
			setPtStartDate(collegeData.pt_start_date)
		} catch (error) {
			if(error.response) {
				if(error.response.status = 404)
					return
				alert(error.response.data)
			}
			else	
				alert(error)
		}	
	}

	useEffect(() => {
		if(!session && status == `unauthenticated`)
			router.push('/auth/signin')
	},[session, status])	
	if(status === 'loading' || status === 'unauthenticated')
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
    <>
      <Head>
        <title>
					College
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Container maxWidth="xl"
				sx={{
					bgcolor : '#C7C9C7'
				}}
			>
				<TopMenu />
        <Grid 
				xs={12}
				// container 
				// spacing={0}
				>
          <Card
					sx={{
						// width : '100%',
						mx : 'auto',
					}}
					>
					<Grid
						container
						spacing={1}
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						alignContent="stretch"
						wrap="wrap"
						p={5}	
					>
          {/* <CardHeader
            title="University Identity"
            subheader=""
          /> */}
          <Typography variant="h5" gutterBottom>
						University Identity
          </Typography>
					<Button
						variant="contained"
						color="primary"
						startIcon={
							<Icon icon={editFill} width={24} height={24} />
						}
						// sx={{
						// 	mr : 3
						// }}
						onClick={() => {
							router.push('/master/college/edit')
						}}
					>
						Edit	
					</Button>
					</Grid>
					<Divider />
					<Grid
						container
						spacing={1}
						direction="row"
						justifyContent="space-between"
						alignItems="flex-start"
						alignContent="stretch"
						wrap="wrap"
						
					>
					<Grid
						// container
						spacing={1}
						direction="row"
						justifyContent="center"
						alignItems="center"
						alignContent="center"
						wrap="wrap"
						xs={7}
							sx={{
								p : 3,
								// width : '100%'
							}}
					>
								<StackContainer label="Name" name="name" value={name} setValue={setName} />
								<StackContainer label="College Code" name="pt_code" value={ptCode} setValue={setPtCode} />
								<StackContainer label="Code" name="code" value={code} setValue={setCode} />
								<StackContainer label="Address 1" name="address_1" value={address1} setValue={setAddress1} />
								<StackContainer label="Address 2" name="address_2" value={address2} setValue={setAddress2} />
								<StackContainer label="City" name="city" value={city} setValue={setCity} />
								<StackContainer label="Post Code" name="postCode" value={postCode} setValue={setPostCode} />
						</Grid>
					<Grid
						// container
						spacing={1}
						direction="row"
						justifyContent="center"
						alignItems="center"
						alignContent="center"
						wrap="wrap"
						xs={5}
							sx={{
								p : 3,
								// width : '100%'
							}}
					>
						
							<Stack mb={4} 
								sx={{
									width : 640
								}}
							>
								<StackContainer label="Phone" name="phone" value={phone} setValue={setPhone} />
								<StackContainer label="Fax" name="fax" value={fax} setValue={setFax} />
								<StackContainer label="Decision Letter" name="decision_letter" value={decisionLetter} setValue={setDecisionLetter} />
								<StackContainer label="Since" name="since" value={since} setValue={setSince} />
								<StackContainer label="Email" name="email" value={email} setValue={setEmail} />
								<StackContainer label="Site" name="site" value={site} setValue={setSite} />
								<StackContainer label="College Start Date" name="pt_start_date" value={ptStartDate} setValue={setPtStartDate} />
							</Stack>
						</Grid>
					</Grid>
					</Card>
        </Grid>
      </Container>
    </>
  );
}
