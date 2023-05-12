"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MeterType } from "@/types/api";
import { useRouter } from "next/navigation";
import { useMeters } from "@/provider/MeterContext";
import { useEffect } from "react";
import { Button } from "@mui/material";

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
  rows: MeterType[];
}

export default function MeterTable({ rows }: MeterTableProps) {
  const { setMeters } = useMeters();

  // Set the meters in the context on first render
  useEffect(() => {
    setMeters(rows);
  }, []);

  const router = useRouter();
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        onRowClick={(params, event) => {
          // Route to the meter page
          router.push(`/meter/${params.id}`);
        }}
        rows={rows}
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
      <Button onClick={() => router.push("/create-meter")} variant="contained">
        Create Meter
      </Button>
    </Box>
  );
}
