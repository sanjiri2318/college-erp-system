import { Box } from "@mui/material";

import PublisherToolbar from "./PublisherToolbar";
import PublisherFilters from "./PublisherFilters";

function PublisherPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <PublisherToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <PublisherFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default PublisherPageHeader;