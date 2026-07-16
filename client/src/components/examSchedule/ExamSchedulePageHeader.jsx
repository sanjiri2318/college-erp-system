import { Box } from "@mui/material";

import ExamScheduleToolbar from "./ExamScheduleToolbar";
import ExamScheduleStats from "./ExamScheduleStats";
import ExamScheduleFilters from "./ExamScheduleFilters";

function ExamSchedulePageHeader({
  examSchedules,
  search,
  semester,
  onSearchChange,
  onSemesterChange,
  onAdd,
}) {
  return (
    <>
      <ExamScheduleToolbar
        onAdd={onAdd}
      />

      <ExamScheduleStats
        examSchedules={examSchedules}
      />

      <Box mt={3}>
        <ExamScheduleFilters
          search={search}
          semester={semester}
          onSearchChange={
            onSearchChange
          }
          onSemesterChange={
            onSemesterChange
          }
        />
      </Box>
    </>
  );
}

export default ExamSchedulePageHeader;