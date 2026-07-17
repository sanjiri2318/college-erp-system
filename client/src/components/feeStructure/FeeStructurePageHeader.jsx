import { Box } from "@mui/material";

import FeeStructureToolbar from "./FeeStructureToolbar";
import FeeStructureFilters from "./FeeStructureFilters";

function FeeStructurePageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <FeeStructureToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <FeeStructureFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default FeeStructurePageHeader;