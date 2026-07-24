import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

interface Props {
  stats: any;
}

export default function StatsCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Users",
      value: stats.users,
    },
    {
      title: "Products",
      value: stats.products,
    },
    {
      title: "Orders",
      value: stats.orders,
    },
    {
      title: "Purchases",
      value: stats.purchases,
    },
    {
      title: "Sales",
      value: `$${stats.sales}`,
    },
    {
      title: "Inventory",
      value: stats.inventory,
    },
    {
      title: "Inventory Value",
      value: `$${stats.inventoryValue}`,
    },
    {
      title: "Purchases Value",
      value: `$${stats.purchasesValue}`,
    },
  ];

  return (
    <Grid
      container
      spacing={3}
    >
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              height: "100%",
            }}
          >
            <Typography
              color="text.secondary"
            >
              {card.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}