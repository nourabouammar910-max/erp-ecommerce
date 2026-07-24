import { DataGrid } from "@mui/x-data-grid";
import type {
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import {
  Stack,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";

import {
  Edit,
  Delete,
  Visibility,
} from "@mui/icons-material";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import { productsApi } from "../api";

interface Product {
  id: number;
  name: string;
  price: number;
  cost: number;
  category?: {
    id: number;
    name: string;
  } | null;
}

interface Props {
  products: Product[];
  refresh: () => Promise<void> | void;
  onEdit: (product: Product) => void;
}

export default function ProductsTable({
  products,
  refresh,
  onEdit,
}: Props) {
  async function handleDelete(id: number) {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await productsApi.remove(id);
      toast.success("Product deleted");
      await refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Delete failed"
      );
    }
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "name",
      headerName: "Product",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      valueFormatter: ({ value }) =>
        `$${Number(value).toLocaleString()}`,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 120,
      valueFormatter: ({ value }) =>
        `$${Number(value).toLocaleString()}`,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          size="small"
          label={
            (params.row as Product).category?.name ??
            "No Category"
          }
          color={
            (params.row as Product).category
              ? "primary"
              : "default"
          }
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 320,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          height="100%"
        >
          <Tooltip title="View">
            <Button
              size="small"
              color="info"
              variant="outlined"
              startIcon={<Visibility />}
              onClick={() =>
                toast.success((params.row as Product).name)
              }
            >
              View
            </Button>
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              size="small"
              variant="contained"
              startIcon={<Edit />}
              onClick={() =>
                onEdit(params.row as Product)
              }
            >
              Edit
            </Button>
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              size="small"
              color="error"
              variant="contained"
              startIcon={<Delete />}
              onClick={() =>
                handleDelete((params.row as Product).id)
              }
            >
              Delete
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", height: 650 }}>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20, 50]}
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