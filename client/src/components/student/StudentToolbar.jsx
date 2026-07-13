import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function StudentToolbar() {
  const navigate = useNavigate();

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
        Students Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() =>
          navigate("/admin/students/admission")
        }
      >
        New Admission
      </Button>
    </Box>
  );
}

export default StudentToolbar;