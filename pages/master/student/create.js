import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


import FormContainer from "../../../components/utils/FormContainer";
import FormLayout from "../../../components/utils/FormLayout";
import FormParent from "../../../components/utils/FormParent";
import alertError from "../../../utils/alertError";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import generator from 'generate-password';


export default function () {
  const router = useRouter();
	const { data: session, status : statusSession } = useSession()

  const entryStatusOptions = [
    {
      id: 1,
      name: "NEW",
    },
    {
      id: 2,
      name: "TRANSFER",
    },
  ];
  const entrySemesterOptions = [
    {
      id: 1,
      name: 1,
    },
    {
      id: 2,
      name: 2,
    },
  ];
  const genderOptions = [
    {
      id: 1,
      name: "MAN",
    },
    {
      id: 2,
      name: "WOMAN",
    },
  ];
  const residenceOptions = ["With parents", "Boarding house", "Hostel", "Others"]
  const transportOptions = ["Public transportation", "Private cars", "Shuttle buses", "Bicycles", "Motorbikes", "Others"]
  const [identityTypeOptions, setIdentityTypeOptions] = useState([]);
  const [religionOptions, setReligionOptions] = useState([]);
  const [departementOptions, setDepartementOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [financeStatusOptions, setFinanceStatusOptions] = useState([]);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [place_of_birth, setPlaceOfBirth] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(genderOptions[0].id);
  const [identity_id, setIdentityID] = useState("");
  const [identity_type_id, setIdentityType] = useState("");
  const [religion, setReligion] = useState("");

  const [user_id, setUserID] = useState("");
  const [student_number, setStudentNumber] = useState("");
  const [teacher_id, setTeacherID] = useState(null);
  const [entry_year, setEntryYear] = useState("");
  const [entry_semester, setEntrySemester] = useState(
    entrySemesterOptions[0].id
  );
  const [entry_status, setEntryStatus] = useState(entryStatusOptions[0].id);
  const [departement_id, setDepartement] = useState("");
  const [status, setStatus] = useState("");
  const [financeStatus, setFinanceStatus] = useState("");

  const [residence_type, setResidenceType] = useState(residenceOptions[0]);
  const [transport, setTransport] = useState(transportOptions[0]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error_fields, setErrorFields] = useState({})

  function deleteErrorField(field) {
    setErrorFields( p => { 
      delete p[field] 
      return p
    })
  }

	const generatePassword = () => generator.generate({
		length: 10,
		numbers: true
	});

  useEffect(() => {
    if (teacherOptions.length == 0) getTeacher();
  }, [teacherOptions, departement_id]);

  async function getTeacher() {
    if (departement_id != "") {
      try {
        setLoading(true)
        const { data } = await axios.get("/api/teacher");
        const teachers = data.data.map(item => {
					item.name = item.user.name
					return item
				}).filter(
          (item) => item.departement_id == departement_id
        );
        setTeacherOptions(teachers);
        setLoading(false)
      } catch (error) {
        alertError(error)
      }
    }
  }

  useEffect(() => {
    if (departementOptions.length == 0) getDepartement();
  }, [departementOptions]);

  async function getDepartement() {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/departement");
      setDepartementOptions(data.data);
      setLoading(false)
    } catch (error) {
      alertError(error)
    }
  }

  useEffect(() => {
    if (identityTypeOptions.length == 0) getIdentityType();
  }, [identityTypeOptions]);

  async function getIdentityType() {
    try {
      const { data } = await axios.get("/api/identity-type");
      setIdentityTypeOptions(data.data);
      setIdentityType(data.data[0]?.id)
    } catch (error) {
      alertError(error)
    }
  }

  useEffect(() => {
    if (statusOptions.length == 0) getStudentStatus();
  }, [statusOptions]);

  async function getStudentStatus() {
    try {
      const { data } = await axios.get("/api/student-status");
      setStatusOptions(data.data);
      setStatus(data.data[0]?.id)
    } catch (error) {
      alertError(error)
    }
  }

  useEffect(() => {
    if (financeStatusOptions.length == 0) getFinanceStatus();
  }, [financeStatusOptions]);

  async function getFinanceStatus() {
    try {
      const { data } = await axios.get("/api/finance-status");
      setFinanceStatusOptions(data.data);
      setFinanceStatus(data.data[0]?.id)
    } catch (error) {
      alertError(error)
    }
  }

  useEffect(() => {
    if (religionOptions.length == 0) getReligion();
  }, [religionOptions]);

  async function getReligion() {
    try {
      const { data } = await axios.get("/api/religion");
      setReligionOptions(data.data);
      setReligion(data.data[0]?.id)
    } catch (error) {
      alertError(error)
    }
  }

  async function submitStudent() {
    try {
      setLoading(true)
      const sendData = {
				first_name,
				last_name,
				middle_name,
        place_of_birth,
        date_of_birth,
        gender,
        identity_id,
        identity_type_id,
        student_number,
        teacher_id,
        entry_year,
        entry_semester,
        entry_status,
        departement_id,
        status,
				email,
				username,
				password,
				financial_type_id: financeStatus,
				religion,
				role_id : 4,
        residence_type,
        transport,
      };

      let countErr = 0
      const not_required = ["role_id", "middle_name", "last_name", "teacher_id"]
      Object.keys(sendData).map(x => {
        if (not_required.indexOf(x) >= 0) {
          console.log("ini x except: ", x)
          return
        }
        
        console.log(`🚀 ~ file: create.js:258 ~ Object.keys ~ sendData[x]`, sendData[x])
        if ( sendData[x] == "" ) {
          console.log("ini x required: ", x)
          setErrorFields(prev => ({...prev, [x] : true }))
          countErr++
        }
      })

      if ( countErr > 0 ) {
        setLoading(false)
        return
      }

      const { data } = await axios.post("/api/student", sendData);
      setLoading(true)
      alert("Student successfully created.");
      router.back();
    } catch (error) {
      if (error.response?.data?.toLowerCase().includes("email"))
        if (error.response?.data?.includes("exist"))
          setErrorFields(prev => ({...prev, email : "Email already exists" }))
        else
          setErrorFields(prev => ({...prev, email : error.response.data }))
      if (error.response?.data?.toLowerCase().includes("username") && error.response?.data?.includes("exist"))
          setErrorFields(prev => ({...prev, username : "Username already exists" }))

      alertError(error)
      setLoading(false)
      // if (error.response) {
      //   alert(error.response.data);
      // }
      // alert(error);
    }
  }

	useEffect(() => {
		if(!session && statusSession == `unauthenticated`)
			router.push('/auth/signin')
	},[session, statusSession])	
	if(statusSession === 'loading' || statusSession === 'unauthenticated')
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
    <FormLayout title="Student Create | AIS University" titlePage="Student Create">
      {/* <Stack
        mb={4}
        sx={{
          width: 640,
        }}
      > */}
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
				{/* <FormControl component="fieldset">
					<FormLabel component="legend"></FormLabel>
					<FormGroup>
						
					</FormGroup>
					<FormHelperText></FormHelperText>
				</FormControl> */}
        <FormContainer
          label="Student Number"
          name="student_number"
          value={student_number}
          // setValue={setStudentNumber}
          onChange={v => { setStudentNumber(v); deleteErrorField("student_number")}}
          error={!!error_fields["student_number"]}
          helper={error_fields["student_number"] && "Please enter student number"}
        />
        <FormContainer
          label="Entry Year"
          name="entry_year"
					type="number"
          value={entry_year}
          // setValue={setEntryYear}
          onChange={v => { setEntryYear(v); deleteErrorField("entry_year")}}
          error={!!error_fields["entry_year"]}
          helper={error_fields["entry_year"] && "Please fill entry year"}
        />
        <FormParent label="Entry Semester">
          <Select
            displayEmpty
            value={entry_semester}
            onChange={(e) => { setEntrySemester(e.target.value); deleteErrorField("entry_year") }}
            inputProps={{ "aria-label": "Without label" }}
          >
            {entrySemesterOptions.length > 0 &&
              entrySemesterOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Entry Status">
          <Select
            displayEmpty
            value={entry_status}
            onChange={(e) => { setEntryStatus(e.target.value); deleteErrorField("entry_status") }}
            inputProps={{ "aria-label": "Without label" }}
          >
            {entryStatusOptions.length > 0 &&
              entryStatusOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Study Program">
          <Stack direction="column">
          <Select
            displayEmpty
            value={departement_id}
            onChange={(e) => { setDepartement(e.target.value); deleteErrorField("departement_id") }}
            error={!!error_fields["departement_id"]}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {departementOptions.length > 0 &&
              departementOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
         {error_fields["departement_id"] && <FormHelperText sx={{ color : "red", }}>Please choose a Study Program for student</FormHelperText>}
          </Stack>
        </FormParent>
        <FormParent label="Lecturer Academic">
          <Select
            displayEmpty
            value={teacher_id}
            onChange={(e) => setTeacherID(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            {teacherOptions.length > 0 &&
              teacherOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
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
            {statusOptions.length > 0 &&
              statusOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Finance Status">
          <Select
            displayEmpty
            value={financeStatus}
            onChange={(e) => setFinanceStatus(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            {financeStatusOptions.length > 0 &&
              financeStatusOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormContainer
          label="Email"
          name="email"
          value={email}
          // setValue={setEmail}
          onChange={ v => { setEmail(v); deleteErrorField("email") } } 
          error={ !!error_fields["email"] }
          // helper={ error_fields["email"] && ( error_fields["email"] || "Please enter email address" )  }
          helper={ typeof(error_fields["email"]) == "string" ? error_fields["email"] : "Please enter email address" }
        />
        <FormContainer
          label="Username"
          name="username"
          value={username}
          // setValue={setUsername}
          onChange={ v => { setUsername(v); deleteErrorField("username") } }
          error={ !!error_fields["username"] }
          // helper={ error_fields["username"] && ( error_fields["username"] || "Please choose username" ) }
          helper={ typeof(error_fields["username"]) == "string" ? error_fields["username"] : "Please choose username" }
        />
        <FormParent label="Password">
				 {/* <TextField
					 id="password"
					 type={ showPassword ? "password" : "text" }
					 value={password}
					 onChange={e => setPassword(e.target.value)}
					 
				 />
					<IconButton className="show-password" onClick={() => setShowPassword(!showPassword)} edge="end" sx={{position:'absolute', padding:'0.35rem'}}>
						<Icon icon={showPassword ? eyeFill : eyeOffFill} />
					</IconButton> */}
      <FormControl sx={{ width: "65%" }} variant="outlined">
					<OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            error={!!error_fields["password"]}
            onChange={e => { setPassword(e.target.value); deleteErrorField("password") }}
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
									<CopyToClipboard 
										text={password} >
										<IconButton
											aria-label="toggle password visibility"
											onClick={e => setCopied(!copied)}
											// onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											<Tooltip
												open={copied}
												title={"Copied to clipboard!"}
												leaveDelay={1500}
												onClose={() => setCopied(false)}
											>
											<ContentCopyIcon />
								</Tooltip>
										</IconButton>
									</CopyToClipboard>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={e => {
										setPassword(generatePassword())
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
          {error_fields["password"] && <FormHelperText sx={{ color : "red", }}>Please enter a password or click random and copy the generated password</FormHelperText>}
			</FormControl>
        </FormParent>
				</Stack>
				</Grid>
				<Grid	item xs={6}	>
      <Stack
        mb={4}
        sx={{
          width: "100%",
        }}
      >
        <FormContainer
          label="First Name"
          name="first_name"
          value={first_name}
          // setValue={setFirstName}
          onChange={v => { setFirstName(v); deleteErrorField("first_name")}}
          error={!!error_fields["first_name"]}
          helper={error_fields["first_name"] && "Please enter first name"}
          
        />
        <FormContainer
          label="Middle Name"
          name="middle_name"
          value={middle_name}
          setValue={setMiddleName}
          // onChange={v => { setMiddleName(v); deleteErrorField("middle_name")}}
          // error={!!error_fields["middle_name"]}
          // helper={error_fields["middle_name"] && "Please enter middle name"}
        />
        <FormContainer
          label="Last Name"
          name="last_name"
          value={last_name}
          setValue={setLastName}
          // onChange={v => { setLastName(v); deleteErrorField("last_name")}}
          // error={!!error_fields["last_name"]}
          // helper={error_fields["last_name"] && "Please enter middle name"}
        />
        <FormContainer
          label="Place Of Birth"
          name="place_of_birth"
          value={place_of_birth}
          // setValue={setPlaceOfBirth}
          onChange={v => { setPlaceOfBirth(v); deleteErrorField("place_of_birth")}}
          error={!!error_fields["place_of_birth"]}
          helper={error_fields["place_of_birth"] && "Please enter a place of birth"}
        />
        {/* <FormContainer
          label="Date Of Birth"
          name="date_of_birth"
          value={date_of_birth}
          setValue={setDateOfBirth}
        /> */}
				<FormParent label="Date Of Birth">
          <Stack direction="column">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								inputFormat="MM/dd/yyyy"
								// label="Date Of Birth"
								name="date_of_birth"
								value={date_of_birth}
								// onChange={setDateOfBirth}
                onChange={v => { setDateOfBirth(v); deleteErrorField("date_of_birth")}}
                error={!!error_fields["date_of_birth"]}
								renderInput={(params) => <TextField {...params} 
								sx={{
									width : '65%',
								}}
								/>}
							/>
					</LocalizationProvider>
         {error_fields["date_of_birth"] && <FormHelperText sx={{ color : "red", }}>Please choose date of birth</FormHelperText>}
          </Stack>
				</FormParent>
        <FormParent label="Gender">
          <Select
            displayEmpty
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {genderOptions.length > 0 &&
              genderOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Religion">
          <Select
            displayEmpty
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {religionOptions.length > 0 &&
              religionOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormContainer
          label="Identity Number"
          name="identity_id"
          value={identity_id}
          // setValue={setIdentityID}
          onChange={v => { setIdentityID(v); deleteErrorField("identity_id")}}
          error={!!error_fields["identity_id"]}
          helper={error_fields["identity_id"] && "Please enter identity number"}
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
            {identityTypeOptions.length > 0 &&
              identityTypeOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
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
            disabled={loading}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
			</Grid>
			</Grid>
        <Modal
          open={loading}
          // onClose={() => setLoading(false)}
          sx={{ display: "flex" }}
        >
          <CircularProgress sx={{ margin: "auto" }} />
        </Modal>
    </FormLayout>
  );
}
