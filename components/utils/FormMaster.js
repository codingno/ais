import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import FormContainer from "./FormContainer";
import FormLayout from "./FormLayout";
import FormParent from "./FormParent";
import alertError from "../../utils/alertError";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function parseType(value, type) {
  let result;
  switch (type) {
    case "float":
      result = parseFloat(value);
      break;
    case "integer":
      result = isNaN(parseInt(value)) ? "" : parseInt(value);
      break;
    default:
      result = value;
      break;
  }
  return result;
}

function useForceUpdate() {
  const [value, setValue] = useState(false); // integer state
  return () => setValue(!value); // update the state to force render
}

export default function (props) {
  const {
    title,
    titlePage,
    submitUrl,
    method,
    additionalForm,
    disableMasterForm,
    position,
    customId,
  } = props;

  const router = useRouter();
  let id = null
  const { id : usedId } = router.query;
  if(customId)
    id = customId
  else
    id = usedId
  console.log(id);

  const { data: session, status } = useSession();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [additional, setAdditional] = useState({});
  console.log("🚀 ~ file: FormMaster.js ~ line 61 ~ additional", additional)
  const [loading, setLoading] = useState(false);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    getData();
  }, [id]);

  async function getData() {
    if (method == "edit" && id) {
      try {
        setLoading(true)
        const { data } = await axios.get(submitUrl + `?id=${id}`);
        let result = data.data || data[0];
        setName(result.name);
        setDescription(result.description);
        // delete result.name;
        // delete result.description;
        setAdditional(result);
        setLoading(false)
      } catch (error) {
        alertError(error)
      }
    } else {
      setAdditional(additionalForm?.map(item => ({[item.name] : item.defaultValue || "" })).reduce((a,b) => ({...a,...b}),{})??{})
    }
  }

  async function submitForm() {
    setLoading(true)
    try {
      if (method == "edit") {
        console.log("🚀 ~ file: FormMaster.js ~ line 110 ~ submitForm ~ ", name, description, additional)
        const data = await axios.patch(submitUrl, {
          id,
          name,
          description,
          position,
          ...additional,
        });
      } else {
        const data = await axios.post(submitUrl, {
          name,
          description,
          position,
          ...additional,
        });
      }
      // alert(`Data ${name || additionalForm[0]?.name || ""} successfully ${method == "edit" ? "updated" : "created"}`);
      alert(`Data successfully ${method == "edit" ? "updated" : "created"}`);
      setLoading(false)
      router.back();
    } catch (error) {
      alertError(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!session && status == `unauthenticated`) router.push("/auth/signin");
  }, [session, status]);
  if (status === "loading" || status === "unauthenticated") return "";

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormLayout title={title} titlePage={titlePage}>
        <Stack
          mb={4}
          sx={{
            width: 640,
          }}
        >
          {!disableMasterForm && (
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
          )}
          {additionalForm &&
            additionalForm.map((item, index) => {
              if (item.type == "date")
                return (
                  <FormParent label={item.label} name={item.name} key={index}>
                    <DateTimePicker
                      // label="Date&Time picker"
                      value={additional[item.value]}
                      onChange={(value) => {
                        let newAdditional = additional;
                        newAdditional[item.value] = value;
                        setAdditional(newAdditional);
                        forceUpdate();
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormParent>
                );
                console.log("additional[item.value] : ",additional[item.value])
              return (
                <FormContainer
                  disabled={item.disabled}
                  label={item.label}
                  name={item.name}
                  key={index}
                  autoComplete="new-password"
                  value={additional[item.value]}
                  setValue={(value) => {
                    let newAdditional = additional;
                    newAdditional[item.value] = item.type
                      ? parseType(value, item.type)
                      : value;
                    setAdditional(newAdditional);
                    setAdditional((prev) => {
                      let newAdditional = structuredClone(prev);
                      newAdditional[item.value] = item.type
                        ? parseType(value, item.type)
                        : value;
                      return newAdditional;
                    });
                  }}
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                />
              );
            })}
          <Stack
            direction="row"
            alignItems="center"
            ml={5}
            mt={3}
            sx={{ width: "60%", display: "flex", justifyContent: "flex-start" }}
          >
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              sx={{
                width: 150,
              }}
              // startIcon={() => <></>}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
        <Modal
          open={loading}
          onClose={() => setLoading(false)}
          sx={{ display: "flex" }}
        >
          <CircularProgress sx={{ margin: "auto" }} />
        </Modal>
      </FormLayout>
    </LocalizationProvider>
  );
}
