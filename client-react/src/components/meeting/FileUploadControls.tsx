import React from 'react';
import { Button, LinearProgress, Typography } from '@mui/material';

const FileUploadControls = ({
  file,
  uploadProgress,
  onFileChange,
  onUpload,
  buttonStyle,
}: {
  file: File | null;
  uploadProgress: number;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  buttonStyle: any;
}) => (
  <>
    <input
      accept="audio/mpeg,application/pdf"
      style={{ display: 'none' }}
      id="upload-input"
      type="file"
      onChange={onFileChange}
    />
    <label htmlFor="upload-input">
      <Button variant="outlined" component="span" sx={buttonStyle}>
        בחר קובץ
      </Button>
    </label>

    {file && (
      <Typography sx={{ mt: 1 }} color="textSecondary">
        {file.name}
      </Typography>
    )}

    <div>
      <Button
        variant="outlined"
        onClick={onUpload}
        disabled={!file}
        sx={buttonStyle}
      >
        העלה קובץ
      </Button>
    </div>

    {uploadProgress > 0 && uploadProgress < 100 && (
      <div style={{ marginTop: '10px' }}>
        <LinearProgress variant="determinate" value={uploadProgress} />
        <div>{uploadProgress}%</div>
      </div>
    )}
  </>
);

export default FileUploadControls;
