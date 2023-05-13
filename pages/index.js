import Head from 'next/head';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { useState, useRef, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

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

import TopMenu from "../components/utils/TopMenu";
import StackContainer from '../components/utils/StackContainer';
import Stack from "@mui/material/Stack";

import editFill from '@iconify/icons-eva/edit-fill';
import { Icon } from '@iconify/react';
import CardMedia from '@mui/material/CardMedia'

import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import Scrollbar from '../components/Scrollbar';

import List from '../components/utils/List'

function groupByKey(array, key) {
   return array
     .reduce((hash, obj) => {
       if(obj[key] === undefined) return hash; 
       return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
     }, {})
}

export default function () {
	const router = useRouter()
	const { data: session, status } = useSession()

	const [info, setInfo] = useState({})

	useEffect(() => {
		if(status === 'authenticated')
			getInfo()
	},[status])

	async function getInfo() {
		try {
			const { data }	 = await axios.get(`/api/info?start_date=lte${new Date()}&end_date=gte${new Date()}`)
			// const filtered = data.filter(item => new Date(item.start_date) <= new Date() && new Date(item.end_date) >= new Date())
			const result = groupByKey(data, "position")
			setInfo(result)
		} catch (error) {
			alert(error)	
		}	
	}

	useEffect(() => {
		if(!session && status == `unauthenticated`)
			router.push('/auth/signin')
	},[session, status])	

	if(!session)
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
    <>
      <Head>
        <title>
					Home | AIS University
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Container maxWidth="xl"
				sx={{
					bgcolor : '#C7C9C7',
				}}
			>
				<Grid
					container
					spacing={1}
					direction="row"
					justifyContent="center"
					alignItems="center"
					alignContent="center"
					wrap="wrap"
					// sx={{
					// 	pt: 3,
					// }}
				>
					<TopMenu />
					<Grid xs={10} item>
						<Card
							// sx={{ bgcolor : '#003B5C', height : 400, m : 1}}
							sx={{ bgcolor : '#003B5C', height : '50%', m : 1, minHeight : '450px'}}
							>
								<Stack
									direction="row"
									justifyContent="space-around"
									alignItems="center"
									alignContent="center"
									mt={3}
								>
									<Card className="reflection-faculty" sx={{ borderRadius : '10px', width : '20%', pb : '13.4%', position : 'relative', backgroundImage : "url('/static/image1.jpg')", backgroundRepeat : 'no-repeat', backgroundSize : 'contain', overflow : 'visible', backgroundColor : 'transparent' }}>
										{/* <Image layout="fill" src="/static/FIS.jpg" alt="FIS" /> */}
									</Card>
									<Card className="reflection-faculty" sx={{ borderRadius : '10px', width : '20%', pb : '13.4%', position : 'relative', backgroundImage : "url('/static/image3.jpg')", backgroundRepeat : 'no-repeat', backgroundSize : 'cover', backgroundPosition : '45%', overflow : 'visible', backgroundColor : 'transparent' }}>
										{/* <Image layout="fill" src="/static/FEB.jpg" alt="FEB" /> */}
									</Card>
									<Card className="reflection-faculty" sx={{ borderRadius : '10px', width : '20%', pb : '13.4%', position : 'relative', backgroundImage : "url('/static/image2.jpg')", backgroundRepeat : 'no-repeat', backgroundSize : 'contain', overflow : 'visible', backgroundColor : 'transparent' }}>
										{/* <Image layout="fill" src="/static/FSS.jpg" alt="FSS" /> */}
									</Card>
									<Card className="reflection-faculty" sx={{ borderRadius : '10px', width : '20%', pb : '13.4%', position : 'relative', backgroundImage : "url('/static/image4.jpg')", backgroundRepeat : 'no-repeat', backgroundSize : 'cover', backgroundPosition : '60%', overflow : 'visible', backgroundColor : 'transparent' }}>
										{/* <Image layout="fill" src="/static/FEDu.jpg" alt="FEDu" /> */}
									</Card>
								</Stack>
								{
									info.Calendar &&
								<Stack
									direction="column"
									justifyContent="flex-start"
									alignItems="start"
									alignContent="center"
									mt={3}
								>
									<Typography variant="h3" color="#6098B7" sx={{ zIndex : 2, pl : 3 }}>Calendar Academics</Typography>
									<Carousel
									duration={10}
													sx={{
														width : '90%',
														pt : 1,
														pl : 3,
													}}
									>
										{
											info.Calendar.map((item, key) => (
												<Stack
													key={key}
												>
													<Typography variant="h6" color="white" >{item.name}</Typography>
													<Typography variant="body1" color="white" >{item.description}</Typography>
												</Stack>
											))
										}
									</Carousel>
								</Stack>
								}
						</Card>
					</Grid>
					{
						!session &&
					<Grid xs={3} item>
						<Card
							sx={{ bgcolor : '#84754E', height : 400, m : 1}}
							>
						</Card>
					</Grid>
					}
					<Grid xs={5} item>
						<Card
							sx={{ bgcolor : '#E3A130', height : 400, m : 1}}
							>
								{
									info.Guides &&
									<>
								<Typography variant="h4" color="primary" sx={{ pt : 4, pl : 3 }}>Academic Guides</Typography>
								<Scrollbar>
									<Stack spacing={2} sx={{ p: 3, pr: 0 }}>
										{info.Guides.map((news, key) => (
											<Stack key={key} direction="row" justifyContent="space-between" alignItems="center" spacing={2}
											sx={{ width : '100%'}}
											>
												{/* <Box
													component="img"
													alt={news.name}
													src={image}
													sx={{ width: 48, height: 48, borderRadius: 1.5 }}
												/> */}
												<Box sx={{ minWidth: 240 }}>
													{/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
														<Typography variant="h6" noWrap 
														// color="primary" 
														sx={{ color : "#31261D"}}
														>
															{news.name}
														</Typography>
													{/* </Link> */}
													<Typography variant="body2" color="primary" >
														{news.description}
													</Typography>
												</Box>
												<Typography variant="caption" sx={{ pr: 3, flexShrink: 0, }} color="primary">
													{/* {formatDistance(postedAt, new Date())} */}
													{new Date(news.createdAt).toLocaleString()}
												</Typography>
											</Stack>
										))}
									</Stack>
								</Scrollbar>
									</>
								}
						</Card>
					</Grid>
					<Grid xs={7} item>
						<Card
							sx={{ bgcolor : '#00778B', height : 400, m : 1}}
							>
								{
									info.News &&
									<>
								<Typography variant="h4" color="white" sx={{ pt : 4, pl : 3 }}>News Update</Typography>
								<Scrollbar>
									<Stack spacing={2} sx={{ p: 3, pr: 0 }}>
										{info.News.map((news, key) => (
											<Stack key={key} direction="row" alignItems="center" spacing={2} 
											sx={{ width : '100%'}}
											>
												{/* <Box
													component="img"
													alt={news.name}
													src={image}
													sx={{ width: 48, height: 48, borderRadius: 1.5 }}
												/> */}
												<Box sx={{ minWidth: 240 }}>
													{/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
														<Typography variant="h6" noWrap color="primary.dark">
															{news.name}
														</Typography>
													{/* </Link> */}
													<Typography variant="body2" sx={{ color: 'white' }} noWrap>
														{news.description}
													</Typography>
												</Box>
												<Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'white' }}>
													{/* {formatDistance(postedAt, new Date())} */}
													{new Date(news.createdAt).toLocaleString()}
												</Typography>
											</Stack>
										))}
									</Stack>
								</Scrollbar>
									</>
								}
						</Card>
					</Grid>
				</Grid>
      </Container>
    </>
  );
}
