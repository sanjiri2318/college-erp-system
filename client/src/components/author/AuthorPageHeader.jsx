import { Box } from "@mui/material";

import AuthorToolbar from "./AuthorToolbar";
import AuthorFilters from "./AuthorFilters";

function AuthorPageHeader({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <>
      <AuthorToolbar
        onAdd={onAdd}
      />

      <Box mt={3}>
        <AuthorFilters
          search={search}
          onSearchChange={
            onSearchChange
          }
        />
      </Box>
    </>
  );
}

export default AuthorPageHeader;