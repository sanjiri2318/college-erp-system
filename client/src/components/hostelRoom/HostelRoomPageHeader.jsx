import { Box } from "@mui/material";

import HostelRoomToolbar from "./HostelRoomToolbar";
import HostelRoomFilters from "./HostelRoomFilters";

function HostelRoomPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <HostelRoomToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <HostelRoomFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default HostelRoomPageHeader;