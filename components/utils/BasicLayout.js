import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import Head from 'next/head';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import TopMenu from './TopMenu';

export default function ({ title, children }) {
  const router = useRouter();
	const { data: session, status } = useSession()

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
					{title || 'Home' } | AIS University
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
					{children}
				</Grid>
      </Container>
		</>
	)
}