import { Stack, StackProps, Typography } from "@mui/material";

interface SearchNotFoundProps extends StackProps {
  searchQuery?: string;
}

export default function SearchNotFound({
  searchQuery,
  ...other
}: Readonly<SearchNotFoundProps>) {
  return (
    <Stack {...other}>
      <Typography gutterBottom variant="h6" align="center">
        Not found
      </Typography>
      {!!searchQuery && (
        <Typography variant="body2" align="center">
          No results found for&nbsp;
          <strong>&quot;{searchQuery}&quot;</strong>.
        </Typography>
      )}
    </Stack>
  );
}
