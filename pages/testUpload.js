import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";

import FormContainer from "../components/utils/FormContainer";
import FormLayout from "../components/utils/FormLayout";
import FormParent from "../components/utils/FormParent"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Input } from "@mui/material";

export default function () {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [attachment, setAttachment] = useState("");
  const [currentAttachment, setCurrentAttachment] = useState("");

  async function submitFaculty() {
    try {
			let attachmentData = attachment
				if(attachment !== currentAttachment) {
					const imageFile = await uploadImage('test', attachment)
          console.log("🚀 ~ file: testUpload.js ~ line 29 ~ submitFaculty ~ imageFile", imageFile)
					attachmentData = imageFile.data
				}
    
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  }
  const uploadFormHandle = e => {
		if(e.target.files[0]) {
			const file = e.target.files[0]	
			setAttachment(file)
			// setCourseImage(file)
		}
	}
  const uploadImage = async (folderTarget, courseImage) => {
  console.log(`🚀 ~ file: testUpload.js ~ line 46 ~ uploadImage ~ folderTarget`, folderTarget)
  console.log(`🚀 ~ file: testUpload.js ~ line 46 ~ uploadImage ~ courseImage`, courseImage)
    if (courseImage === "") return null;

    const formData = new FormData();

    formData.append("test", courseImage);
    formData.append("folder", folderTarget);
    formData.append("folderTarget", folderTarget);
    console.log(`🚀 ~ file: testUpload.js ~ line 54 ~ uploadImage ~ formData`, formData)
    try {
      const file = await axios.post("/api/upload", formData);
      return file;
    } catch (error) {
      alert(error);
    }
  };
  if (status === "loading" || status === "unauthenticated")
    return (
      <div
        style={{ width: "100vw", heght: "100vh", backgroundColor: "#C7C9C7" }}
      ></div>
    );

  return (
    <FormLayout title="Faculty Create | AIS University" titlePage="Faculty Create">
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
        <FormParent label="Attachment">
          <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              multiple
              type="file"
              sx={{ display: "none" }}
              // onChange={(e) => e.target.files[0] && setCourseImage(e.target.files[0]) && setAttachment(e.target.file[0].name)}
              onChange={uploadFormHandle}
            />
            <Button variant="contained" component="span">
              Upload File
            </Button>
            {attachment && (
              <p style={{ marginTop: "10px" }}>
                ( {attachment.name.split("/").pop()} )
              </p>
            )}
          </label>
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
            onClick={submitFaculty}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
