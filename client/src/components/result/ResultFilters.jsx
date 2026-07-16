import {
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

function ResultFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Student / Subject"
            value={search}
            onChange={onSearchChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            select
            label="Result Status"
            value={status}
            onChange={onStatusChange}
          >
            <MenuItem value="">
              All Results
            </MenuItem>

            <MenuItem value="PASS">
              PASS
            </MenuItem>

            <MenuItem value="FAIL">
              FAIL
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResultFilters;