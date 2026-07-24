import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";

import toast from "react-hot-toast";
import { usersApi } from "../api";

interface Props {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
  user?: any;
}

export default function UserModal({
  open,
  onClose,
  refresh,
  user,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
        role: "USER",
      });
    }
  }, [user, open]);

  async function save() {
    try {
      setLoading(true);

      const payload: any = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      if (form.password.trim() !== "") {
        payload.password = form.password;
      }

      if (user) {
        await usersApi.update(user.id, payload);
        toast.success("User updated successfully");
      } else {
        await usersApi.create(payload);
        toast.success("User created successfully");
      }

      refresh();
      onClose();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Operation failed"
      );
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
        {user ? "Edit User" : "Create User"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={2}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label={
              user
                ? "New Password (optional)"
                : "Password"
            }
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            select
            label="Role"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </TextField>
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
          ) : user ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}