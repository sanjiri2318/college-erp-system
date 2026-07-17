import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AcademicRankToolbar({ onGenerate }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Academic Rank
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          View and generate academic rankings based on student CGPA.
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onGenerate}
      >
        Generate Rank
      </Button>
    </Box>
  );
}

export default AcademicRankToolbar;