import { useRequest } from "ahooks";

export function useDocumentProcess() {
  const { run, loading, data, error } = useRequest(
    async (selectedFiles: File[]) => {
      if (!selectedFiles.length) return null;
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("http://127.0.0.1:8000/process-documents", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to process documents");
      }
      return (await response.json()).extracted_data;
    },
    {
      manual: true,
    }
  );

  return {
    processDocuments: run,
    loading,
    data,
    error,
  };
}
