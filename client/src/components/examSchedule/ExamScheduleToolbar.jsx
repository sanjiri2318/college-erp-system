import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ExamScheduleToolbar({ onAdd }) {
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
        Exam Schedule
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Add Exam Schedule
      </Button>
    </Box>
  );
}

export default ExamScheduleToolbar;