
import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


import FormContainer from "./FormContainer";
import FormLayout from "./FormLayout";
import FormParent from "./FormParent";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import axios from 'axios';

import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

function parseType(value, type) {
	let result
	switch (type) {
		case 'float':
			result = parseFloat(value)	
			break;
		case 'integer':
			result = parseInt(value)	
			break;
		default:
			result = value	
			break;
	}
	return result	
}

function useForceUpdate(){
    const [value, setValue] = useState(false); // integer state
    return () => setValue(!value); // update the state to force render
}

export default function (props) {
	const { title, titlePage, submitUrl, method, listForm, disableMasterForm, portfolio_id } = props

	const router = useRouter()
  const { id } = router.query

	const { data: session, status } = useSession()
	const forceUpdate = useForceUpdate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
	const [additional, setAdditional] = useState({});
  console.log(`🚀 ~ file: FormMasterWithUploadAndOptions.js ~ line 50 ~ additional`, additional)
  const [attachment, setAttachment] = useState("");
  const [currentAttachment, setCurrentAttachment] = useState("");

	const [optionAdditional, setOptionAdditional] = useState({});

	useEffect(() => {
		getOptions()
		setInitialValue()
	},[])

	function setInitialValue() {
		let newAdditional = additional
		listForm.map(item => {
			if(item.initialValue) {
				newAdditional[item.name] = item.type ? parseType(item.initialValue, item.type) : item.initialValue
			}
		})	
		setAdditional(newAdditional)
	}

	async function getOptions() {
		try {
			for await (const form of listForm) {
				if(form.type == 'select') {
					const { data } = await axios.get(form.optionUrl)
					setOptionAdditional({ ...optionAdditional, [form.name] : data.data || data })
				}
			}
		} catch (error) {
			
		}	
	}

	useEffect(() => {
		getData()
	},[id])

	async function getData() {
		if(method == 'edit' && id ) {
			try {
				let result = {}
				const { data } = await axios.get(submitUrl + `?id=${id}`)
				if(data.data) {
					setName(data.data.name)
					setDescription(data.data.description)
					result = data.data
				} else {
					setName(data[0].name)
					setDescription(data[0].description)
					result = data[0]
				}
				if(!disableMasterForm) {
					delete result.name
					delete result.description
				}
				if(result.url)
					setCurrentAttachment(result.url)
				setAdditional(result)
			} catch (error) {
				if(error.response) {
					alert(error.response.data)
				}	
				alert(error)
			}	
		}
	}

	async function submitForm() {
		try {
			let attachmentData = attachment
			let newAdditional = additional
      console.log(`🚀 ~ file: FormMasterWithUploadAndOptions.js ~ line 128 ~ submitForm ~ newAdditional`, newAdditional)
			const fileForm = listForm.filter(item => item.type === 'file')[0]
				if(fileForm && attachment.name !== currentAttachment) {
					const uploadedFile = await uploadImage(fileForm.path, attachment)
					attachmentData = uploadedFile.data
					newAdditional[fileForm.value] = attachmentData.replace('public','')
				}
			if(method == 'edit') {
				const data = await axios.patch(submitUrl, {
					id,
					name, 
					description,
					portfolio_id : 3,
					user_id : session.user.userID,
					...newAdditional,
				})	
			} else {
				const data = await axios.post(submitUrl, {
					name, 
					description,
					portfolio_id,
					...newAdditional,
				})	
			}
			alert(`Data ${name} already ${method == 'edit' ? 'updated' : 'created'}`)
			router.back()
		} catch (error) {
			alert(error)	
		}	
	}

  const uploadFormHandle = e => {
		if(e.target.files[0]) {
			const file = e.target.files[0]	
			setAttachment(file)
			// setCourseImage(file)
		}
	}
  const uploadImage = async (folderTarget, courseImage) => new Promise(async (resolve, reject) => {
    if (courseImage === "") return null;

    const formData = new FormData();

    formData.append('folderTarget', folderTarget);
    formData.append('uploads', courseImage);
    try {
      const file = await axios.post("/api/upload", formData);
			return resolve(file)
    } catch (error) {
      alert(error);
			return reject(error)
    }
  });
	useEffect(() => {
		if(!session && status == `unauthenticated`)
			router.push('/auth/signin')
	},[session, status])	
	if(status === 'loading' || status === 'unauthenticated')
		return ""

  return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormLayout title={title} titlePage={titlePage}>
      <Stack
        mb={4}
        sx={{
          width: 640,
        }}
      >
				{
					!disableMasterForm &&
					<>
						<FormContainer
							label="Name"
							name="name"
							value={name}
							setValue={setName}
						/>
						<FormContainer
							label="Description"
							name="description"
							value={description}
							setValue={setDescription}
						/>
					</>
				}
				{
					listForm &&
					listForm.map((item, index) => {
						if(item.type == 'date')
							return (
								<FormParent 
								label={item.label}
								name={item.name}
								key={index}
								>
									<DateTimePicker
										// label="Date&Time picker"
										value={additional[item.value]}
										onChange={(value) => {
											let newAdditional = additional
											newAdditional[item.value] = value
											setAdditional(newAdditional)
											forceUpdate()
										}}
										renderInput={(params) => <TextField {...params} />}
									/>
								</FormParent>
							)
						if(item.type === 'select') {
							if(!optionAdditional[item.name])
								return ""
							return (
								<FormParent label={item.label} key={item.index}>
									<Select
										displayEmpty
										value={additional[item.value]}
										defaultValue={item.initialValue}
										setValue={(e) => {
											let newAdditional = additional
											newAdditional[item.value] = e.target.value
											setAdditional(newAdditional)
											forceUpdate()
										}}
										onChange={(e) => setFaculty(e.target.value)}
										inputProps={{ "aria-label": "Without label" }}
									>
										<MenuItem value={""}>
											<em>None</em>
										</MenuItem>
										{optionAdditional[item.name].length > 0 && optionAdditional[item.name].map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
									</Select>
								</FormParent>
							)
						}
						if(item.type === 'file') {
							const fileSplit = currentAttachment ? currentAttachment.split("-") : []
							const fileName = fileSplit.length > 0 ? fileSplit[fileSplit.length - 1] : ""
							return (
								<FormParent label={item.label} key={index}>
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
										{attachment ? 
											<p style={{ marginTop: "10px" }}>
												( {attachment.name.split("/").pop()} )
											</p> :
											fileName !== "" ?
											<p style={{ marginTop: "10px" }}>
												{/* ( {currentAttachment.split("/").pop()} ) */}
												{fileName}
											</p> : ""
										}
									</label>
								</FormParent>
							)
						}
						return (
							<FormContainer
								key={index}
								label={item.label}
								name={item.name}
								value={additional[item.value]}
								defaultValue={item.initialValue}
								setValue={(value) => {
									let newAdditional = additional
									newAdditional[item.value] = item.type ? parseType(value, item.type) : value
									setAdditional(newAdditional)
											forceUpdate()
								}}
							/>
						)
					})
				}
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
						onClick={submitForm}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
		</LocalizationProvider>
  );
}
