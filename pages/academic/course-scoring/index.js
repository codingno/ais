import FormContainer from "../../../components/utils/FormContainer";
import FormLayout from "../../../components/utils/FormLayout";
import FormParent from "../../../components/utils/FormParent";
import FormScore from "../../../components/utils/FormScore";
import {
  Typography,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function () {
  const router = useRouter();
  const { data: session, status: statusSession } = useSession();

  const [studentId, setStudentId] = useState(1);
  const [courseCode, setCourseCode] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [programStudy, setProgramStudy] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [score, setScore] = useState({});
  const [feedback, setFeedback] = useState("");

  const [allQuestions, setAllQuestions] = useState([]);
  const [courseQuestions, setCourseQuestions] = useState(0);
  const [instructorQuestions, setInstructorQuestions] = useState(0);
  const [facultyData, setFacultyData] = useState([]);
  const [programStudyData, setProgramStudyData] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setScore((prevState) => ({
      ...prevState,
      score: {
        ...prevState.score,
        [e.target.id]: e.target.value,
      },
    }));
  };

  const getSubTotal = (type) => {
    let subTotal = 0;

    if (Object.keys(score).length !== 0) {
      Object.keys(score.score).forEach((key) => {
        if (parseInt(key) <= courseQuestions && type === "courses") {
          subTotal += parseInt(score.score[key]);
        } else if (parseInt(key) > courseQuestions && type === "instructors") {
          subTotal += parseInt(score.score[key]);
        }
      });
    }
    return subTotal;
  };

  const getTotalScore = () => {
    let total = 0;

    if (Object.keys(score).length !== 0) {
      Object.keys(score.score).map((key) => {
        // console.log(parseInt(key));
        total += parseInt(score.score[key]);
      });
      return total;
    }
  };

  useEffect(() => {
    if (!session && statusSession == `unauthenticated`)
      router.push("/auth/signin");
    if (session && session.user.isStudent) {
      setStudentId(session.user.studentData.id);
    }

    if (allQuestions.length == 0) getAllQuestions();
    if (facultyData.length == 0) getFacultyData();
    if (programStudyData.length == 0) getProgramStudyData();

    setLoading(false);
  }, [session, statusSession]);

  if (statusSession === "loading" || statusSession === "unauthenticated") {
    return (
      <div
        style={{ width: "100vw", heght: "100vh", backgroundColor: "#C7C9C7" }}
      ></div>
    );
  }

  async function getAllQuestions() {
    try {
      const { data } = await axios.get("/api/eval-questions");
      setAllQuestions(data.data);
      setCourseQuestions(
        data.data.filter((item) => item.type === "courses").length
      );
      setInstructorQuestions(
        data.data.filter((item) => item.type === "instructors").length
      );
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  async function getFacultyData() {
    try {
      const { data } = await axios.get("/api/faculty");
      setFacultyData(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  async function getProgramStudyData() {
    try {
      const { data } = await axios.get("/api/departement");
      setProgramStudyData(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  async function submitScore() {
    const sendData = {
      score: score.score,
      student_id: studentId,
      course_code: courseCode,
      student_number: studentNumber,
      faculty_id: facultyId,
      departements_id: programStudy,
      academic_year: academicYear,
      feedback: feedback,
      total_score: getTotalScore(),
    };
    // console.log(sendData);
    try {
      const { data } = await axios.post("/api/course-scoring", sendData);
      console.log(data);

      // alert("Score successfully submitted.");
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
    // router.back();
  }

  return (
    <FormLayout title="Course Scoring | AIS University" titlePage="Course Scoring">
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack
          mb={4}
          ml={3}
          sx={{
            width: "100%",
          }}
        >
          <Typography variant="h5">Part A. Student Particular</Typography>
          <FormContainer
            label="Enter the Course Code (example : ISL00102, Ext)"
            name="course_code"
            value={courseCode}
            setValue={setCourseCode}
            disableMargin={true}
          />
          <FormContainer
            label="Student Number (NIM)"
            name="student_number"
            value={studentNumber}
            setValue={setStudentNumber}
          />
          <FormParent label="Choose your Faculty">
            <Select
              displayEmpty
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {facultyData.map((faculty) => (
                <MenuItem key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </MenuItem>
              ))}
            </Select>
          </FormParent>
          <FormParent label="Choose your Study Program">
            <Select
              displayEmpty
              value={programStudy}
              onChange={(e) => setProgramStudy(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {programStudyData.map((programStudy) => (
                <MenuItem key={programStudy.id} value={programStudy.id}>
                  {programStudy.name}
                </MenuItem>
              ))}
            </Select>
          </FormParent>
          <FormContainer
            label="Choose your Academic Year"
            name="course"
            value={academicYear}
            setValue={setAcademicYear}
          />
          <Typography variant="h5" color="#4472c4">
            Please rate the following items appropriately
          </Typography>
          <Typography variant="h5" color="#c00000">
            Part B. Courses
          </Typography>
          <Typography variant="subtitle1" color="#00b067">
            5=Very Good 4=Good 3=Satisfactory 2=Poor 1=Very poor
          </Typography>
          <FormScore
            type="courses"
            questions={allQuestions}
            handleChange={handleChange}
            teacherScoring={false}
            score={getSubTotal("courses") || 0}
          />
          <Typography variant="h5" color="#c00000">
            Part C. Instructors
          </Typography>
          <Typography variant="subtitle1" color="#00b067">
            5=Very Good 4=Good 3=Satisfactory 2=Poor 1=Very poor
          </Typography>
          <FormScore
            type="instructors"
            questions={allQuestions}
            handleChange={handleChange}
            teacherScoring={false}
            score={getSubTotal("instructors") || 0}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Grand Total</Typography>
            <Typography variant="h5">{getTotalScore() || 0}</Typography>
          </Stack>
          <FormContainer
            width="100%"
            label="Feedback"
            name="feedback"
            value={feedback}
            setValue={setFeedback}
          />
          <Stack
            direction="row"
            alignItems="center"
            ml={5}
            mt={3}
            sx={{
              width: "60%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: 150,
              }}
              onClick={submitScore}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      )}
    </FormLayout>
  );
}
