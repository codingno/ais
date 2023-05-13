import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";

import FormContainer from "../../../../components/utils/FormContainer";
import FormLayout from "../../../../components/utils/FormLayout";
import FormParent from "../../../../components/utils/FormParent";
import FormScore from "../../../../components/utils/FormScore";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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
} from "@mui/material";

export default function () {
  const router = useRouter();
  const { data: session, status: statusSession } = useSession();

  const { id } = router.query;
  const year = new Date().getFullYear();

  const [aspect, setAspect] = useState([]);
  const [feature, setFeature] = useState([]);
  const [teacherScoring, setTeacherScoring] = useState({});
  const [allScore, setAllScore] = useState([]);
  const [teacherScore, setTeacherScore] = useState([]);
  const [loading, setLoading] = useState(true);

  // const apa = true;

  useEffect(() => {
    if (!session && statusSession == `unauthenticated`)
      router.push("/auth/signin");

    if (!router.isReady) return null;
    if (aspect.length === 0) {
      getAspects();
    }
    if (feature.length === 0) {
      getFeatures();
    }
    if (teacherScore.length === 0) {
      getTeacherScore();
    }

    setLoading(false);
  }, [session, statusSession, router.isReady]);
  if (statusSession === "loading" || statusSession === "unauthenticated")
    return (
      <div
        style={{ width: "100vw", heght: "100vh", backgroundColor: "#C7C9C7" }}
      ></div>
    );

  async function getAspects() {
    try {
      const { data } = await axios.get("/api/teacher-scoring");
      setAspect(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  async function getFeatures() {
    try {
      const { data } = await axios.get("/api/teacher-feature");
      setFeature(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  async function getTeacherScore() {
    try {
      const { data } = await axios.get(
        `/api/teacher-feature-score?teacher_id=${id}`
      );
      setTeacherScore(data.data);
      // console.log(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  const handleChange = (e) => {
    setTeacherScoring((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      feature_id: e.target.id,
      year,
      teacher_id: id,
    }));
  };
  if (Object.keys(teacherScoring).length !== 0) {
    for (let index = 0; index < allScore.length; index++) {
      if (allScore[index].feature_id === teacherScoring.feature_id) {
        allScore.splice(index, 1);
      }
    }
    allScore.push(teacherScoring);
  }

  console.log(allScore);

  async function submitScore() {
    try {
      if (allScore.length === feature.length) {
        let sendData = {
          data: allScore,
        };
        const { data } = await axios.post(
          "/api/teacher-feature-score",
          sendData.data
        );
        alert("Score successfully submitted.");
        router.back();
      }

      if (allScore.length < feature.length) {
        alert("Please fill all score.");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  const totalScore = (year) => {
    let allAspect = {};
    let total = 0;

    if (
      teacherScore.length !== 0 &&
      feature.length !== 0 &&
      aspect.length !== 0
    ) {
      for (let i = 0; i < aspect.length; i++) {
        let totalAspect = 0;
        if (aspect[i].id === i + 1) {
          for (let j = 0; j < feature.length; j++) {
            if (feature[j].aspects_id === aspect[i].id) {
              for (let k = 0; k < teacherScore.length; k++) {
                if (teacherScore[k].year === year) {
                  if (teacherScore[k].feature_id === feature[j].id) {
                    totalAspect +=
                      (teacherScore[k].score * aspect[i].scoring) / 100;
                    allAspect[aspect[i].aspect.toLowerCase()] = totalAspect;
                  }
                }
              }
            }
          }
        }
      }
    }
    for (let key in allAspect) {
      total += allAspect[key] / aspect.length;
    }

    return total.toFixed(2);
  };

  let lecturerYearScore = {};
  let allYears = [];
  let years = [];

  if (
    teacherScore.length !== 0 &&
    feature.length !== 0 &&
    aspect.length !== 0
  ) {
    for (let i = 0; i < teacherScore.length; i++) {
      allYears.push(teacherScore[i].year);
    }

    for (let i = 0; i < allYears.length; i++) {
      if (years.indexOf(allYears[i]) === -1) {
        years.push(allYears[i]);
      }
    }
    console.log(years);
    for (let i = 0; i < years.length; i++) {
      lecturerYearScore[years[i]] = totalScore(years[i]);
    }
  }

  return (
    <>
      {teacherScore.length === 0 && teacherScore.length < feature.length ? (
        <FormLayout
          title="Teacher Scoring | AIS University"
          titlePage="Teacher Scoring"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Stack
                mb={4}
                sx={{
                  width: "100%",
                }}
              >
                <FormScore
                  aspect={aspect}
                  feature={feature}
                  handleChange={handleChange}
                  teacherScoring={true}
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
                    startIcon={() => <></>}
                    onClick={submitScore}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </>
          )}
        </FormLayout>
      ) : (
        <FormLayout
          title="Teacher Scoring | AIS University"
          titlePage="Teacher Scoring"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Stack
                mb={4}
                ml={5}
                mr={5}
                sx={{
                  width: "100%",
                }}
              >
                {aspect.map((aspect) => (
                  <Typography variant="h5" mb={3}>
                    {aspect.aspect}
                    {feature.map((feature) => (
                      <>
                        {feature.aspects_id === aspect.id && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <FormLabel>{feature.features}</FormLabel>
                            {teacherScore.map((teacherScore) => (
                              <>
                                {teacherScore.feature_id === feature.id && (
                                  <>
                                    {teacherScore.year === year && (
                                      <Typography variant="h5">
                                        {teacherScore.score}
                                      </Typography>
                                    )}
                                  </>
                                )}
                              </>
                            ))}
                          </Stack>
                        )}
                      </>
                    ))}
                  </Typography>
                ))}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={3}
                >
                  <Typography variant="h5">Total</Typography>
                  <Typography variant="h5">{totalScore(year)}</Typography>
                </Stack>
                <Stack alignItems="left" mt={3}>
                  <Typography variant="h5">Yearly Evaluation</Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6">Year</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6">Score</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(lecturerYearScore).map((year) => (
                          <TableRow key={year}>
                            <TableCell>
                              <Typography variant="h6">{year}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">
                                {lecturerYearScore[year]}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Stack>
            </>
          )}
        </FormLayout>
      )}
    </>
  );
}
