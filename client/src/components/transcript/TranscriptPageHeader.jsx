import { Box } from "@mui/material";

import TranscriptToolbar from "./TranscriptToolbar";
import TranscriptFilters from "./TranscriptFilters";

function TranscriptPageHeader({
  students,
  studentId,
  onStudentChange,
}) {
  return (
    <>
      <TranscriptToolbar />

      <Box mt={3}>
        <TranscriptFilters
          students={students}
          studentId={studentId}
          onStudentChange={
            onStudentChange
          }
        />
      </Box>
    </>
  );
}

export default TranscriptPageHeader;