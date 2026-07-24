import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import { Chip } from "@mui/material";

interface Props {
  movements: any[];
}

export default function MovementsTable({
  movements,
}: Props) {
  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      valueGetter: (_, row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },

    {
      field: "product",
      headerName: "Product",
      flex: 1,
      valueGetter: (_, row) =>
        row.product?.name,
    },

    {
      field: "warehouse",
      headerName: "Warehouse",
      flex: 1,
      valueGetter: (_, row) =>
        row.warehouse?.name,
    },

    {
      field: "type",
      headerName: "Operation",
      width: 150,

      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "ADD"
              ? "success"
              : params.value === "REMOVE"
              ? "error"
              : "warning"
          }
          size="small"
        />
      ),
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
    },
  ];

  return (
    <div
      style={{
        height: 500,
        width: "100%",
      }}
    >
      <DataGrid
        rows={movements}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20]}
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