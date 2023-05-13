import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


import FormContainer from "../../../../../components/utils/FormContainer";
import FormLayout from "../../../../../components/utils/FormLayout";
import FormParent from "../../../../../components/utils/FormParent";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

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

  const [father_name, setFatherName] = useState("");
  const [mother_name, setMotherName] = useState("");
  const [father_income, setFatherIncome] = useState("");
  const [mother_income, setMotherIncome] = useState("");

  const [user_id, setUserID] = useState("");
  const [student_number, setStudentNumber] = useState("");
  const [teacher_id, setTeacherID] = useState("");
  const [entry_year, setEntryYear] = useState("");
  const [entry_semester, setEntrySemester] = useState(entrySemesterOptions[0].id);
  const [entry_status, setEntryStatus] = useState(entryStatusOptions[0].id);
  const [departement_id, setDepartement] = useState("");
  const [status, setStatus] = useState("");

	const [studentData, setstudentData] = useState({})

  const [school_name, setSchoolName] = useState("");
  const [school_telp, setSchoolTelp] = useState("");
  const [school_address, setSchoolAddress] = useState("");
  const [school_departement, setSchoolDepartement] = useState("");
  const [school_end, setSchoolEnd] = useState("");

  const [campus_name, setCampusName] = useState("");
  const [campus_telp, setCampusTelp] = useState("");
  const [campus_address, setCampusAddress] = useState("");
  const [campus_departement, setCampusDepartement] = useState("");
  const [campus_end, setCampusEnd] = useState("");

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
				setstudentData(data.data)
				setFatherName(data.data.father_name)
				setMotherName(data.data.mother_name)
				setFatherIncome(data.data.father_income)
				setMotherIncome(data.data.mother_income)
				setSchoolName(data.data.school_name)
				setSchoolTelp(data.data.school_telp)
				setSchoolAddress(data.data.school_address)
				setSchoolDepartement(data.data.school_departement)
				setSchoolEnd(data.data.school_end)
				setCampusName(data.data.campus_name)
				setCampusTelp(data.data.campus_telp)
				setCampusAddress(data.data.campus_address)
				setCampusDepartement(data.data.campus_departement)
				setCampusEnd(data.data.campus_end)
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
			const sendData = {
				id,
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
				status,
				father_name,
				mother_name,
				father_income,
				mother_income,
				school_name,
				school_telp,
				school_address,
				school_departement,
				school_end,
				campus_name,
				campus_telp,
				campus_address,
				campus_departement,
				campus_end,
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
			const { data } = await axios.patch('/api/student', prepareData)
			alert("Student successfully updated.")
			router.back()
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
    <FormLayout title="Student Edit | AIS University" titlePage="Student History Edit">
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
          label="School Name"
          name="school_name"
          value={school_name}
          setValue={setSchoolName}
					width="95%"
        />
        <FormContainer
          label="School Phone"
          name="school_telp"
          value={school_telp}
          setValue={setSchoolTelp}
					width="95%"
        />
        <FormContainer
          label="School Address"
          name="school_address"
          value={school_address}
          setValue={setSchoolAddress}
					width="95%"
        />
        <FormContainer
          label="School Departement"
          name="school_departement"
          value={school_departement}
          setValue={setSchoolDepartement}
					width="95%"
        />
        <FormContainer
          label="School End"
          name="school_end"
          value={school_end}
          setValue={setSchoolEnd}
					width="95%"
        />
        {/* <FormContainer
          label="Date Of Birth"
          name="date_of_birth"
          value={date_of_birth}
          setValue={setDateOfBirth}
        /> */}
				{/* <FormParent label="Date Of Birth">
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
				</FormParent> */}
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
          label="Campus Name"
          name="campus_name"
          value={campus_name}
          setValue={setCampusName}
					width="90%"
        />
        <FormContainer
          label="Campus Phone"
          name="campus_telp"
          value={campus_telp}
          setValue={setCampusTelp}
					width="90%"
        />
        <FormContainer
          label="Campus Address"
          name="campus_address"
          value={campus_address}
          setValue={setCampusAddress}
					width="90%"
        />
        <FormContainer
          label="Campus Departement"
          name="campus_departement"
          value={campus_departement}
          setValue={setCampusDepartement}
					width="90%"
        />
        <FormContainer
          label="Campus End"
          name="campus_end"
          value={campus_end}
          setValue={setCampusEnd}
					width="90%"
        />
				</Stack>
			</Grid>
			</Grid>
    </FormLayout>
  );
}