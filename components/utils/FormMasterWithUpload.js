
import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";

import FormContainer from "./FormContainer";
import FormLayout from "./FormLayout";
import FormParent from "./FormParent";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";

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

export default function (props) {
	const { title, titlePage, submitUrl, method, listForm, disableMasterForm, portfolio_id } = props

	const router = useRouter()
  const { id } = router.query

	const { data: session, status } = useSession()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
	const [additional, setAdditional] = useState({});
  const [attachment, setAttachment] = useState("");
  const [currentAttachment, setCurrentAttachment] = useState("");

	useEffect(() => {
		getData()
	},[id])

	async function getData() {
		if(method == 'edit' && id ) {
			try {
				const { data } = await axios.get(submitUrl + `?id=${id}`)
				setName(data.data.name)
				setDescription(data.data.description)
				let { data: result } = data
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
			alert(`Data ${name} ${method == 'edit' ? 'updated' : 'created'} successfully`)
			router.back()
		} catch (error) {
			alert(error)	
		}	
	}

  // async function submitFaculty() {
  //   try {
	// 		let attachmentData = attachment
	// 			if(attachment !== currentAttachment) {
	// 				const imageFile = await uploadImage('test', attachment)
  //         console.log("🚀 ~ file: testUpload.js ~ line 29 ~ submitFaculty ~ imageFile", imageFile)
	// 				attachmentData = imageFile.data
	// 			}
    
  //   } catch (error) {
  //     if (error.response) {
  //       alert(error.response.data);
  //     }
  //   }
  // }

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
					listForm.map(item => {
						if(item.type === 'file') {
							const fileSplit = currentAttachment ? currentAttachment.split("-") : []
							const fileName = fileSplit.length > 0 ? fileSplit[fileSplit.length - 1] : ""
							return (
								<FormParent label={item.label}>
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
								label={item.label}
								name={item.name}
								value={additional[item.value]}
								setValue={(value) => {
									setAdditional(prev => {
										const newValue = item.type ? parseType(value, item.type) : value
										return {
											...prev,
											[item.value] : newValue,
										}
									})
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
            startIcon={() => <></>}
						onClick={submitForm}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
