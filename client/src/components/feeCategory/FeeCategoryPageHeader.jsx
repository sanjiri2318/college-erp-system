import { Box } from "@mui/material";

import FeeCategoryToolbar from "./FeeCategoryToolbar";
import FeeCategoryFilters from "./FeeCategoryFilters";

function FeeCategoryPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <FeeCategoryToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <FeeCategoryFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default FeeCategoryPageHeader;