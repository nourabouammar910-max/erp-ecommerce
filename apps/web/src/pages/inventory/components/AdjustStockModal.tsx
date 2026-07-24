import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";

import toast from "react-hot-toast";

import { inventoryApi } from "../api";

interface Props {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

export default function AdjustStockModal({
  open,
  onClose,
  refresh,
}: Props) {
  const [products, setProducts] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [productId, setProductId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [type, setType] = useState("ADD");

  useEffect(() => {
    async function load() {
      const p = await inventoryApi.getProducts();
      const w = await inventoryApi.getWarehouses();

      setProducts(p.data);
      setWarehouses(w.data);
    }

    load();
  }, []);

  async function save() {
    try {
      setLoading(true);

      const data = {
        productId: Number(productId),
        warehouseId: Number(warehouseId),
        quantity: Number(quantity),
      };

      if (type === "ADD") {
        await inventoryApi.add(data);
      }

      if (type === "REMOVE") {
        await inventoryApi.remove(data);
      }

      if (type === "ADJUST") {
        await inventoryApi.adjust(data);
      }

      toast.success("Inventory updated");

      refresh();

      onClose();
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Stock Operation
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

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
            select
            label="Warehouse"
            value={warehouseId}
            onChange={(e) =>
              setWarehouseId(e.target.value)
            }
          >
            {warehouses.map((w) => (
              <MenuItem
                key={w.id}
                value={w.id}
              >
                {w.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Operation"
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <MenuItem value="ADD">
              Add
            </MenuItem>

            <MenuItem value="REMOVE">
              Remove
            </MenuItem>

            <MenuItem value="ADJUST">
              Adjust
            </MenuItem>
          </TextField>

          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={save}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={22} />
          ) : (
            "Save"
          )}
        </Button>

      </DialogActions>
    </Dialog>
  );
}