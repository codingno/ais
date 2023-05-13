import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tooltip from "@mui/material/Tooltip";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useState } from 'react'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router'
import Image from "next/image";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from '@mui/material/Typography'
import FormParent from "./FormParent";
import generator from 'generate-password';

import ImageWithLoader from "../../utils/ImageWithLoader";
import axios from 'axios'

export default function () {
	const router = useRouter()
  const { data: session, status } = useSession();

  const [old_password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [new_password, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [copiedNew, setCopiedNew] = useState(false);
  const [confirm_password, setConfirmNewPassword] = useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [copiedConfirmNew, setCopiedConfirmNew] = useState(false);
  const [modalNewPassword, setModalNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
	
	const generatePassword = () => generator.generate({
		length: 10,
		numbers: true
	});

	async function submitChangePassword() {
		if(!confirm('Are you sure to change the password?'))
			return
		try {
			setLoading(true)
			const url = '/api/change-password/' + session.user.userID
			const { data }	= await axios.post(url, { old_password, new_password, confirm_password })
			alert('Password successfully changed')
			setModalNewPassword(false)
			setLoading(false)
		} catch (error) {
			if(error.response) {
				alert(error.response.data)
			}	
			alert(error)
		}
	}


  return (
    <>
      {!session || router.pathname == '/master/college' ? (
        ""
      ) : (
        <Grid item xs={2} p={1}>
          <Card
            sx={{
              height: 400,
							bgcolor : 'primary.main',
							py : 5,
            }}
          >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
						<Avatar aria-label=""
							sx={{
									width:100,
									height:100,
									mb : 5,
							}}
						>
							{session.user.image && (
								<ImageWithLoader
									src={session.user.image}
									alt={session.user.name}
									width={150}
									// height={75}
									height={150}
									layout="fill"
									objectFit="contain"
								/>
							)}
						</Avatar>
						<Typography variant="h6" color="background.default">
						{session.user.name}
						</Typography>
						<Typography variant="body1" color="primary.dark">
							{session.user.email}
						</Typography>
						{
							session.user.student_number &&
							<>
							<Typography variant="body1" color="background.default" mt={3}>
								{session.user.student_number}
							</Typography>
							<Typography variant="body1" color="background.default">
								{session.user.studentData.entry_year}
							</Typography>
							<Typography variant="body1" color="background.default">
								Semester {session.user.semester_active}
							</Typography>
							</>
						}
						{
							router.pathname === '/' &&
						<Stack
							mt={3}
						>
							<Button variant="contained" color="secondary" component="span" onClick={() => setModalNewPassword(true)}>
								Change Password
							</Button>
						</Stack>
						}
					</Stack>
          </Card>
        </Grid>
      )}
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={modalNewPassword}
				onClose={() => setModalNewPassword(false)}
			>
				<Card
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 600,
						// bgcolor: 'background.paper',
						// border: '2px solid #000',
						// boxShadow: 24,
						p: 4,
					}}
				>
        <FormParent label="New Password">
					<FormControl sx={{ width: "65%" }} variant="outlined">
							<OutlinedInput
								id="outlined-adornment-password"
								type={showNewPassword ? 'text' : 'password'}
								value={new_password}
								onChange={e => setNewPassword(e.target.value)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={e => setShowNewPassword(!showNewPassword)}
											// onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showNewPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
											<CopyToClipboard 
												text={new_password} >
												<IconButton
													aria-label="toggle password visibility"
													onClick={e => setCopiedNew(!copiedNew)}
													// onMouseDown={handleMouseDownPassword}
													edge="end"
												>
													<Tooltip
														open={copiedNew}
														title={"Copied to clipboard!"}
														leaveDelay={1500}
														onClose={() => setCopiedNew(false)}
													>
													<ContentCopyIcon />
										</Tooltip>
												</IconButton>
											</CopyToClipboard>
										<IconButton
											aria-label="toggle password visibility"
											onClick={e => {
												setNewPassword(generatePassword())
												document.getElementById('renew-create-password').classList.add('spin-animation')	
												setTimeout(() => {
													document.getElementById('renew-create-password').classList.remove('spin-animation')	
												}, 1000)
											}}
											// onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											<AutorenewIcon id="renew-create-password" />
										</IconButton>
									</InputAdornment>
								}
								inputProps={{
										autoComplete: 'new-password'
								}}
								autocomplete="new-password"
								sx={{
									background: "#E0E0E0"
								}}
							/>
					</FormControl>
        </FormParent>
        <FormParent label="Confirm New Password">
					<FormControl sx={{ width: "65%" }} variant="outlined">
							<OutlinedInput
								id="outlined-adornment-password"
								type={showConfirmNewPassword ? 'text' : 'password'}
								value={confirm_password}
								onChange={e => setConfirmNewPassword(e.target.value)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={e => setShowConfirmNewPassword(!showConfirmNewPassword)}
											// onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								inputProps={{
										autoComplete: 'new-password'
								}}
								autocomplete="new-password"
								sx={{
									background: "#E0E0E0"
								}}
							/>
					</FormControl>
        </FormParent>
        <FormParent label="Current Password">
					<FormControl sx={{ width: "65%" }} variant="outlined">
							<OutlinedInput
								id="outlined-adornment-password"
								type={showPassword ? 'text' : 'password'}
								value={old_password}
								onChange={e => setPassword(e.target.value)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={e => setShowPassword(!showPassword)}
											// onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								inputProps={{
										autoComplete: 'new-password'
								}}
								autocomplete="new-password"
								sx={{
									background: "#E0E0E0"
								}}
							/>
					</FormControl>
        </FormParent>
				<FormParent>
        <Stack
          direction="row"
          alignItems="center"
          ml={5}
          mt={3}
          sx={{ width: "60%", display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: 150,
            }}
            startIcon={() => <></>}
						onClick={submitChangePassword}
          >
            Submit
          </Button>
        </Stack>
				</FormParent>
				</Card>
			</Modal>
			<Modal open={loading} onClose={() => setLoading(false)} sx={{ display : 'flex'}}>
				<CircularProgress sx={{ margin : "auto", }} /> 
			</Modal>
    </>
  );
}
