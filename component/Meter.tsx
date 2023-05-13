"use client";
import { useMeters } from "@/provider/MeterContext";
import { MeterType } from "@/types/api";
import {
  Box,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface MeterProps {
  id: string;
}

export default function Meter({ id }: MeterProps) {
  const router = useRouter();
  const { meters, setMeters } = useMeters();
  const [meter, setMeter] = useState<MeterType | null>(null);

  useEffect(() => {
    if (meters.length === 0) {
      // Fetch meters from API
      fetch(`${process.env.ENVIRONMENT}/api/get_meters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data:", data);
          setMeters(data.data);
        })
        .catch((error) => console.error("Error fetching meters:", error));
    } else {
      const fetchedMeter = meters.find((meter) => meter.id === id);
      if (!fetchedMeter) return;

      setMeter(fetchedMeter);
    }
  }, [meters, id, setMeters]);

  const handleInputChange = (field: string, event: any) => {
    if (!meter) return;

    if (field === "active" || field === "used_for_billing") {
      setMeter({ ...meter, [field]: event.target.checked });
    } else {
      setMeter({ ...meter, [field]: event.target.value });
    }
  };

  const handleSubmit = async () => {
    const response = await fetch(
      `${process.env.ENVIRONMENT}/api/update_meter`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meter),
      }
    );

    router.push("/");
  };

  if (!meter) return <div>Loading data...</div>;
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <form>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {Object.entries(meter).map(([field, value]) => {
            if (["active", "used_for_billing"].includes(field)) {
              return (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="50%"
                  alignItems="center"
                >
                  <Typography variant="body1">{field}</Typography>
                  <Checkbox
                    checked={value}
                    onChange={(event) => handleInputChange(field, event)}
                  />
                </Box>
              );
            } else if (field === "type") {
              return (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="50%"
                  alignItems="center"
                >
                  <Typography variant="body1">{field}</Typography>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      value={value}
                      onChange={(event) => handleInputChange(field, event)}
                    >
                      {["sum", "max", "unique_count"].map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              );
            } else if (
              !["id", "created_time", "updated_time"].includes(field)
            ) {
              return (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="50%"
                  alignItems="center"
                >
                  <Typography variant="body1">{field}</Typography>
                  <TextField
                    label={field}
                    value={value}
                    onChange={(event) => handleInputChange(field, event)}
                  />
                </Box>
              );
            } else {
              return null;
            }
          })}
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" onClick={handleSubmit}>
            Submit changes
          </Button>
        </Box>
      </form>
    </Box>
  );
}
