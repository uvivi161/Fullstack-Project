import React from 'react';
import FileUploadControls from './FileUploadControls';
import TranscriptionControls from './TranscriptionControls';
import AlertSnackbar from './AlertSnackbar';
import useFileUploader from './useFileUploader';

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
    open,
    alertMessage,
    alertSeverity,
    closeAlert,
    buttonStyle,
  } = useFileUploader();

  return (
    <div style={{
      border: '2px solid #595047',
      borderRadius: '12px',
      padding: '20px',
      margin: '0 auto',
      textAlign: 'center',
      minWidth: '18px',
      overflow: 'visible'
    }}>
      <FileUploadControls
        file={file}
        uploadProgress={uploadProgress}
        onFileChange={handleFileChange}
        onUpload={handleUpload}
        buttonStyle={buttonStyle}
      />

      <TranscriptionControls
        uploadedFileUrl={uploadedFileUrl}
        pdfUrl={pdfUrl}
        isTranscribing={isTranscribing}
        transcribeProgress={transcribeProgress}
        transcript={transcript}
        editedTranscript={editedTranscript}
        setEditedTranscript={setEditedTranscript}
        onTranscribe={handleTranscription}
        onSavePdf={handleSavePdf}
        loading={loading}
        buttonStyle={buttonStyle}
      />

      <AlertSnackbar
        open={open}
        onClose={closeAlert}
        message={alertMessage}
        severity={alertSeverity}
      />
    </div>
  );
};

export default FileUploader;








