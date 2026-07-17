import { Box } from "@mui/material";

import HostelAllocationToolbar from "./HostelAllocationToolbar";
import HostelAllocationFilters from "./HostelAllocationFilters";

function HostelAllocationPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <HostelAllocationToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <HostelAllocationFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default HostelAllocationPageHeader;