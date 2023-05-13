import Stack from "@mui/material/Stack";

export default function FormParent(props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      ml={5}
      mt={2}
      sx={{ width: props.width || "80%", display: "flex", justifyContent: props.justifyContent || "flex-start" }}
    >
      <span style={{ width: "35%" }}>{props.label}</span>
			{props.children}
    </Stack>
  );
}