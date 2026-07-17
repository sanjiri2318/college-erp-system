import {
  Box,
  Typography,
} from "@mui/material";

function TranscriptToolbar() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        Student Transcript
      </Typography>
    </Box>
  );
}

export default TranscriptToolbar;