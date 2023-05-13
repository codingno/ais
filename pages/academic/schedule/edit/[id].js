import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from "moment";

import FormContainer from "../../../../components/utils/FormContainer";
import FormLayout from "../../../../components/utils/FormLayout";
import FormParent from "../../../../components/utils/FormParent";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

export default function () {
	const router = useRouter()
	const { data: session, status : statusSession } = useSession()

  const { id } = router.query;
  console.log(`🚀 ~ file: [id].js ~ line 25 ~ id`, id)

	const statusOptions = [
		{
			label : 'ACTIVE',
			value : 1,
		},
		{
			label : 'NON ACTIVE',
			value : 2,
		},
	]
	const [studyTypeOptions, setStudyTypeOptions] = useState([])
	const [facultyOptions, setFacultyOptions] = useState([])

	const [departementOptions, setDepartementOptions] = useState([])
	const [courseOptions, setCourseOptions] = useState([])
	const [dayOptions, setDayOptions] = useState([])
	const [roomOptions, setRoomOptions] = useState([])
	const [teacherOptions, setTeacherOptions] = useState([])

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [studyType, setStudyType] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState(statusOptions[0].value);
  const [courseCredits, setCourseCredits] = useState("");

  const [academic_year_id, setAcademicYear] = useState("");
  const [departement_id, setDepartement] = useState("");
  const [course_id, setCourse] = useState("");
  const [day_id, setDay] = useState("");
  const [room_id, setRoom] = useState("");
  const [teacher_id, setTeacher] = useState("");
  const [teacher_2_id, setTeacher2] = useState("");
  const [semester, setSemester] = useState("");
  const [start_time, setStartTime] = useState(new Date());
  const [end_time, setEndTime] = useState(moment().add(50, 'minutes'));

  const [scheduleData, setScheduleData] = useState({});

	useEffect(() => {
		if(id)
			getScheduleData()
	},[id])

	async function getScheduleData() {
		try {
			const { data } = await axios.get(`/api/academic-schedule?id=${id}`);
			const result = data.data
      console.log(`🚀 ~ file: [id].js ~ line 72 ~ getScheduleData ~ data`, data)
			setScheduleData(result)
			setAcademicYear(result.academic_year_id)
			setDepartement(result.departement_id)
			setFaculty(result.departement.faculty_id)
			setCourse(result.course_id)
			setDay(result.day_id)
			setRoom(result.room_id)
			setTeacher(result.teacher_id)
			setTeacher2(result.teacher_2_id)
			setSemester(result.semester)
			setStartTime(result.start_time)
			setEndTime(result.end_time)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(dayOptions.length == 0)
			getDays()
	},[dayOptions])

	async function getDays() {
		try {
			const { data } = await axios.get('/api/day')
			setDayOptions(data.data)
      console.log(`🚀 ~ file: create.js ~ line 65 ~ getDays ~ data.data`, data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(roomOptions.length == 0)
			getrooms()
	},[roomOptions])

	async function getrooms() {
		try {
			const { data } = await axios.get('/api/room')
			setRoomOptions(data.data)
      console.log(`🚀 ~ file: create.js ~ line 65 ~ getDays ~ data.data`, data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(facultyOptions.length == 0)
			getFaculties()
	},[facultyOptions])

	async function getFaculties() {
		try {
			const { data } = await axios.get('/api/faculty')
			setFacultyOptions(data.data)
      console.log(`🚀 ~ file: create.js ~ line 65 ~ getFaculties ~ data.data`, data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
			getDepartement()
	},[faculty])

	async function getDepartement() {
		if(faculty != '') {
			try {
				const { data } = await axios.get('/api/departement?faculty_id='+faculty)
				setDepartementOptions(data.data)
				console.log(`🚀 ~ file: create.js ~ line 84 ~ getDepartement ~ data.data`, data.data)
			} catch (error) {
				if (error.response) {
					if (error.response.status == 404) return setDepartementOptions([])
					alert(error.response.data);
				}
				alert(error);
			}	
		}
	}


	useEffect(() => {
			getCourse()
			getTeacher()
	},[departement_id])

	async function getCourse() {
		if(departement_id != '')
			try {
				const { data } = await axios.get('/api/course?departement_id='+departement_id)
				setCourseOptions(data.data)
				console.log(`🚀 ~ file: create.js ~ line 103 ~ getCourse ~ data`, data.data)
			} catch (error) {
				if (error.response) {
					if (error.response.status == 404) return setCourseOptions([])
					alert(error.response.data);
				}
				alert(error);
			}	
	}

	// useEffect(() => {
	// 	if(teacherOptions.length == 0)
	// 		getTeacher()
	// },[teacherOptions])

	async function getTeacher() {
		if(departement_id != '')
			try {
				const { data } = await axios.get('/api/teacher?departement_id='+departement_id)
				setTeacherOptions(data.data)
				console.log(`🚀 ~ file: create.js ~ line 103 ~ getTeacher ~ data`, data.data)
			} catch (error) {
				if (error.response) {
					if (error.response.status == 404) return setTeacherOptions([])
					alert(error.response.data);
				}
				alert(error);
			}	
	}

	useEffect(() => {
		if(studyTypeOptions.length == 0)
			getStudyType()
	},[studyTypeOptions])

	async function getStudyType() {
		try {
			const { data } = await axios.get('/api/study-type')
			setStudyTypeOptions(data.data)
      console.log(`🚀 ~ file: create.js ~ line 122 ~ getStudyType ~ data.data`, data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	async function submitAcademicSchedule() {
		try {
			const sendData = {
				id : scheduleData.id,
				academic_year_id,
				departement_id,
				course_id,
				day_id,
				room_id,
				teacher_id,
				teacher_2_id : teacher_2_id == "" ? null : teacher_2_id,
				semester,
				start_time,
				end_time,
			}	
			const { data } = await axios.patch('/api/academic-schedule', sendData)
			alert("Academic schedule successfully updated.")
			router.back()
		} catch (error) {
			if(error.response) {
        console.log(`🚀 ~ file: create.js ~ line 67 ~ submitDepartement ~ error.response`, error.response)
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
    <FormLayout title="Course Schedule Edit | AIS University" titlePage="Course Schedule Edit">
      <Stack
        mb={4}
        sx={{
          width: 640,
        }}
      >
        {/* <FormContainer
          label="Name"
          name="name"
          value={name}
          setValue={setName}
        />
        <FormContainer
          label="Code"
          name="code"
          value={code}
          setValue={setCode}
        />
        <FormContainer
          label="Label"
          name="label"
          value={label}
          setValue={setLabel}
        />
				<FormParent label="Study Type">
					<Select
						displayEmpty
						value={studyType}
						onChange={(e) => setStudyType(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{studyTypeOptions.length > 0 && studyTypeOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent> */}
        <FormContainer
          label="Academic Year"
          name="academic-year"
          value={academic_year_id}
          setValue={setAcademicYear}
        />
        <FormContainer
          label="Semester"
          name="semester"
          value={semester}
          setValue={setSemester}
        />
				<FormParent label="Faculty">
					<Select
						displayEmpty
						value={faculty}
						onChange={(e) => setFaculty(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{facultyOptions.length > 0 && facultyOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
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
				<FormParent label="Lecturer 1">
					<Select
						displayEmpty
						value={teacher_id}
						onChange={(e) => setTeacher(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{teacherOptions.length > 0 && teacherOptions.map(item => <MenuItem value={item.id}>{item.user.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Lecturer 2">
					<Select
						displayEmpty
						value={teacher_2_id}
						onChange={(e) => setTeacher2(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{teacherOptions.length > 0 && teacherOptions.filter(x => x.id != teacher_id).map(item => <MenuItem value={item.id}>{item.user.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Course">
					<Select
						displayEmpty
						value={course_id}
						onChange={(e) => setCourse(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{courseOptions.length > 0 && courseOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Day">
					<Select
						displayEmpty
						value={day_id}
						onChange={(e) => setDay(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{dayOptions.length > 0 && dayOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Room">
					<Select
						displayEmpty
						value={room_id}
						onChange={(e) => setRoom(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{roomOptions.length > 0 && roomOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Start Time">
					<DateTimePicker
						// label="Date&Time picker"
						value={start_time}
						onChange={setStartTime}
						renderInput={(params) => <TextField {...params} />}
					/>
				</FormParent>
				<FormParent label="End Time">
					<DateTimePicker
						// label="Date&Time picker"
						value={end_time}
						onChange={setEndTime}
						renderInput={(params) => <TextField {...params} />}
					/>
				</FormParent>
				{/* <FormParent label="Status">
					<Select
						displayEmpty
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						{statusOptions.length > 0 && statusOptions.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)}
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
						onClick={submitAcademicSchedule}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
		</LocalizationProvider>
  );
}
