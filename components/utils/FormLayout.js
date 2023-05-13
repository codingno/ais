import Head from 'next/head';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { useState, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import MenuPopover from "./MenuPopover";
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

import FormContainer from "./FormContainer";
import TopMenu from "./TopMenu";
import Stack from "@mui/material/Stack";

import { useSession, signOut } from "next-auth/react"


export default function (props) {
	const { children, title, titlePage,  } = props
	const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>
					{title}
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
				<Grid
					container
					spacing={1}
					direction="row"
					justifyContent="center"
					alignItems="flex-start"
					alignContent="center"
					wrap="wrap"
					
				>
					
				<TopMenu />
        <Grid 
				item
				xs={10}
				p={1}
				>
          <Card
					sx={{
						// width : '80%',
						mx : 'auto',
					}}
					>
          <CardHeader
            title={
          <Typography variant="h5" gutterBottom pl={3}>
						{titlePage || title}
          </Typography>
						}
            subheader=""
          />
					<Divider />
					<Grid
						container
						spacing={1}
						direction="row"
						justifyContent="center"
						alignItems="center"
						alignContent="center"
						wrap="wrap"
							sx={{
								p : 3,
								width : '100%'
							}}
					>
						{children}
						</Grid>
					</Card>
        </Grid>
				</Grid>
      </Container>
    </>
  );
}
