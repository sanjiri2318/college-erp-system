import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ResultToolbar({ onAdd }) {
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
        Result Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Generate Result
      </Button>
    </Box>
  );
}

export default ResultToolbar;
