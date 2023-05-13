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
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";

export default function () {
  const router = useRouter();
  const { data: session, status: statusSession } = useSession();

  const [aspect, setAspect] = useState([]);
  const [feature, setFeature] = useState("");
  const [id, setId] = useState("");

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

  async function submitFeature() {
    try {
      const sendData = {
        aspects_id: aspect[id - 1].id,
        features: feature,
      };
      const { data } = await axios.post("/api/teacher-feature", sendData);
      alert("Feature successfully created.");
      router.back();
    } catch (error) {
      // console.log(error);
      if (error.response) {
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (!session && statusSession == `unauthenticated`)
      router.push("/auth/signin");

    if (statusSession === "loading" || statusSession === "unauthenticated")
      return (
        <div
          style={{ width: "100vw", heght: "100vh", backgroundColor: "#C7C9C7" }}
        ></div>
      );

    if (!router.isReady) return null;
    if (router.query.id) {
      setId(router.query.id);
    }

    if (aspect.length === 0) getAspects();
  }, [router.isReady, session, statusSession, aspect]);

  if (aspect.length === 0) return null;
  console.log(aspect[id - 1]);

  return (
    <FormLayout
      title={
        "Teacher Scoring " +
        aspect[id - 1].aspect +
        " Feature Create | AIS University"
      }
      titlePage={"Teacher Scoring " + aspect[id - 1].aspect + " Feature Create"}
    >
      <Stack
        mb={4}
        sx={{
          width: 640,
        }}
      >
        <FormParent label="Aspects">
          <Typography>{aspect[id - 1].aspect}</Typography>
        </FormParent>
        <FormContainer
          label="Feature"
          name="feature"
          value={feature}
          setValue={setFeature}
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
            onClick={submitFeature}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
