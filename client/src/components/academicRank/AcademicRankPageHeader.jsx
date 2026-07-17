import { Box } from "@mui/material";

import AcademicRankToolbar from "./AcademicRankToolbar";
import AcademicRankFilters from "./AcademicRankFilters";

function AcademicRankPageHeader({
  students,
  studentId,
  onStudentChange,
}) {
  return (
    <>
      <AcademicRankToolbar />

      <Box mt={3}>
        <AcademicRankFilters
          students={students}
          studentId={studentId}
          onStudentChange={onStudentChange}
        />
      </Box>
    </>
  );
}

export default AcademicRankPageHeader;