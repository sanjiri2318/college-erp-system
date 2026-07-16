import { Box } from "@mui/material";

import ExamTypeToolbar from "./ExamTypeToolbar";
import ExamTypeStats from "./ExamTypeStats";
import ExamTypeFilters from "./ExamTypeFilters";

function ExamTypePageHeader({
  examTypes,
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <ExamTypeToolbar
        onAdd={onAdd}
      />

      <ExamTypeStats
        examTypes={examTypes}
      />

      <Box mt={3}>
        <ExamTypeFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default ExamTypePageHeader;