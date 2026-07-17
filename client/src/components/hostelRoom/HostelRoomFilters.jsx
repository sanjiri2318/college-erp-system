import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function HostelRoomFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Room"
            placeholder="Search by room number..."
            value={search}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HostelRoomFilters;