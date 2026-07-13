import { Box } from "@mui/material";

import StudentToolbar from "./StudentToolbar";
import StudentStats from "./StudentStats";
import StudentFilters from "./StudentFilters";

function StudentPageHeader({
  students,
  departments,
  search,
  semester,
  departmentId,
  onSearchChange,
  onSemesterChange,
  onDepartmentChange,
}) {
  return (
    <>
      <StudentToolbar />

      <StudentStats
        students={students}
      />

      <Box mt={3}>
        <StudentFilters
          search={search}
          semester={semester}
          departmentId={departmentId}
          departments={departments}
          onSearchChange={onSearchChange}
          onSemesterChange={onSemesterChange}
          onDepartmentChange={onDepartmentChange}
        />
      </Box>
    </>
  );
}

export default StudentPageHeader;