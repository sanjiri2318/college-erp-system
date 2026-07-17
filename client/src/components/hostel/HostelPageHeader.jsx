import { Box } from "@mui/material";

import HostelToolbar from "./HostelToolbar";
import HostelFilters from "./HostelFilters";

function HostelPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <HostelToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <HostelFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default HostelPageHeader;