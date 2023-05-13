import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function FormContainer(props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      ml={props.name === "feedback" ? 0 : 5}
      mt={props.disableMargin ? 0 : 1}
      sx={{
        width: props.width || "80%",
        display: "flex",
        justifyContent: props.justifyContent || "flex-start",
      }}
    >
      <span style={{ width: props.name === "feedback" ? "20%" : "35%" }}>
        {props.label}
      </span>
      <FormControl
        sx={{ width: props.name === "feedback" ? "80%" : "65%" }}
        variant="outlined"
      >
        {props.name === "description" || props.name === "feedback" ? (
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            // placeholder="Minimum 3 rows"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "10px" }}
          />
        ) : (
          <OutlinedInput
            disabled={props.disabled}
            name={props.name}
            type={props.type}
            value={props.value}
            defaultValue={props.defaultValue}
            onChange={(e) => {
              if (props.onChange)
                return props.onChange(e.target.value)
              props.setValue(e.target.value)
            }}
            sx={{
              background: "#E0E0E0",
            }}
            error={props.error}
          />
        )}
        {props.helper && <FormHelperText sx={{ color : props.error ? "red" : "normal", }}>{props.helper}</FormHelperText>}
      </FormControl>
    </Stack>
  );
}
