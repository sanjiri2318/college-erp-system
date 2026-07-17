import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function FeeStructureFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Fee Structure"
            placeholder="Search fee structure..."
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default FeeStructureFilters;