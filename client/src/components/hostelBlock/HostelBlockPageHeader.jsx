import { Box } from "@mui/material";

import HostelBlockToolbar from "./HostelBlockToolbar";
import HostelBlockFilters from "./HostelBlockFilters";

function HostelBlockPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <HostelBlockToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <HostelBlockFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default HostelBlockPageHeader;