import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ExamTypeToolbar({ onAdd }) {
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
        Exam Types
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Add Exam Type
      </Button>
    </Box>
  );
}

export default ExamTypeToolbar;