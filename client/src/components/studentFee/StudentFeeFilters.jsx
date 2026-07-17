import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function StudentFeeFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Student Fee"
            placeholder="Search student..."
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentFeeFilters;