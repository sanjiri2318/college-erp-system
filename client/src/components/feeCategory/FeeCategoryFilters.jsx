import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function FeeCategoryFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Category"
            placeholder="Search fee category..."
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default FeeCategoryFilters;