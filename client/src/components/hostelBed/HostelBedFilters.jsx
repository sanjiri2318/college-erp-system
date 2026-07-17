import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function HostelBedFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Bed"
            placeholder="Search by bed number..."
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HostelBedFilters;