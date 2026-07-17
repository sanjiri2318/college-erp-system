import { Box } from "@mui/material";

import HostelBedToolbar from "./HostelBedToolbar";
import HostelBedFilters from "./HostelBedFilters";

function HostelBedPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <HostelBedToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <HostelBedFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default HostelBedPageHeader;