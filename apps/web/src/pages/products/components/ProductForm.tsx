import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import toast from "react-hot-toast";

import { useCategories } from "../../categories/hooks/useCategories";
import { productsApi } from "../api";

interface Props {
  open: boolean;
  onClose: () => void;
  refresh: () => void | Promise<void>;
  product?: any;
}

export default function ProductForm({
  open,
  onClose,
  refresh,
  product,
}: Props) {
  const { categories } = useCategories();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    cost: "",
    categoryId: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? "",
        price: String(product.price ?? ""),
        cost: String(product.cost ?? ""),
        categoryId: String(product.categoryId ?? ""),
      });
    } else {
      setForm({
        name: "",
        price: "",
        cost: "",
        categoryId: "",
      });
    }
  }, [product, open]);

  async function save() {
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!form.price) {
      toast.error("Price is required");
      return;
    }

    if (!form.cost) {
      toast.error("Cost is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        cost: Number(form.cost),
        categoryId: form.categoryId
          ? Number(form.categoryId)
          : undefined,
      };

      if (product) {
        await productsApi.update(product.id, payload);
        toast.success("Product updated successfully");
      } else {
        await productsApi.create(payload);
        toast.success("Product created successfully");
      }

      await refresh();

      onClose();
    } catch (err: any) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ??
          "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {product ? "Edit Product" : "Create Product"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Product Name"
            fullWidth
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <TextField
            label="Price"
            type="number"
            fullWidth
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <TextField
            label="Cost"
            type="number"
            fullWidth
            value={form.cost}
            onChange={(e) =>
              setForm({
                ...form,
                cost: e.target.value,
              })
            }
          />

          <TextField
            select
            label="Category"
            fullWidth
            value={form.categoryId}
            onChange={(e) =>
              setForm({
                ...form,
                categoryId: e.target.value,
              })
            }
          >
            <MenuItem value="">
              No Category
            </MenuItem>

            {categories.map((cat: any) => (
              <MenuItem
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={save}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={22} />
          ) : product ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}