import { Box } from "@mui/material";

import StudentFeeToolbar from "./StudentFeeToolbar";
import StudentFeeFilters from "./StudentFeeFilters";

function StudentFeePageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <StudentFeeToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <StudentFeeFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default StudentFeePageHeader;