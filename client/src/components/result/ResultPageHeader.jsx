import { Box } from "@mui/material";

import ResultToolbar from "./ResultToolbar";
import ResultStats from "./ResultStats";
import ResultFilters from "./ResultFilters";

function ResultPageHeader({
  results,
  search,
  status,
  onSearchChange,
  onStatusChange,
  onAdd,
}) {
  return (
    <>
      <ResultToolbar
        onAdd={onAdd}
      />

      <ResultStats
        results={results}
      />

      <Box mt={3}>
        <ResultFilters
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

export default ResultPageHeader;