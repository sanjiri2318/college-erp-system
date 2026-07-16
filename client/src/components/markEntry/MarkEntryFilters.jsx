import {
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

function MarkEntryFilters({
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
            label="Status"
            value={status}
            onChange={onStatusChange}
          >
            <MenuItem value="">
              All Status
            </MenuItem>

            <MenuItem value="DRAFT">
              Draft
            </MenuItem>

            <MenuItem value="LOCKED">
              Locked
            </MenuItem>

            <MenuItem value="PUBLISHED">
              Published
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MarkEntryFilters;