import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function MarkEntryToolbar({ onAdd }) {
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
        Mark Entry
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Add Mark Entry
      </Button>
    </Box>
  );
}

export default MarkEntryToolbar;