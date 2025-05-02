import React from 'react';
import { Button, LinearProgress, TextField } from '@mui/material';

const TranscriptionControls = ({
  uploadedFileUrl,
  pdfUrl,
  isTranscribing,
  transcribeProgress,
  transcript,
  editedTranscript,
  setEditedTranscript,
  onTranscribe,
  onSavePdf,
  loading,
  buttonStyle,
}: any) => (
  <>
    {uploadedFileUrl && !pdfUrl && (
      <div>
        <Button
          variant="outlined"
          onClick={onTranscribe}
          disabled={isTranscribing}
          sx={buttonStyle}
        >
          {isTranscribing ? 'מתמלל...' : 'תמלל שיחה'}
        </Button>
      </div>
    )}

    {isTranscribing && (
      <div style={{ marginTop: '10px' }}>
        <LinearProgress variant="determinate" value={transcribeProgress} />
        <div>{transcribeProgress}%</div>
      </div>
    )}

    {transcript && (
      <div style={{ marginTop: 20 }}>
        <h3>עריכת תמלול:</h3>
        <TextField
          multiline
          fullWidth
          rows={10}
          value={editedTranscript}
          onChange={(e) => setEditedTranscript(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Button
          variant="outlined"
          onClick={onSavePdf}
          disabled={loading || !editedTranscript}
          sx={buttonStyle}
        >
          שמור כ־PDF
        </Button>
        {pdfUrl && (
        <div style={{ marginTop: '10px' }}>
          <Button
            variant="outlined"
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonStyle}
          >
            📄 הורד קובץ PDF
          </Button>
        </div>
      )}
      </div>
    )}
  </>
);

export default TranscriptionControls;
