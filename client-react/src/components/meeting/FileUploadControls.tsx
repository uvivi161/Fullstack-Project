"use client"

import type React from "react"
import { Button, LinearProgress, Typography, Box, Stack } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"

const FileUploadControls = ({
  file,
  uploadProgress,
  onFileChange,
  onUpload,
  buttonStyle,
}: {
  file: File | null
  uploadProgress: number
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpload: () => void
  buttonStyle: any
}) => (
  <Box sx={{ textAlign: "center", mb: file ? 3 : 0 }}>
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <input
        accept="audio/mpeg,application/pdf"
        style={{ display: "none" }}
        id="upload-input"
        type="file"
        onChange={onFileChange}
      />
      <label htmlFor="upload-input">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{
            ...buttonStyle,
            minWidth: "140px",
            py: 1.2,
            fontWeight: 600,
            transition: "all 0.3s ease",
            "&:hover": {
              ...buttonStyle["&:hover"],
              transform: "translateY(-2px)",
            },
          }}
        >
          Select a file
        </Button>
      </label>

      <Button
        variant="outlined"
        onClick={onUpload}
        disabled={!file}
        startIcon={<InsertDriveFileIcon />}
        sx={{
          ...buttonStyle,
          minWidth: "140px",
          py: 1.2,
          fontWeight: 600,
          opacity: !file ? 0.6 : 1,
          transition: "all 0.3s ease",
          "&:hover": file
            ? {
                ...buttonStyle["&:hover"],
                transform: "translateY(-2px)",
              }
            : {},
        }}
      >
        Upload a file
         </Button>
    </Stack>

    {file && (
      <Box
        sx={{
          p: 2,
          borderRadius: "8px",
          backgroundColor: "rgba(89, 80, 71, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <InsertDriveFileIcon sx={{ color: "#595047" }} />
        <Typography sx={{ color: "#595047", fontWeight: 500 }}>{file.name}</Typography>
      </Box>
    )}

    {uploadProgress > 0 && uploadProgress < 100 && (
      <Box sx={{ mt: 3, px: 2 }}>
        <LinearProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "rgba(89, 80, 71, 0.1)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#595047",
            },
          }}
        />
        <Typography
          sx={{
            mt: 1,
            color: "#595047",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          {uploadProgress}%
        </Typography>
      </Box>
    )}
  </Box>
)

export default FileUploadControls
