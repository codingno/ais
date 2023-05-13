import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import FormContainer from "../../../../components/utils/FormContainer";
import FormLayout from "../../../../components/utils/FormLayout";
import FormParent from "../../../../components/utils/FormParent";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

export default function () {
	const router = useRouter()
	const { data: session, status } = useSession()

  const { id } = router.query;

  const availableOptions = [
    {
      id: 1,
      name: "AVAILABLE",
    },
    {
      id: 2,
      name: "NOT AVAILABLE",
    },
  ];

  const [departementOptions, setDepartementOptions] = useState([]);
  const [curriculumOptions, setCurriculumOptions] = useState([]);
  const [courseTypeOptions, setCourseTypeOptions] = useState([]);
  const [courseGroupOptions, setCourseGroupOptions] = useState([]);

  const [departement_id, setDepartement] = useState("");
  const [curriculum_id, setCurriculum] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [theory_credits, setTheoryCredits] = useState("");
  const [practice_credits, setPracticeCredits] = useState("");
  const [practice_field_credits, setPracticeFieldCredits] = useState("");
  const [semester, setSemester] = useState("");
  const [course_type_id, setCourseType] = useState("");
  const [course_group_id, setCourseGroup] = useState("");
  const [syllabus, setSyllabus] = useState(availableOptions[1].id);
  const [event_unit, setEventUnit] = useState(availableOptions[1].id);
  const [materials, setMaterials] = useState(availableOptions[1].id);
  const [books, setBooks] = useState(availableOptions[1].id);

  const [loading, setLoading] = useState(false);

  const [error_fields, setErrorFields] = useState({})

  function deleteErrorField(field) {
    setErrorFields( p => { 
      delete p[field] 
      return p
    })
  }


  useEffect(() => {
    getCourse();
  }, [id]);

  async function getCourse() {
    if (id) {
      try {
        const { data } = await axios.get(`/api/course?id=${id}`);
				setDepartement(data.data.departement_id)
  			setCurriculum(data.data.curriculum_id)
				setName(data.data.name)
				setCode(data.data.code)
				setCredits(data.data.credits)
				setTheoryCredits(data.data.theory_credits)
				setPracticeCredits(data.data.practice_credits)
				setPracticeFieldCredits(data.data.practice_field_credits)
				setSemester(data.data.semester)
				setCourseType(data.data.course_type_id)
				setCourseGroup(data.data.course_group_id)
				const syllabusGet = availableOptions.filter(item => item.name == data.data.syllabus)[0].id
				setSyllabus(syllabusGet)
				const eventUnitGet = availableOptions.filter(item => item.name == data.data.event_unit)[0].id
				setEventUnit(eventUnitGet)
				const materialsGet = availableOptions.filter(item => item.name == data.data.materials)[0].id
				setMaterials(materialsGet)
				const booksGet = availableOptions.filter(item => item.name == data.data.books)[0].id
				setBooks(booksGet)
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
    if (courseGroupOptions.length == 0) getCourseGroup();
  }, [courseGroupOptions]);

  async function getCourseGroup() {
    try {
      const { data } = await axios.get("/api/course-group");
      setCourseGroupOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (courseTypeOptions.length == 0) getCourseType();
  }, [courseTypeOptions]);

  async function getCourseType() {
    try {
      const { data } = await axios.get("/api/course-type");
      setCourseTypeOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (departementOptions.length == 0) getDepartement();
  }, [departementOptions]);

  async function getDepartement() {
    try {
      const { data } = await axios.get("/api/departement");
      setDepartementOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (curriculumOptions.length == 0) getCurriculum();
  }, [curriculumOptions, departement_id]);

  async function getCurriculum() {
    if (departement_id != "") {
      try {
        const { data } = await axios.get("/api/curriculum");
        const curriculumsData = data.data.filter(
          (item) => item.departement_id == departement_id
        );
        setCurriculumOptions(curriculumsData);
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) return;
          alert(error.response.data);
        }
        alert(error);
      }
    }
  }

  async function submitCourse() {
    try {
      const sendData = {
				id,
				departement_id,
				curriculum_id,
				name,
				code,
				credits,
				theory_credits,
				practice_credits,
				practice_field_credits,
				semester,
				course_type_id,
				course_group_id,
				syllabus,
				event_unit,
				materials,
				books,
      };

      let countErr = 0
      const not_required = [
				"theory_credits",
				"practice_credits",
				"practice_field_credits",
				"syllabus",
				"event_unit",
				"materials",
				"books",
      ]
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

      const { data } = await axios.patch("/api/course", sendData);
      alert("Curriculum successfully updated.");
      router.back();
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
      alert(error);
    }
  }

	useEffect(() => {
		if(!session && status == `unauthenticated`)
			router.push('/auth/signin')
	},[session, status])	
	if(status === 'loading' || status === 'unauthenticated')
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
    <FormLayout
      title="Course Edit | AIS University"
      titlePage="Course Edit"
    >
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
            {departementOptions.length > 0 &&
              departementOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Curriculum">
          <Select
            displayEmpty
            value={curriculum_id}
            onChange={(e) => setCurriculum(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {curriculumOptions.length > 0 &&
              curriculumOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormContainer
          label="Name"
          name="name"
          value={name}
          // setValue={setName}
          onChange={v => { setName(v); deleteErrorField("name")}}
          error={!!error_fields["name"]}
          helper={error_fields["name"] && "Please enter course name"}
        />
        <FormContainer
          label="Code"
          name="code"
          value={code}
          // setValue={setCode}
          onChange={v => { setCode(v); deleteErrorField("code")}}
          error={!!error_fields["code"]}
          helper={error_fields["code"] && "Please enter course code"}
        />
        <FormContainer
          label="Credits"
          name="credits"
          value={credits}
          // setValue={setCredits}
          onChange={v => { setCredits(v); deleteErrorField("credits")}}
          error={!!error_fields["credits"]}
          helper={error_fields["credits"] && "Please enter course credits"}
        />
        <FormContainer
          label="Theory Credits"
          name="theory_credits"
          value={theory_credits}
          setValue={setTheoryCredits}
        />
        <FormContainer
          label="Practice Credits"
          name="practice_credits"
          value={practice_credits}
          setValue={setPracticeCredits}
        />
        <FormContainer
          label="Practice Field Credits"
          name="practice_field_credits"
          value={practice_field_credits}
          setValue={setPracticeFieldCredits}
        />
        <FormContainer
          label="Semester"
          name="semester"
          value={semester}
          // setValue={setSemester}
          onChange={v => { setSemester(v); deleteErrorField("semester")}}
          error={!!error_fields["semester"]}
          helper={error_fields["semester"] && "Please enter course semester"}
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
        <FormParent label="Course Type">
          <Select
            displayEmpty
            value={course_type_id}
            onChange={(e) => setCourseType(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {courseTypeOptions.length > 0 &&
              courseTypeOptions.map((item) => (
                // <MenuItem value={item.id}>{item.name}</MenuItem>
                <MenuItem value={item.id}>{item.description}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Course Group">
          <Select
            displayEmpty
            value={course_group_id}
            onChange={(e) => setCourseGroup(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {courseGroupOptions.length > 0 &&
              courseGroupOptions.map((item) => (
                // <MenuItem value={item.id}>{item.name}</MenuItem>
                <MenuItem value={item.id}>{item.description}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Syllabus">
          <Select
            displayEmpty
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {availableOptions.length > 0 &&
              availableOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Event Unit">
          <Select
            displayEmpty
            value={event_unit}
            onChange={(e) => setEventUnit(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {availableOptions.length > 0 &&
              availableOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Materials">
          <Select
            displayEmpty
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {availableOptions.length > 0 &&
              availableOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Books">
          <Select
            displayEmpty
            value={books}
            onChange={(e) => setBooks(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {availableOptions.length > 0 &&
              availableOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
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
            onClick={submitCourse}
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
