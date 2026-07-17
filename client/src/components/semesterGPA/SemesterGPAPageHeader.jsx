import { Box } from "@mui/material";

import SemesterGPAToolbar from "./SemesterGPAToolbar";
import SemesterGPAStats from "./SemesterGPAStats";
import SemesterGPAFilters from "./SemesterGPAFilters";

function SemesterGPAPageHeader({
  semesterGPAs,
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <SemesterGPAToolbar
        onAdd={onAdd}
      />

      <SemesterGPAStats
        semesterGPAs={semesterGPAs}
      />

      <Box mt={3}>
        <SemesterGPAFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default SemesterGPAPageHeader;