import { useState } from "react";

import {
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

interface Props {
  customers?: any[];
  products?: any[];
  onSubmit: (data: any) => void;
}

export default function OrderForm({
  customers = [],
  products = [],
  onSubmit,
}: Props) {
  const [customerId, setCustomerId] = useState("");

  const [productId, setProductId] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [price, setPrice] = useState(0);

  function submit(e: any) {
    e.preventDefault();

    onSubmit({
      customerId: Number(customerId),
      productId: Number(productId),
      quantity,
      price,
      total: quantity * price,
    });
  }

  return (
    <Paper
      component="form"
      onSubmit={submit}
      sx={{
        p: 3,
      }}
    >
      <Stack spacing={2}>
        <TextField
          select
          label="Customer"
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
        >
          {customers.map((c) => (
            <MenuItem
              key={c.id}
              value={c.id}
            >
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Product"
          value={productId}
          onChange={(e) =>
            setProductId(e.target.value)
          }
        >
          {products.map((p) => (
            <MenuItem
              key={p.id}
              value={p.id}
            >
              {p.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
        />

        <TextField
          label="Unit Price"
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
        />

        <TextField
          label="Total"
          value={quantity * price}
          InputProps={{
            readOnly: true,
          }}
        />

        <Button
          type="submit"
          variant="contained"
        >
          Save Order
        </Button>
      </Stack>
    </Paper>
  );
}