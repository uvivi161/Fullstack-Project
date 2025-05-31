import FileUploadControls from "./FileUploadControls"
import TranscriptionControls from "./TranscriptionControls"
import useFileUploader from "./useFileUploader"
import { Box, Paper } from "@mui/material"

const FileUploader = () => {
  const {
    file,
    uploadProgress,
    handleFileChange,
    handleUpload,
    uploadedFileUrl,
    pdfUrl,
    isTranscribing,
    transcribeProgress,
    transcript,
    editedTranscript,
    setEditedTranscript,
    handleTranscription,
    handleSavePdf,
    loading,
    buttonStyle,
    handleFormatTranscript, // ✅ This function exists in the hook
  } = useFileUploader()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          border: "2px solid rgba(89, 80, 71, 0.3)",
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: "rgba(249, 248, 246, 0.5)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(89, 80, 71, 0.6)",
            backgroundColor: "rgba(249, 248, 246, 0.8)",
          },
        }}
      >
        <FileUploadControls
          file={file}
          uploadProgress={uploadProgress}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          buttonStyle={buttonStyle}
        />

        <TranscriptionControls
          uploadedFileUrl={uploadedFileUrl ?? undefined}
          pdfUrl={pdfUrl ?? undefined}
          isTranscribing={isTranscribing}
          transcribeProgress={transcribeProgress}
          transcript={transcript}
          editedTranscript={editedTranscript}
          setEditedTranscript={setEditedTranscript}
          onTranscribe={handleTranscription}
          onSavePdf={handleSavePdf}
          loading={loading}
          buttonStyle={buttonStyle}
          handleFormatTranscript={handleFormatTranscript} // ✅ Fixed: Now passing the actual function
        />
      </Paper>
    </Box>
  )
}

export default FileUploader