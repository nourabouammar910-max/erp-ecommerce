import { useNavigate } from "react-router-dom";

import {
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import { Add } from "@mui/icons-material";

export default function PurchasesPage() {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Purchases
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() =>
            navigate("/purchases/create")
          }
        >
          New Purchase
        </Button>
      </Stack>

      <Typography
        color="text.secondary"
      >
        Purchases management page.
      </Typography>
    </Paper>
  );
}