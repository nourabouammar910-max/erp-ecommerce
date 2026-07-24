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

import { useNavigate } from "react-router-dom";

interface Props {
  purchases: any[];
  refresh: () => void;
}

export default function PurchasesTable({
  purchases,
  refresh,
}: Props) {
  const navigate = useNavigate();

  async function remove(id: number) {
    if (!confirm("Delete purchase?")) {
      return;
    }

    // سيتم ربط الـ API لاحقاً
    refresh();
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },

    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
      valueGetter: (_, row) =>
        row.supplier?.name,
    },

    {
      field: "warehouse",
      headerName: "Warehouse",
      flex: 1,
      valueGetter: (_, row) =>
        row.warehouse?.name,
    },

    {
      field: "total",
      headerName: "Total",
      width: 130,
    },

    {
      field: "status",
      headerName: "Status",
      width: 130,

      renderCell: (params) => (
        <Chip
          label={params.value || "Completed"}
          color="success"
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            size="small"
            variant="contained"
            startIcon={<Edit />}
            onClick={() =>
              navigate(
                `/purchases/${params.row.id}/edit`
              )
            }
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<Delete />}
            onClick={() =>
              remove(params.row.id)
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
        rows={purchases}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
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