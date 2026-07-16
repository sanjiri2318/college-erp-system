import { Box, TextField } from "@mui/material";

function ExamTypeFilters({
  search,
  onSearchChange,
}) {
  return (
    <Box mb={3}>
      <TextField
        fullWidth
        label="Search Exam Type"
        placeholder="Exam Type"
        value={search}
        onChange={onSearchChange}
      />
    </Box>
  );
}

export default ExamTypeFilters;