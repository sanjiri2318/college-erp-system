import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function HostelBlockFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Hostel Block"
            placeholder="Search by block name..."
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HostelBlockFilters;