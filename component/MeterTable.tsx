"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Meter } from "@/types/api";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "api_name", headerName: "API Name", width: 200 },
  { field: "display_name", headerName: "Display Name", width: 150 },
  { field: "active", headerName: "Active", width: 120, type: "boolean" },
  {
    field: "used_for_billing",
    headerName: "Used for Billing",
    width: 120,
    type: "boolean",
  },
  { field: "updated_time", headerName: "Updated Time", width: 200 },
  { field: "created_time", headerName: "Created Time", width: 200 },
  { field: "type", headerName: "Type", width: 150 },
];

interface MeterTableProps {
  meters: Meter[];
}

export default function MeterTable({ meters }: MeterTableProps) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={meters}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}
