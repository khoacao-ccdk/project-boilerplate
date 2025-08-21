import React, { useEffect, useState } from "react";
import { Paper, Stack, Typography, CircularProgress } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import * as XLSX from "xlsx";

// Import worker from node_modules
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type FileContentViewerProps = {
  files: File[];
};

export default function FileContentViewer({ files }: FileContentViewerProps) {
  const [excelData, setExcelData] = useState<Record<string, any[][]>>({});
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, _setPageNumber] = useState<number>(1);
  const [pdfError, setPdfError] = useState<string>("");

  useEffect(() => {
    setExcelData({});
    files.forEach((file) => {
      if (file.name.endsWith(".xlsx")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setExcelData((prev) => ({
            ...prev,
            [file.name]: json as any[][],
          }));
        };
        reader.readAsArrayBuffer(file);
      }
    });
  }, [files]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfError("");
  };

  const handleError = (error: Error) => {
    console.error("PDF Error:", error);
    setPdfError(error.message);
  };

  if (files.length === 0) return null;

  return (
    <Stack spacing={1}>
      <Typography variant="h6">File Contents</Typography>
      {files.map((file) => (
        <Paper key={file.name} variant="outlined" sx={{ p: 1, mb: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {file.name}
          </Typography>

          {/* PDF Viewer */}
          {file.type === "application/pdf" || file.name.endsWith(".pdf") ? (
            <div style={{ maxWidth: 600 }}>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={handleError}
                loading={<CircularProgress />}
              >
                {!pdfError ? (
                  <Page
                    pageNumber={pageNumber}
                    width={600}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ) : (
                  <Typography color="error">
                    Failed to load PDF: {pdfError}
                  </Typography>
                )}
              </Document>
              {!pdfError && (
                <Typography variant="caption">
                  Page {pageNumber} of {numPages}
                </Typography>
              )}
            </div>
          ) : null}

          {/* Excel Viewer */}
          {excelData[file.name] && (
            <div style={{ overflowX: "auto", maxHeight: 300 }}>
              <table style={{ fontFamily: "monospace", background: "#f5f5f5" }}>
                <tbody>
                  {excelData[file.name].map((row, i) => (
                    <tr key={i}>
                      {(row as any[]).map((cell, j) => (
                        <td
                          key={j}
                          style={{ border: "1px solid #ccc", padding: 4 }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Paper>
      ))}
    </Stack>
  );
}
