import { Box } from "@mui/material";

import FeePaymentToolbar from "./FeePaymentToolbar";
import FeePaymentFilters from "./FeePaymentFilters";

function FeePaymentPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <FeePaymentToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <FeePaymentFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default FeePaymentPageHeader;