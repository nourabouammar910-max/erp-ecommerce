import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import {
  Button,
  Stack,
  Chip,
} from "@mui/material";

import {
  Edit,
  Delete,
} from "@mui/icons-material";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import { ordersApi } from "../api";

interface Props {
  orders: any[];
  refresh: () => void;
  onEdit: (order: any) => void;
}

export default function OrdersTable({
  orders,
  refresh,
  onEdit,
}: Props) {
  async function remove(id: string) {
    const result = await Swal.fire({
      title: "Delete Order?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      await ordersApi.remove(id);

      toast.success("Order deleted");

      refresh();
    } catch {
      toast.error("Delete failed");
    }
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },

    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      valueGetter: (_, row) => row.customer?.name ?? "Unknown",
    },

    {
      field: "total",
      headerName: "Total",
      width: 130,
      valueFormatter: ({ value }) =>
        `$${Number(value).toLocaleString()}`,
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Completed"
              ? "success"
              : "warning"
          }
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 230,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="contained"
            startIcon={<Edit />}
            onClick={() => onEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<Delete />}
            onClick={() => remove(params.row.id)}
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
        rows={orders}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
      />
    </div>
  );
}