import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import {
  Inventory2,
  Warehouse,
  Storage,
  Warning,
  Category,
} from "@mui/icons-material";

interface Props {
  dashboard: any;
}

export default function InventoryDashboard({
  dashboard,
}: Props) {
  if (!dashboard) {
    return (
      <Typography>
        Loading dashboard...
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={3}
      mb={4}
    >
      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <StatCard
          title="Products"
          value={dashboard.totalProducts}
          icon={<Inventory2 color="primary" fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <StatCard
          title="Warehouses"
          value={dashboard.totalWarehouses}
          icon={<Warehouse color="success" fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <StatCard
          title="Stock Rows"
          value={dashboard.totalStockRows}
          icon={<Storage color="warning" fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <StatCard
          title="Total Quantity"
          value={dashboard.totalQuantity}
          icon={<Category color="secondary" fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
        <StatCard
          title="Low Stock"
          value={dashboard.lowStock}
          icon={<Warning color="error" fontSize="large" />}
        />
      </Grid>
    </Grid>
  );
}

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({
  title,
  value,
  icon,
}: CardProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        height: "100%",
      }}
    >
      {icon}

      <Typography
        variant="body2"
        color="text.secondary"
        mt={1}
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        mt={1}
      >
        {value}
      </Typography>
    </Paper>
  );
}