import { Box } from "@mui/material";

import MarkEntryToolbar from "./MarkEntryToolbar";
import MarkEntryStats from "./MarkEntryStats";
import MarkEntryFilters from "./MarkEntryFilters";

function MarkEntryPageHeader({
  markEntries,
  search,
  status,
  onSearchChange,
  onStatusChange,
  onAdd,
}) {
  return (
    <>
      <MarkEntryToolbar
        onAdd={onAdd}
      />

      <MarkEntryStats
        markEntries={markEntries}
      />

      <Box mt={3}>
        <MarkEntryFilters
          search={search}
          status={status}
          onSearchChange={
            onSearchChange
          }
          onStatusChange={
            onStatusChange
          }
        />
      </Box>
    </>
  );
}

export default MarkEntryPageHeader;