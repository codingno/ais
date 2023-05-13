import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tooltip from "@mui/material/Tooltip";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Input from '@mui/material/Input';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


import FormContainer from "../../../../../components/utils/FormContainer";
import FormLayout from "../../../../../components/utils/FormLayout";
import FormParent from "../../../../../components/utils/FormParent";
import ImageWithLoader from "../../../../../utils/ImageWithLoader";
import alertError from "../../../../../utils/alertError";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import generator from 'generate-password';

export default function () {
	const router = useRouter()
	const { data: session, status : statusSession } = useSession()

  const { id } = router.query;

	const entryStatusOptions = [
		{
			id : 1,
			name : 'NEW',
		},
		{
			id : 2,
			name : 'TRANSFER',
		},
	]
	const entrySemesterOptions = [
		{
			id : 1,
			name : 1,
		},
		{
			id : 2,
			name : 2,
		},
	]
	const genderOptions = [
		{
			id : 1,
			name : 'Male',
		},
		{
			id : 2,
			name : 'Female',
		},
	]
	const marriageOptions = [
		{
			id : 1,
			name : 'Married',
		},
		{
			id : 2,
			name : 'Single',
		},
		{
			id : 3,
			name : 'Single Parent',
		},
	]
  const residenceOptions = ["With parents", "Boarding house", "Hostel", "Others"]
  const transportOptions = ["Public transportation", "Private cars", "Shuttle buses", "Bicycles", "Motorbikes", "Others"]
	const [identityTypeOptions, setIdentityTypeOptions] = useState([])
	const [departementOptions, setDepartementOptions] = useState([])
	const [teacherOptions, setTeacherOptions] = useState([])
	const [statusOptions, setStatusOptions] = useState([])

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [place_of_birth, setPlaceOfBirth] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(genderOptions[0].id);
  const [identity_id, setIdentityID] = useState("");
  const [identity_type_id, setIdentityType] = useState("");
  const [expiredVisa, setExpiredVisa] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [home_address, setHomeAdress] = useState("");

  const [father_name, setFatherName] = useState("");
  const [mother_name, setMotherName] = useState("");
  const [father_income, setFatherIncome] = useState("");
  const [mother_income, setMotherIncome] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [emergency_contact, setEmergencyContact] = useState("");
  const [marriage_status , setMarriageStatus ] = useState(entrySemesterOptions[1].id);

  const [residence_type, setResidenceType] = useState(residenceOptions[0]);
  const [transport, setTransport] = useState(transportOptions[0]);

  const [user_id, setUserID] = useState("");
  const [student_number, setStudentNumber] = useState("");
  const [teacher_id, setTeacherID] = useState("");
  const [entry_year, setEntryYear] = useState("");
  const [entry_semester, setEntrySemester] = useState(entrySemesterOptions[0].id);
  const [entry_status, setEntryStatus] = useState(entryStatusOptions[0].id);
  const [departement_id, setDepartement] = useState("");
  const [status, setStatus] = useState("");
  const [attachment, setAttachment] = useState("");
  const [currentAttachment, setCurrentAttachment] = useState("");

	const [studentData, setstudentData] = useState({})

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [copiedNew, setCopiedNew] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [copiedConfirmNew, setCopiedConfirmNew] = useState(false);
  const [modalNewPassword, setModalNewPassword] = useState(false);
	
	const generatePassword = () => generator.generate({
		length: 10,
		numbers: true
	});

	const uploadImage = async (folderTarget, courseImage) => new Promise(async (resolve, reject) => {
    if (courseImage === "") return null;

    const formData = new FormData();

    formData.append('folderTarget', folderTarget);
    formData.append('uploads', courseImage);
    console.log(`🚀 ~ file: [id].js ~ line 98 ~ uploadImage ~ courseImage`, courseImage)
    try {
      const file = await axios.post("/api/upload", formData);
			return resolve(file)
    } catch (error) {
      console.log(`🚀 ~ file: [id].js ~ line 102 ~ uploadImage ~ error`, error)
      alert(error);
			return reject(error)
    }
  });

	const uploadFormHandle = e => {
		if(e.target.files[0]) {
			const file = e.target.files[0]	
			setAttachment(file)
			// setCourseImage(file)
		}
	}

  useEffect(() => {
    getStudentData();
  }, [id]);

  async function getStudentData() {
    if (id) {
      try {
        const { data } = await axios.get(`/api/student?id=${id}`);
        console.log(`🚀 ~ file: [id].js ~ line 80 ~ getStudentData ~ data`, data)
  			setFirstName(data.data.user_info.first_name);
  			setLastName(data.data.user_info.last_name);
  			setMiddleName(data.data.user_info.middle_name);
  			setPlaceOfBirth(data.data.user_info.place_of_birth);
  			setDateOfBirth(data.data.user_info.date_of_birth);
				const genderGet = genderOptions.filter(item => item.name == (data.data.user_info.gender == 'MAN' ? 'Male' : 'Female'))[0]?.id
  			setGender(genderGet);
  			setIdentityID(data.data.user_info.identity_id);
  			setIdentityType(data.data.user_info.identity_type_id);
  			setExpiredVisa(data.data.user_info.expiredVisa);
  			setEmail(data.data.user.email);
  			setRegion(data.data.user_info.region);
  			setHomeAdress(data.data.user_info.home_address);

  			setUserID(data.data.user_id);
  			setStudentNumber(data.data.student_number);
  			setEntryYear(data.data.entry_year);
				const entrySemesterGet = entrySemesterOptions.filter(item => item.name == data.data.entry_semester)[0]?.id
  			setEntrySemester(entrySemesterGet);
				const entryStatusGet = entryStatusOptions.filter(item => item.name == data.data.entry_status)[0]?.id
  			setEntryStatus(entryStatusGet);
  			setTeacherID(data.data.teacher_id);
  			setDepartement(data.data.departement_id);
  			setStatus(data.data.status);
				setstudentData(data.data)
				setFatherName(data.data.father_name)
				setMotherName(data.data.mother_name)
				setFatherIncome(data.data.father_income)
				setMotherIncome(data.data.mother_income)
				setMobileNumber(data.data.mobile_number)
				setEmergencyContact(data.data.emergency_contact)
				const entryMarriageStatus = marriageOptions.filter(item => item.name == data.data.marriage_status)[0]?.id
  			setMarriageStatus(entryMarriageStatus);
  			setResidenceType(data.data.residence_type);
  			setTransport(data.data.transport);
				setCurrentAttachment(data.data.user.image)
				if(data.data.user.image)
					setAttachment({ name : data.data.user.image})
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) return;
          alert(error.response.data);
        }
        alert(error);
      }
    }
  }


	useEffect(() => {
		if(teacherOptions.length == 0)
			getTeacher()
	},[teacherOptions,departement_id])

	async function getTeacher() {
		if(departement_id != "")
		try {
			const { data } = await axios.get('/api/teacher')
			const teachers = data.data.filter(item => item.departement_id == departement_id)
			teachers.map(item => { item.name = item.user.name})
			setTeacherOptions(teachers)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(departementOptions.length == 0)
			getDepartement()
	},[departementOptions])

	async function getDepartement() {
		try {
			const { data } = await axios.get('/api/departement')
			setDepartementOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(identityTypeOptions.length == 0)
			getIdentityType()
	},[identityTypeOptions])

	async function getIdentityType() {
		try {
			const { data } = await axios.get('/api/identity-type')
			setIdentityTypeOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(statusOptions.length == 0)
			getStudentStatus()
	},[statusOptions])

	async function getStudentStatus() {
		try {
			const { data } = await axios.get('/api/student-status')
			setStatusOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	async function submitStudent() {
		try {
			let attachmentData = attachment
			let imageName = ""
			let imageUrl = null
			// const fileForm = listForm.filter(item => item.type === 'file')[0]
			const fileForm = {
					label : 'File',
					name : 'file',
					value : 'url',
					type : 'file',
					path: "profile",
				}
				if(attachment.name !== currentAttachment) {
					if(attachment) {
					const uploadedFile = await uploadImage(fileForm.path, attachment)
					attachmentData = uploadedFile.data
					imageName = attachmentData.replace('files','')
					// imageUrl = (process.env.NODE_ENV !== 'production' ? 'http://localhost:3535' : window.location.host) + imageName
					imageUrl = (process.env.NODE_ENV !== 'production' ? 'http://localhost:3535' : ('https://' + window.location.host)) + imageName
					console.log(`🚀 ~ file: [id].js ~ line 243 ~ submitStudent ~ imageName`, imageName)
					alert("uploaded")
					}
				}

			const sendData = {
				id,
				place_of_birth,
				date_of_birth,
				gender,
				identity_id,
				identity_type_id,
				expiredVisa,
				region,
				home_address,
				user_id,
				student_number,
				teacher_id,
				entry_year,
				entry_semester,
				entry_status,
				departement_id,
				status,
				father_name,
				mother_name,
				father_income,
				mother_income,
				mobile_number,
				emergency_contact,
				marriage_status,
				email,
        residence_type,
        transport,
				// password,
				// newPassword,
				// confirmNewPassword,
			}	
			let prepareData = {
				...studentData,
				user_info : {
					...sendData,
				},
				user : {
					...studentData.user,
					name : first_name + ' ' + middle_name + ' ' + last_name,
					email,
					// image : imageName,
					// image : imageUrl,
				},
				...sendData,
			}
			if(imageUrl)
				prepareData.user.image = imageUrl
			await axios.patch('/api/student', prepareData)
			alert("Student successfully updated.")
			const { data } = await axios.get("/api/auth/session?update")
      console.log(`🚀 ~ file: [id].js ~ line 296 ~ submitStudent ~ data`, data)
			router.back()
		} catch (error) {
			alertError(error)
			// if(error.response) {
			// 	alert(error.response.data)
			// }	
			// alert(error)
		}	
	}

	async function submitChangePassword() {
		try {
			const url = '/api/password/change/' + session.user.userID
			const { data }	= await axios.post(url, { password, newPassword, confirmNewPassword })
			alert('Password successfully changed')
		} catch (error) {
			if(error.response) {
				alert(error.response.data)
			}	
			alert(error)
		}
	}

	useEffect(() => {
		if(!session && statusSession == `unauthenticated`)
			router.push('/auth/signin')
	},[session, statusSession])	
	if(statusSession === 'loading' || statusSession === 'unauthenticated')
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormLayout title="Student Edit | AIS University" titlePage="Student Personal Edit">
			<Grid
				container
				spacing={1}
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start"
				alignContent="stretch"
				wrap="wrap"
				
			>
				<Grid	item xs={6}	>
      <Stack
        mb={4}
        sx={{
          width: "100%",
        }}
      >
        {/* <FormContainer
          label="Student Number"
          name="student_number"
          value={student_number}
          setValue={setStudentNumber}
        />
        <FormContainer
          label="Entry Year"
          name="entry_year"
          value={entry_year}
          setValue={setEntryYear}
        />
				<FormParent label="Entry Semester">
					<Select
						displayEmpty
						value={entry_semester}
						onChange={(e) => setEntrySemester(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						{entrySemesterOptions.length > 0 && entrySemesterOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Entry Status">
					<Select
						displayEmpty
						value={entry_status}
						onChange={(e) => setEntryStatus(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						{entryStatusOptions.length > 0 && entryStatusOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Study Program">
					<Select
						displayEmpty
						value={departement_id}
						onChange={(e) => setDepartement(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{departementOptions.length > 0 && departementOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Lecturer Academic">
					<Select
						displayEmpty
						value={teacher_id}
						onChange={(e) => setTeacherID(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{teacherOptions.length > 0 && teacherOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Status">
					<Select
						displayEmpty
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{statusOptions.length > 0 && statusOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent> */}
        <FormContainer
          label="First Name"
          name="first_name"
          value={first_name}
          setValue={setFirstName}
        />
        <FormContainer
          label="Middle Name"
          name="middle_name"
          value={middle_name}
          setValue={setMiddleName}
        />
        <FormContainer
          label="Last Name"
          name="last_name"
          value={last_name}
          setValue={setLastName}
        />
        <FormContainer
          label="Place Of Birth"
          name="place_of_birth"
          value={place_of_birth}
          setValue={setPlaceOfBirth}
        />
        {/* <FormContainer
          label="Date Of Birth"
          name="date_of_birth"
          value={date_of_birth}
          setValue={setDateOfBirth}
        /> */}
				<FormParent label="Date Of Birth">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								inputFormat="MM/dd/yyyy"
								// label="Date Of Birth"
								name="date_of_birth"
								value={date_of_birth}
								onChange={setDateOfBirth}
								renderInput={(params) => <TextField {...params} 
								sx={{
									width : '65%',
								}}
								/>}
							/>
					</LocalizationProvider>
				</FormParent>
				<FormParent label="Gender">
					<Select
						displayEmpty
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						{genderOptions.length > 0 && genderOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
        <FormContainer
          label="Identity Number"
          name="identity_id"
          value={identity_id}
          setValue={setIdentityID}
        />
				<FormParent label="Identity Type">
					<Select
						displayEmpty
						value={identity_type_id}
						onChange={(e) => setIdentityType(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{identityTypeOptions.length > 0 && identityTypeOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				{
					identity_type_id == 2 &&
					<>
				<FormParent 
				label="Expired Visa"
				name="expiredVisa"
				>
					<DesktopDatePicker 
						// label="Date&Time picker"
						value={expiredVisa}
						onChange={setExpiredVisa}
						renderInput={(params) => <TextField {...params} />}
					/>
				</FormParent>
        <FormContainer
          label="Nationality"
          name="region"
          value={region}
          setValue={setRegion}
        />
					</>
				}
				<FormParent label="Status">
					<Select
						displayEmpty
						value={marriage_status}
						onChange={(e) => setMarriageStatus(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{marriageOptions.length > 0 && marriageOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
        <FormParent label="Residence Type">
          <Select
            displayEmpty
            value={residence_type}
            onChange={(e) => setResidenceType(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {
              residenceOptions.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Transportation">
          <Select
            displayEmpty
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {
              transportOptions.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
          </Select>
        </FormParent>
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
						onClick={submitStudent}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
				</Grid>
				<Grid	item xs={6}	>
				<Stack
					mb={4}
				>
        <FormContainer
          label="Email"
          name="email"
          value={email}
          setValue={setEmail}
        />
        <FormContainer
          label="Home Address"
          name="home_address"
          value={home_address}
          setValue={setHomeAdress}
        />
        <FormContainer
          label="Mobile Number"
          name="mobile_number"
          value={mobile_number}
          setValue={setMobileNumber}
        />
        <FormContainer
          label="Emergency Contact"
          name="emergency_contact"
          value={emergency_contact}
          setValue={setEmergencyContact}
        />
        <FormContainer
          label="Father Name"
          name="father_name"
          value={father_name}
          setValue={setFatherName}
        />
        <FormContainer
          label="Father's occupation"
          name="father_income"
					type="text"
					// type="number"
          value={father_income}
          setValue={setFatherIncome}
        />
        <FormContainer
          label="Mother Name"
          name="mother_name"
          value={mother_name}
          setValue={setMotherName}
        />
        <FormContainer
          label="Mother's occupation"
          name="mother_income"
					// type="number"
					type="text"
          value={mother_income}
          setValue={setMotherIncome}
        />
				<FormParent label="Upload your recent photo">
					<label htmlFor="contained-button-file">
						<Input
							id="contained-button-file"
							// multiple
							type="file"
							sx={{ display: "none" }}
							onChange={uploadFormHandle}
						/>
						<Button variant="contained" component="span">
							Upload File
						</Button>
						{
							attachment ?
							attachment.name && 
							<p style={{ marginTop: "10px" }}>
								( {attachment.name.split("/").pop().split("-").pop()} )
							</p> 
							: ""
						}
					</label>
					<p style={{ marginLeft : "10px"}}>
						{
							currentAttachment &&
							<ImageWithLoader src={currentAttachment} alt={currentAttachment.split("/").pop().split("-").pop()} width={100} height={100} />
						}
					</p>
				</FormParent>
				{/* <FormParent>
						<Button variant="contained" component="span" onClick={() => setModalNewPassword(true)}>
							Change Password
						</Button>
				</FormParent> */}
				</Stack>
			</Grid>
			</Grid>
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
								value={newPassword}
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
												text={newPassword} >
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
								value={confirmNewPassword}
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
								value={password}
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
    </FormLayout>
		</LocalizationProvider>
  );
}