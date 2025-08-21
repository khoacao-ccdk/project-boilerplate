import React from "react";
import { Stack, TextField } from "@mui/material";
import { LogisticData } from "./type";

export type DataViewerProps = {
  data: LogisticData;
};

export default function DataViewer({ data }: DataViewerProps) {
  return (
    <Stack spacing={2}>
      {Object.entries(data).map(([key, value]) => (
        <TextField
          key={key}
          label={key}
          value={value}
          onChange={undefined}
          variant="outlined"
          fullWidth
        />
      ))}
    </Stack>
  );
}
