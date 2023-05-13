import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from "@mui/material/TextField";
import FormHelperText from '@mui/material/FormHelperText';

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
  const [religionOptions, setReligionOptions] = useState([]);

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
  const [ein, setEIN] = useState("");
  const [nidn_code, setNIDNCode] = useState("");
  const [title, setTitle] = useState("");
  const [departement_id, setDepartement] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");

	const [teacherData, setteacherData] = useState({})

  const [loading, setLoading] = useState(false);

  const [error_fields, setErrorFields] = useState({})

  function deleteErrorField(field) {
    setErrorFields( p => { 
      delete p[field] 
      return p
    })
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

  useEffect(() => {
    getTeacherData();
  }, [id]);

  async function getTeacherData() {
    if (id) {
      try {
        const { data } = await axios.get(`/api/teacher?id=${id}`);
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
  			setEIN(data.data.ein);
  			setNIDNCode(data.data.nidn_code);
  			setTitle(data.data.title);
  			setDepartement(data.data.departement_id);
  			setStatus(data.data.status);
				setteacherData(data.data)
  			setReligion(data.data.user_info.religion || 1);
			setEmail(data.data.user.email)
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
			getTeacherStatus()
	},[statusOptions])

	async function getTeacherStatus() {
		try {
			const { data } = await axios.get('/api/teacher-status')
			setStatusOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	async function submitTeacher() {
		try {
			const sendData = {
				id,
				first_name,
				last_name,
				middle_name,
				place_of_birth,
				date_of_birth,
				gender,
				identity_id,
				identity_type_id,
				user_id,
				ein,
				nidn_code,
				title,
				departement_id,
				status,
				religion,
				email,
			}	

      let countErr = 0
      const not_required = ["role_id", "middle_name", "last_name"]
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

			let prepareData = {
				...teacherData,
				user_info : {
					...sendData,
				},
				user : {
					...teacherData.user,
					name : first_name + ' ' + middle_name + ' ' + last_name,
					email,
				},
				...sendData,
			}
			const { data } = await axios.patch('/api/teacher', prepareData)
			alert("Teacher successfully updated.")
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
    <FormLayout title="Teacher Edit | AIS University" titlePage="Teacher Edit">
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
          label="Employer Identification Number"
          name="ein"
          value={ein}
          // setValue={setEIN}
          onChange={v => { setEIN(v); deleteErrorField("ein")}}
          error={!!error_fields["ein"]}
          helper={error_fields["ein"] && "Please enter employer identification number"}
        />
        <FormContainer
          label="Lecturer Number"
          name="nidn_code"
          value={nidn_code}
          // setValue={setNIDNCode}
          onChange={v => { setNIDNCode(v); deleteErrorField("nidn_code")}}
          error={!!error_fields["nidn_code"]}
          helper={error_fields["nidn_code"] && "Please enter lecture number"}
        />
        <FormContainer
          label="Title"
          name="title"
          value={title}
          // setValue={setTitle}
          onChange={v => { setTitle(v); deleteErrorField("title")}}
          error={!!error_fields["title"]}
          helper={error_fields["title"] && "Please enter title"}
        />
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
				</FormParent>
        <FormContainer
          label="Email"
          name="email"
          value={email}
          // setValue={setEmail}
          onChange={ v => { setEmail(v); deleteErrorField("email") } } 
          error={ !!error_fields["email"] }
          helper={ typeof(error_fields["email"]) == "string" ? error_fields["email"] : "Please enter email address" }
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
          // setValue={setPlaceOfBirth}
          onChange={v => { setPlaceOfBirth(v); deleteErrorField("place_of_birth")}}
          error={!!error_fields["place_of_birth"]}
          helper={error_fields["place_of_birth"] && "Please enter a place of birth"}
        />
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
						{identityTypeOptions.length > 0 && identityTypeOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
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
						onClick={submitTeacher}
          >
            Submit
          </Button>
        </Stack>
				</Stack>
				</Grid>
				</Grid>
    </FormLayout>
  );
}