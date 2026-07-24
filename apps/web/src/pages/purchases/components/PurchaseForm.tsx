import { useState } from "react";

import {
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  initial?: any;
  suppliers?: any[];
  warehouses?: any[];
  products?: any[];
  onSubmit: (data: any) => void;
}

export default function PurchaseForm({
  initial,
  suppliers = [],
  warehouses = [],
  products = [],
  onSubmit,
}: Props) {
  const [supplierId, setSupplierId] = useState(
    initial?.supplierId || ""
  );

  const [warehouseId, setWarehouseId] = useState(
    initial?.warehouseId || ""
  );

  const [productId, setProductId] = useState(
    initial?.productId || ""
  );

  const [quantity, setQuantity] = useState(
    initial?.quantity || 1
  );

  const [price, setPrice] = useState(
    initial?.price || 0
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      supplierId: Number(supplierId),
      warehouseId: Number(warehouseId),
      productId: Number(productId),
      quantity: Number(quantity),
      price: Number(price),
      total: Number(quantity) * Number(price),
    });
  }

  return (
    <Paper
      component="form"
      onSubmit={submit}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        mb={3}
      >
        Purchase Form
      </Typography>

      <Stack spacing={2}>
        <TextField
          select
          label="Supplier"
          value={supplierId}
          onChange={(e) =>
            setSupplierId(e.target.value)
          }
          fullWidth
        >
          {suppliers.map((supplier) => (
            <MenuItem
              key={supplier.id}
              value={supplier.id}
            >
              {supplier.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Warehouse"
          value={warehouseId}
          onChange={(e) =>
            setWarehouseId(e.target.value)
          }
          fullWidth
        >
          {warehouses.map((warehouse) => (
            <MenuItem
              key={warehouse.id}
              value={warehouse.id}
            >
              {warehouse.name}
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
          fullWidth
        >
          {products.map((product) => (
            <MenuItem
              key={product.id}
              value={product.id}
            >
              {product.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          fullWidth
        />

        <TextField
          type="number"
          label="Unit Price"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          fullWidth
        />

        <TextField
          label="Total"
          value={Number(quantity) * Number(price)}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Save Purchase
        </Button>
      </Stack>
    </Paper>
  );
}