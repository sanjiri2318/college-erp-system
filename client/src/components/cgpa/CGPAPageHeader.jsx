import { Box } from "@mui/material";

import CGPAToolbar from "./CGPAToolbar";
import CGPAStats from "./CGPAStats";
import CGPAFilters from "./CGPAFilters";

function CGPAPageHeader({
  cgpas,
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <CGPAToolbar
        onAdd={onAdd}
      />

      <CGPAStats
        cgpas={cgpas}
      />

      <Box mt={3}>
        <CGPAFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default CGPAPageHeader;