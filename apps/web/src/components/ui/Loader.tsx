import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function Loader() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 8,
        width: "100%",
      }}
    >
      <CircularProgress />

      <Typography
        mt={2}
        color="text.secondary"
      >
        Loading...
      </Typography>
    </Stack>
  );
}