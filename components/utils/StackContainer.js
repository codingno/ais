import Stack from "@mui/material/Stack";
import Typo from "@mui/material/FormHelperText";
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function StackContainer({ label, value, width, leftWidth, rightWidth }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      ml={5}
      mt={2}
      sx={{ width: width || "80%", display: "flex", justifyContent: "flex-start" }}
    >
      <span style={{ width: leftWidth || "35%" }}>{label}</span>
      <Box sx={{ width: rightWidth || "65%" }}>
        <Typography
          variant="subtitle1"
          noWrap
          sx={{
            my: 1,
            cursor: "pointer",
            whiteSpace : 'pre-wrap'
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}
