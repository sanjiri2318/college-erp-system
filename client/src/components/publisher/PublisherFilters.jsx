import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function PublisherFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Publisher"
            placeholder="Search publisher..."
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PublisherFilters;