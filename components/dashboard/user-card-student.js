import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';

function TextContainer({children}) {
	return (
			<Grid
				item
				lg={6}
				sm={12}
				xl={6}
				xs={12}
			>
				{children}
			</Grid>
	)	
}

export default () => {
	return (
		<Grid
			container
  		spacing={3}
			sx={{
				marginTop : '1rem'
			}}
		>
			<TextContainer>
				<Typography>Student Number</Typography>
				<Typography
						variant="h6"
				>0123456789</Typography>
			</TextContainer>
			<TextContainer>
				<Typography>Year Class</Typography>
				<Typography
						variant="h6"
				>2021</Typography>
			</TextContainer>
			<TextContainer>
				<Typography>Departement</Typography>
				<Typography
						variant="h6"
				>Economics Development</Typography>
			</TextContainer>
			<TextContainer>
				<Typography>Student Status</Typography>
				<Typography
						variant="h6"
				>Active</Typography>
			</TextContainer>
		</Grid>
	)	
}
