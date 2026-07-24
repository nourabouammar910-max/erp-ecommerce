import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import {
  Button,
  Chip,
  Stack,
} from "@mui/material";

import {
  Edit,
  Delete,
} from "@mui/icons-material";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import { usersApi } from "../api";
import type { User } from "../types/user";

interface Props {
  users: User[];
  refresh: () => void;
  onEdit: (user: User) => void;
}

export default function UsersTable({
  users,
  refresh,
  onEdit,
}: Props) {
  async function removeUser(id: number) {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await usersApi.remove(id);

      toast.success("User deleted");

      refresh();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Delete failed"
      );
    }
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },

    {
      field: "role",
      headerName: "Role",
      width: 130,

      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value}
          color={
            params.value === "ADMIN"
              ? "error"
              : params.value === "EMPLOYEE"
              ? "warning"
              : "primary"
          }
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<Edit />}
            onClick={() =>
              onEdit(params.row)
            }
          >
            Edit
          </Button>

          <Button
            color="error"
            variant="contained"
            size="small"
            startIcon={<Delete />}
            onClick={() =>
              removeUser(params.row.id)
            }
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div
      style={{
        height: 600,
        width: "100%",
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50]}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
    </div>
  );
}