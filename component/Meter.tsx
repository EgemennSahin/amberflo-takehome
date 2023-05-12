"use client";

import { useMeters } from "@/provider/MeterContext";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "field", headerName: "Field", width: 250 },
  {
    field: "value",
    headerName: "Value",
    width: 250,
    editable: true,
    renderCell: (params) => {
      // If the field is active or used_for_billing, render a checkbox
      if (["active", "used_for_billing"].includes(params.row.field)) {
        return (
          <Checkbox
            checked={params.row.value}
            onChange={(event) => {
              params.row.value = event.target.checked;
            }}
          />
        );
      }
      // If the field is type, render a select component
      if (params.row.field === "type") {
        return (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={params.row.value}
              onChange={(event) => {
                params.value = event.target.value;
              }}
            >
              {["sum", "max", "unique_count"].map((type) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      return params.row.value;
    },
  },
];

interface MeterProps {
  id: string;
}

// This is a 2 column table with the first column being the key and the second column being the value
// The first column is not editable
export default function Meter({ id }: MeterProps) {
  // Get the meter from the context
  const { meters } = useMeters();

  // TODO: If meters is empty, fetch the meters from the API
  const meter = meters.find((meter) => meter.id === id);

  console.log(meter);
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={
          meter
            ? Object.entries(meter).map(([field, value], index) => ({
                id: index,
                field,
                value,
              }))
            : []
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        isCellEditable={(params) =>
          !["id", "created_time", "updated_time"].includes(params.row.field)
        }
      />
    </Box>
  );
}
