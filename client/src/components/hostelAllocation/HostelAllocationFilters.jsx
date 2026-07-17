import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function HostelAllocationFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Student"
            placeholder="Search by student..."
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HostelAllocationFilters;