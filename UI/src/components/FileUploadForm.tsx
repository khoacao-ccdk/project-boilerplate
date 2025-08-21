import React, { useRef, useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDocumentProcess } from "./useDocumentProcess";
import { LogisticData } from "./type";

export type FileUploadFormProps = {
  onFilesSelected: (files: File[]) => void;
  onData: (data: LogisticData) => void;
};

export default function FileUploadForm({
  onFilesSelected,
  onData,
}: FileUploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { processDocuments, loading, data } = useDocumentProcess();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      onFilesSelected(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles.length) return;
    processDocuments(selectedFiles);
  };

  useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data, onData]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2} alignItems="center">
        <input
          ref={fileInputRef}
          type="file"
          name="files"
          multiple
          style={{ display: "none" }}
          id="file-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            Choose Files
          </Button>
        </label>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={loading}
        >
          Upload
        </LoadingButton>
      </Stack>
      {selectedFiles.length > 0 && (
        <Stack spacing={1} mt={2}>
          <Typography variant="subtitle2">Selected files:</Typography>
          {selectedFiles.map((file) => (
            <Typography key={file.name} variant="body2">
              {file.name}
            </Typography>
          ))}
        </Stack>
      )}
    </form>
  );
}
