import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MeterType } from "@/types/api";

const initialMeterState: Partial<MeterType> = {
  api_name: "",
  display_name: "",
  active: false,
  used_for_billing: false,
  type: "sum",
};

export default function CreateMeter() {
  const [newMeter, setNewMeter] =
    useState<Partial<MeterType>>(initialMeterState);

  const handleInputChange = (field: string, event: any) => {
    if (field === "active" || field === "used_for_billing") {
      setNewMeter((prev) => ({ ...prev, [field]: event.target.checked }));
    } else {
      setNewMeter((prev) => ({ ...prev, [field]: event.target.value }));
    }
  };

  const handleSubmit = async () => {
    const response = await fetch(`/api/create_meter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeter),
    });

    // Reset form after successful submission
    if (response.ok) {
      setNewMeter(initialMeterState);
    }

    console.log(response);
  };

  const meterFields = [
    "api_name",
    "display_name",
    "active",
    "used_for_billing",
    "type",
  ] as (keyof MeterType)[];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <form>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {meterFields.map((field: keyof MeterType) => {
            let control;
            if (field === "active" || field === "used_for_billing") {
              control = (
                <Checkbox
                  checked={newMeter[field] || false}
                  onChange={(event) => handleInputChange(field, event)}
                />
              );
            } else if (field === "type") {
              control = (
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={newMeter[field] || ""}
                    onChange={(event) => handleInputChange(field, event)}
                  >
                    {["sum", "max", "unique_count"].map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else {
              control = (
                <TextField
                  label={field}
                  value={newMeter[field] || ""}
                  onChange={(event) => handleInputChange(field, event)}
                />
              );
            }

            return (
              <Box
                key={field}
                display="flex"
                justifyContent="space-between"
                width="50%"
                alignItems="center"
              >
                <Typography variant="body1">{field}</Typography>
                {control}
              </Box>
            );
          })}
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
}
