import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";

import FormContainer from "../../../../components/utils/FormContainer";
import FormLayout from "../../../../components/utils/FormLayout";
import FormParent from "../../../../components/utils/FormParent";
import ImageWithLoader from "../../../../utils/ImageWithLoader";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

export default function () {
	const router = useRouter()
	const { data: session, status : statusSession } = useSession()

  const { id } = router.query;

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
	const [headOptions, setHeadOptions] = useState([])
  console.log("🚀 ~ file: [id].js ~ line 34 ~ headOptions", headOptions)

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [studyType, setStudyType] = useState("");
  const [faculty, setFaculty] = useState("");
  const [head, setHead] = useState(null);
  const [accreaditation, setAccreditation] = useState(null);
  const [status, setStatus] = useState(statusOptions[0].value);
  const [courseCredits, setCourseCredits] = useState("");
  const [attachment, setAttachment] = useState("");
  const [currentAttachment, setCurrentAttachment] = useState("");

  useEffect(() => {
    getDepartementData();
  }, [id]);

  async function getDepartementData() {
    if (id) {
      try {
        const { data } = await axios.get(`/api/departement?id=${id}`);
        setName(data.data.name);
        setCode(data.data.code);
				setLabel(data.data.label)
				setStudyType(data.data.study_type_id)
				setFaculty(data.data.faculty_id)
				setHead(data.data.teacher_id)
				setCurrentAttachment(data.data.signature_link)
        console.log("🚀 ~ file: [id].js ~ line 65 ~ getDepartementData ~ data.data.signature_link", data.data.signature_link)
				// setStatus(data.data.status)
				const statusGet = statusOptions.filter(item => item.label == data.data.status)[0].value
  			setStatus(statusGet);
				setCourseCredits(data.data.course_credits)
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
		if(facultyOptions.length == 0)
			getFaculties()
	},[facultyOptions])

	async function getFaculties() {
		try {
			const { data } = await axios.get('/api/faculty')
			setFacultyOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(headOptions.length == 0)
			getTeachers()
	},[headOptions])

	async function getTeachers() {
		try {
			const { data } = await axios.get('/api/teacher')
			if(!data)
				return
			if(!data.data)
				return 
			const teacherActive = data.data.filter(x => !!x.status)
      console.log("🚀 ~ file: [id].js ~ line 103 ~ getTeachers ~ teacherActive", teacherActive)
			setHeadOptions(teacherActive)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
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
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

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

	async function submitDepartement() {
		try {
			let attachmentData = attachment
			let imageName = ""
			let imageUrl = ""
			// const fileForm = listForm.filter(item => item.type === 'file')[0]
			const fileForm = {
					label : 'File',
					name : 'file',
					value : 'url',
					type : 'file',
					path: "profile",
				}
				if(attachment.name && attachment.name !== currentAttachment) {
					const uploadedFile = await uploadImage(fileForm.path, attachment)
					attachmentData = uploadedFile.data
					imageName = attachmentData.replace('files','')
					imageUrl = (process.env.NODE_ENV !== 'production' ? 'http://localhost:3535' : ('https://' + window.location.host)) + imageName
					alert("uploaded")
			}

			const sendData = {
				id,
				name,
				code,
				label,
				study_type_id : studyType,
				faculty_id : faculty,
				status,
				course_credits : courseCredits,
				teacher_id : head,
				accreaditation,
				signature_link : imageUrl,
			}	
			const { data } = await axios.patch('/api/departement', sendData)
			alert("Study Program successfully updated.")
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
    <FormLayout title="Study Program Edit | AIS University" titlePage="Study Program Edit">
      <Stack
        mb={4}
        sx={{
          width: 640,
        }}
      >
        <FormContainer
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
				</FormParent>
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
				<FormParent label="Status">
					<Select
						displayEmpty
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						{statusOptions.length > 0 && statusOptions.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)}
					</Select>
				</FormParent>
        <FormContainer
          label="Course Credits"
          name="courseCredits"
          value={courseCredits}
          setValue={setCourseCredits}
        />
				<FormParent label="Head Lecturer">
					<Select
						displayEmpty
						value={head}
						onChange={(e) => setHead(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={null}>
							<em>None</em>
						</MenuItem>
						{headOptions.length > 0 && headOptions.map(item => <MenuItem value={item.id}>{item.user?.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Upload Signature">
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
							: currentAttachment ?
							<p style={{ marginTop: "10px" }}>
								( {currentAttachment.split("/").pop().split("-").pop()} )
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
        <FormContainer
          label="Accreditation"
          name="accreditation"
          value={accreaditation}
          setValue={setAccreditation}
        />
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
						onClick={submitDepartement}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
