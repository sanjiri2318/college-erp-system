import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function SemesterGPAFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Search by Student Name / Register Number"
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SemesterGPAFilters;