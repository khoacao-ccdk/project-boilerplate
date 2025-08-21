import React from "react";
import { Typography, Stack, Grid } from "@mui/material";
import DataViewer from "./components/DataViewer";
import FileUploadForm from "./components/FileUploadForm";
import { LogisticData } from "./components/type";
import FileContentViewer from "./components/FileContentViewer";

const DEFAULT_EMPTY_LOGICTIC_DATA: LogisticData = {
  "Bill of lading number": "",
  "Container Number": "",
  "Consignee Name": "",
  "Consignee Address": "",
  Date: "",
  "Line Items Count": 0,
  "Average Gross Weight": 0,
  "Average Price": 0,
};

function App() {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [data, setData] = React.useState<LogisticData>(
    DEFAULT_EMPTY_LOGICTIC_DATA
  );

  return (
    <Stack spacing={2} style={{ overflow: "scroll" }}>
      <Typography variant="h2">Logistics Info Extraction</Typography>
      <FileUploadForm
        onData={(extractedData) => setData(extractedData)}
        onFilesSelected={(files) => setSelectedFiles(files)}
      />
      <Grid container spacing={1}>
        <Grid size={5}>
          <DataViewer data={data} />
        </Grid>
        <Grid size={7}>
          <FileContentViewer files={selectedFiles} />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
