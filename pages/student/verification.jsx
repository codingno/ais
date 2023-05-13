import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import FormContainer from "../../components/utils/FormContainer";
import FormLayout from "../../components/utils/FormLayout";
import FormParent from "../../components/utils/FormParent";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react"

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
	const [identityTypeOptions, setIdentityTypeOptions] = useState([])
  const [religionOptions, setReligionOptions] = useState([]);
	const [departementOptions, setDepartementOptions] = useState([])
	const [teacherOptions, setTeacherOptions] = useState([])
	const [statusOptions, setStatusOptions] = useState([])
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
  const [teacher_id, setTeacherID] = useState("");
  const [entry_year, setEntryYear] = useState("");
  const [entry_semester, setEntrySemester] = useState(entrySemesterOptions[0].id);
  const [entry_status, setEntryStatus] = useState(entryStatusOptions[0].id);
  const [departement_id, setDepartement] = useState("");
  const [status, setStatus] = useState("");
  const [financeStatus, setFinanceStatus] = useState("");

	const [studentData, setstudentData] = useState({})

	const [tabValue, setTabValue] = useState("1")
  console.log(`🚀 ~ file: verification.jsx ~ line 91 ~ tabValue`, tabValue)

	const [studentHistory, setStudentHistory] = useState({})

  useEffect(() => {
    getStudentData();
  }, [session]);

  async function getStudentData() {
    if (session) {
      try {
        const { data } = await axios.get(`/api/student?id=${session.user.studentData.id}`);
        console.log(`🚀 ~ file: [id].js ~ line 80 ~ getStudentData ~ data`, data)
  			setFirstName(data.data.user_info.first_name);
  			setLastName(data.data.user_info.last_name);
  			setMiddleName(data.data.user_info.middle_name);
  			setPlaceOfBirth(data.data.user_info.place_of_birth);
  			setDateOfBirth(data.data.user_info.date_of_birth);
				const genderGet = genderOptions.filter(item => item.name == (data.data.user_info.gender == 'MAN' ? 'Male' : 'Female'))[0].id
  			setGender(genderGet);
  			setIdentityID(data.data.user_info.identity_id);
  			setIdentityType(data.data.user_info.identity_type_id);

  			setUserID(data.data.user_id);
  			setStudentNumber(data.data.student_number);
  			setEntryYear(data.data.entry_year);
				const entrySemesterGet = entrySemesterOptions.filter(item => item.name == data.data.entry_semester)[0].id
  			setEntrySemester(entrySemesterGet);
				const entryStatusGet = entryStatusOptions.filter(item => item.name == data.data.entry_status)[0].id
  			setEntryStatus(entryStatusGet);
  			setTeacherID(data.data.teacher_id);
  			setDepartement(data.data.departement_id);
  			setStatus(data.data.status);
  			setFinanceStatus(data.data.financial_type_id);
  			setReligion(data.data.user_info.religion || "");
				setstudentData(data.data)
				const history = {
					school_name : data.data.school_name,
					school_address : data.data.school_address,
					school_telp : data.data.school_telp,
					school_departement : data.data.school_departement,
					school_end : data.data.school_end,
					campus_name : data.data.campus_name,
					campus_address : data.data.campus_address,
					campus_telp : data.data.campus_telp,
					campus_departement : data.data.campus_departement,
					campus_end : data.data.campus_end,
					father_name : data.data.father_name,
					father_income : data.data.father_income,
					mother_name : data.data.mother_name,
					mother_income : data.data.mother_income,
				}
				setStudentHistory(history)
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

  useEffect(() => {
    if (financeStatusOptions.length == 0) getFinanceStatus();
  }, [financeStatusOptions]);

  async function getFinanceStatus() {
    try {
      const { data } = await axios.get("/api/finance-status");
      setFinanceStatusOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (religionOptions.length == 0) getReligion();
  }, [religionOptions]);

  async function getReligion() {
    try {
      const { data } = await axios.get("/api/religion");
      setReligionOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

	async function submitStudent() {
		if(window.confirm("Are you sure to confirm?")) 
		try {
			const sendData = {
				id : session.user.studentData.id,
				first_name,
				last_name,
				middle_name,
				place_of_birth,
				date_of_birth,
				gender,
				identity_id,
				identity_type_id,
				user_id,
				student_number,
				teacher_id,
				entry_year,
				entry_semester,
				entry_status,
				departement_id,
				status : 1,
				financial_type_id: financeStatus,
				religion,
				...studentHistory,
			}	
			let prepareData = {
				...studentData,
				user_info : {
					...sendData,
				},
				user : {
					...studentData.user,
					name : first_name + ' ' + middle_name + ' ' + last_name,
				},
				...sendData,
			}
			await axios.patch('/api/student', prepareData)
			alert("Student successfully updated.")
			// await update((prev) => { return {...prev, user : { ...prev.user, status : 1,  }}})
			// signOut({callbackUrl : '/auth/signin'})
			// router.push("/")
			const { data } = await axios.get("/api/auth/session?update")
      console.log(`🚀 ~ file: verification.jsx ~ line 306 ~ submitStudent ~ data`, data)
			router.reload()
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
		if(session)
			if(session.user.studentData.status)
				router.push('/')
	},[session, statusSession])	
	if(statusSession === 'loading' || statusSession === 'unauthenticated')
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>
	if(statusSession === 'authenticated')
		if(session.user.studentData.status)
			return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
    <FormLayout title="Student Verification | AIS University" titlePage="Student Verification">
      {/* <Stack
        mb={4}
        sx={{
          width: 640,
        }}
      > */}
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={tabValue}>
					{/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={setTabValue} aria-label="lab API tabs example">
							<Tab label="Academic" value="1" />
							<Tab label="Personal" value="2" />
							<Tab label="Educational Background" value="3" />
							<Tab label="Contact" value="4" />
						</TabList>
					</Box> */}
			<TabPanel value="1">
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
        <FormContainer
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
				{/* <FormParent label="Status">
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
        <FormParent label="Finance Status">
          <Select
            displayEmpty
            value={financeStatus}
            onChange={(e) => setFinanceStatus(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {financeStatusOptions.length > 0 &&
              financeStatusOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormContainer
          label="Father Name"
          name="father_name"
          value={studentHistory.father_name}
          setValue={(v) => setStudentHistory({ ...studentHistory, father_name: v})}
        />
        <FormContainer
          label="Father's occupation"
          name="father_income"
					// type="number"
					type="text"
          value={studentHistory.father_income}
          setValue={(v) => setStudentHistory({ ...studentHistory, father_income: v})}
        />
        <FormContainer
          label="Mother Name"
          name="mother_name"
          value={studentHistory.mother_name}
          setValue={(v) => setStudentHistory({ ...studentHistory, mother_name: v})}
        />
        <FormContainer
          label="Mother's occupation"
          name="mother_income"
					// type="number"
					type="text"
          value={studentHistory.mother_income}
          setValue={(v) => setStudentHistory({ ...studentHistory, mother_income: v})}
        />
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
        <FormContainer
          label="Date Of Birth"
          name="date_of_birth"
          value={date_of_birth}
          setValue={setDateOfBirth}
        />
				<FormParent label="Date Of Birth"
				>
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
				<FormParent label="Gender"
				>
					<Select
						displayEmpty
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						{genderOptions.length > 0 && genderOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
        <FormParent label="Religion"
				>
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
          setValue={setIdentityID}
        />
				<FormParent label="Identity Type"
				>
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
      </Stack>
			</Grid>
				<Grid	item xs={6}	>
      <Stack
        mb={4}
        sx={{
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          ml={5}
          mt={3}
          sx={{ width: "60%", display: "flex", justifyContent: "flex-start" }}
        >
          {/* <Button
            variant="contained"
            color="primary"
            sx={{
              width: 150,
            }}
            startIcon={() => <></>}
						onClick={() => setTabValue(tabValue-1)}
          >
						Before
          </Button> */}
        </Stack>
				</Stack>
				</Grid>
				<Grid	item xs={6}	>
      <Stack
        mb={4}
        sx={{
          width: "100%",
        }}
      >
      <Stack
        mb={4}
        sx={{
          width: "80%",
					// ml:5,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          ml={5}
          mt={3}
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: 150,
            }}
            startIcon={() => <></>}
						onClick={() => setTabValue((parseInt(tabValue)+1).toString())}
          >
						Next
          </Button>
        </Stack>
				</Stack>
				</Stack>
				</Grid>
			</Grid>
			</TabPanel>
			<TabPanel value="2">
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
        <FormContainer
          label="School Name"
          name="school_name"
          value={studentHistory.school_name}
          setValue={(v) => setStudentHistory({ ...studentHistory, school_name : v})}
					width="90%"
        />
        <FormContainer
          label="School Phone"
          name="school_telp"
          value={studentHistory.school_telp}
          setValue={(v) => setStudentHistory({ ...studentHistory, school_telp: v})}
					width="90%"
        />
        <FormContainer
          label="School Address"
          name="school_address"
          value={studentHistory.school_address}
          setValue={(v) => setStudentHistory({ ...studentHistory, school_address: v})}
					width="90%"
        />
        <FormContainer
          label="School Departement"
          name="school_departement"
          value={studentHistory.school_departement}
          setValue={(v) => setStudentHistory({ ...studentHistory, school_departement: v})}
					width="90%"
        />
        <FormContainer
          label="School End"
          name="school_end"
          value={studentHistory.school_end}
          setValue={(v) => setStudentHistory({ ...studentHistory, school_end: v})}
					width="90%"
        />
				</Stack>
				</Grid>
				<Grid	item xs={6}	>
				<Stack
					mb={4}
				>
        <FormContainer
          label="Campus Name"
          name="campus_name"
          value={studentHistory.campus_name}
          setValue={(v) => setStudentHistory({ ...studentHistory, campus_name: v})}
					justifyContent="flex-end"
					width="90%"
        />
        <FormContainer
          label="Campus Phone"
          name="campus_telp"
          value={studentHistory.campus_telp}
          setValue={(v) => setStudentHistory({ ...studentHistory, campus_telp: v})}
					justifyContent="flex-end"
					width="90%"
        />
        <FormContainer
          label="Campus Address"
          name="campus_address"
          value={studentHistory.campus_address}
          setValue={(v) => setStudentHistory({ ...studentHistory, campus_address: v})}
					justifyContent="flex-end"
					width="90%"
        />
        <FormContainer
          label="Campus Departement"
          name="campus_departement"
          value={studentHistory.campus_departement}
          setValue={(v) => setStudentHistory({ ...studentHistory, campus_departement: v})}
					justifyContent="flex-end"
					width="90%"
        />
        <FormContainer
          label="Campus End"
          name="campus_end"
          value={studentHistory.campus_end}
          setValue={(v) => setStudentHistory({ ...studentHistory, campus_end: v})}
					justifyContent="flex-end"
					width="90%"
        />
				</Stack>
			</Grid>
				<Grid	item xs={6}	>
      <Stack
        mb={4}
        sx={{
          width: "100%",
        }}
      >
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
						onClick={() => setTabValue((parseInt(tabValue)-1).toString())}
          >
						Before
          </Button>
        </Stack>
				</Stack>
				</Grid>
				<Grid	item xs={6}	>
      <Stack
        mb={4}
        sx={{
          width: "100%",
        }}
      >
      <Stack
        mb={4}
        sx={{
          width: "90%",
					ml:5,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          mt={3}
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
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
						Confirm
          </Button>
        </Stack>
				</Stack>
			</Stack>
				</Grid>
			</Grid>
			</TabPanel>
			</TabContext>
			</Box>
    </FormLayout>
  );
}