
// "use client"

// import {
//   Button,
//   LinearProgress,
//   TextField,
//   Box,
//   Typography,
//   Divider,
//   CircularProgress,
//   IconButton,
//   Tooltip,
// } from "@mui/material"
// import TextSnippetIcon from "@mui/icons-material/TextSnippet"
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
// import DownloadIcon from "@mui/icons-material/Download"
// import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
// import { useState } from "react"

// interface TranscriptionControlsProps {
//   uploadedFileUrl?: string
//   pdfUrl?: string
//   isTranscribing: boolean
//   transcribeProgress: number
//   transcript?: string
//   editedTranscript: string
//   setEditedTranscript: (value: string) => void
//   onTranscribe: () => void
//   onSavePdf: () => void
//   loading: boolean
//   buttonStyle?: any
//   handleFormatTranscript: () => void
// }

// const TranscriptionControls = ({
//   uploadedFileUrl,
//   pdfUrl,
//   isTranscribing,
//   transcribeProgress,
//   transcript,
//   editedTranscript,
//   setEditedTranscript,
//   onTranscribe,
//   onSavePdf,
//   loading,
//   buttonStyle,
//   handleFormatTranscript,
// }: TranscriptionControlsProps) => {
//   const [isFormatting, setIsFormatting] = useState(false)

//   const handleAIFormat = async () => {
//     setIsFormatting(true)
//     try {
//       await handleFormatTranscript()
//     } finally {
//       setIsFormatting(false)
//     }
//   }

//   return (
//     <>
//       {uploadedFileUrl && !pdfUrl && (
//         <Box sx={{ textAlign: "center", mt: 2 }}>
//           <Button
//             variant="outlined"
//             onClick={onTranscribe}
//             disabled={isTranscribing}
//             startIcon={<TextSnippetIcon />}
//             sx={{
//               ...buttonStyle,
//               minWidth: "160px",
//               py: 1.2,
//               fontWeight: 600,
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 ...buttonStyle?.["&:hover"],
//                 transform: "translateY(-2px)",
//               },
//             }}
//           >
//             {isTranscribing ? "Transcription..." : "Transcibe your text"}
//           </Button>
//         </Box>
//       )}

//       {isTranscribing && (
//         <Box sx={{ mt: 3, px: 2 }}>
//           <LinearProgress
//             variant="determinate"
//             value={transcribeProgress}
//             sx={{
//               height: 8,
//               borderRadius: 4,
//               backgroundColor: "rgba(89, 80, 71, 0.1)",
//               "& .MuiLinearProgress-bar": {
//                 backgroundColor: "#595047",
//               },
//             }}
//           />
//           <Typography
//             sx={{
//               mt: 1,
//               color: "#595047",
//               fontWeight: 600,
//               fontSize: "0.875rem",
//               textAlign: "center",
//             }}
//           >
//             {transcribeProgress}%
//           </Typography>
//         </Box>
//       )}

//       {transcript && (
//         <Box sx={{ mt: 4, width: "100%" }}>
//           <Divider sx={{ mb: 3 }} />

//           <Typography
//             variant="h6"
//             sx={{
//               mb: 2,
//               color: "#595047",
//               fontWeight: 600,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <TextSnippetIcon /> Edit Text:
//           </Typography>

//           {/* Container for TextField with floating AI button */}
//           <Box sx={{ position: "relative", mt: 1, mb: 3 }}>
//             <TextField
//               multiline
//               fullWidth
//               rows={10}
//               value={editedTranscript}
//               onChange={(e) => setEditedTranscript(e.target.value)}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "8px",
//                   borderColor: "rgba(89, 80, 71, 0.3)",
//                   paddingRight: editedTranscript ? "48px" : "14px", // Make space for AI button
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "rgba(89, 80, 71, 0.6)",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#595047",
//                   },
//                 },
//               }}
//               placeholder="transcrption text will be here..."
//             />

//             {/* Floating AI Format Button */}
//             {editedTranscript && (
//               <Tooltip title="Edit your text by AI" placement="top">
//                 <IconButton
//                   onClick={handleAIFormat}
//                   disabled={isFormatting}
//                   sx={{
//                     position: "absolute",
//                     top: 8,
//                     right: 8,
//                     width: 32,
//                     height: 32,
//                     backgroundColor: "rgba(255, 255, 255, 0.9)",
//                     color: "#595047",
//                     border: "1px solid rgba(89, 80, 71, 0.2)",
//                     transition: "all 0.2s ease",
//                     "&:hover": {
//                       backgroundColor: "rgba(242, 213, 68, 0.7)",
//                       color: "#ffffff",
//                       transform: "scale(1.05)",
//                     },
//                     "&:disabled": {
//                       backgroundColor: "rgba(255, 255, 255, 0.7)",
//                       color: "rgba(89, 80, 71, 0.5)",
//                     },
//                   }}
//                 >
//                   {isFormatting ? (
//                     <CircularProgress size={16} color="inherit" />
//                   ) : (
//                     <AutoFixHighIcon sx={{ fontSize: 16 }} />
//                   )}
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
//             <Button
//               variant="outlined"
//               onClick={onSavePdf}
//               disabled={loading || !editedTranscript}
//               startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />}
//               sx={{
//                 ...buttonStyle,
//                 minWidth: "160px",
//                 py: 1.2,
//                 fontWeight: 600,
//                 opacity: loading || !editedTranscript ? 0.6 : 1,
//                 transition: "all 0.3s ease",
//                 "&:hover":
//                   !loading && editedTranscript
//                     ? {
//                         ...buttonStyle?.["&:hover"],
//                         transform: "translateY(-2px)",
//                       }
//                     : {},
//               }}
//             >
//               save as PDF
//             </Button>

//             {pdfUrl && (
//               <Button
//                 variant="contained"
//                 href={pdfUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 startIcon={<DownloadIcon />}
//                 sx={{
//                   minWidth: "160px",
//                   py: 1.2,
//                   fontWeight: 600,
//                   backgroundColor: "#595047",
//                   color: "#ffffff",
//                   borderRadius: "8px",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     backgroundColor: "#3a3631",
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 Download PDF
//               </Button>
//             )}
//           </Box>
//         </Box>
//       )}
//     </>
//   )
// }

// export default TranscriptionControls


























"use client"

import {
  Button,
  LinearProgress,
  TextField,
  Box,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material"
import TextSnippetIcon from "@mui/icons-material/TextSnippet"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import DownloadIcon from "@mui/icons-material/Download"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import { useState } from "react"

interface TranscriptionControlsProps {
  uploadedFileUrl?: string
  pdfUrl?: string
  isTranscribing: boolean
  transcribeProgress: number
  transcript?: string
  editedTranscript: string
  setEditedTranscript: (value: string) => void
  onTranscribe: () => void
  onSavePdf: () => void
  loading: boolean
  buttonStyle?: any
  handleFormatTranscript: () => void
}

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
  handleFormatTranscript,
}: TranscriptionControlsProps) => {
  const [isFormatting, setIsFormatting] = useState(false)

  const handleAIFormat = async () => {
    setIsFormatting(true)
    try {
      await handleFormatTranscript()
    } finally {
      setIsFormatting(false)
    }
  }

  return (
    <>
      {uploadedFileUrl && !pdfUrl && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={onTranscribe}
            disabled={isTranscribing}
            startIcon={<TextSnippetIcon />}
            sx={{
              ...buttonStyle,
              minWidth: "160px",
              py: 1.2,
              fontWeight: 600,
              transition: "all 0.3s ease",
              "&:hover": {
                ...buttonStyle?.["&:hover"],
                transform: "translateY(-2px)",
              },
            }}
          >
            {isTranscribing ? "Transcription..." : "Transcibe your text"}
          </Button>
        </Box>
      )}

      {isTranscribing && (
        <Box sx={{ mt: 3, px: 2 }}>
          <LinearProgress
            variant="determinate"
            value={transcribeProgress}
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
              textAlign: "center",
            }}
          >
            {transcribeProgress}%
          </Typography>
        </Box>
      )}

      {transcript && (
        <Box sx={{ mt: 4, width: "100%" }}>
          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "#595047",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextSnippetIcon /> Edit Text:
          </Typography>

          {/* Container for TextField with floating AI button */}
          <Box sx={{ position: "relative", mt: 1, mb: 3 }}>
            <TextField
              multiline
              fullWidth
              rows={10}
              value={editedTranscript}
              onChange={(e) => setEditedTranscript(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  borderColor: "rgba(89, 80, 71, 0.3)",
                  paddingRight: editedTranscript ? "48px" : "14px", // Make space for AI button
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(89, 80, 71, 0.6)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#595047",
                  },
                },
              }}
              placeholder="transcrption text will be here..."
            />

            {/* Floating AI Format Button */}
            {editedTranscript && (
              <Tooltip title="Edit your text by AI" placement="top">
                <IconButton
                  onClick={handleAIFormat}
                  disabled={isFormatting}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 32,
                    height: 32,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    color: "#595047",
                    border: "1px solid rgba(89, 80, 71, 0.2)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(242, 213, 68, 0.7)",
                      color: "#ffffff",
                      transform: "scale(1.05)",
                    },
                    "&:disabled": {
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      color: "rgba(89, 80, 71, 0.5)",
                    },
                  }}
                >
                  {isFormatting ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              onClick={onSavePdf}
              disabled={loading || !editedTranscript}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />}
              sx={{
                ...buttonStyle,
                minWidth: "160px",
                py: 1.2,
                fontWeight: 600,
                opacity: loading || !editedTranscript ? 0.6 : 1,
                transition: "all 0.3s ease",
                "&:hover":
                  !loading && editedTranscript
                    ? {
                        ...buttonStyle?.["&:hover"],
                        transform: "translateY(-2px)",
                      }
                    : {},
              }}
            >
              save as PDF
            </Button>

            {pdfUrl && (
              <Button
                variant="contained"
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<DownloadIcon />}
                sx={{
                  minWidth: "160px",
                  py: 1.2,
                  fontWeight: 600,
                  backgroundColor: "#595047",
                  color: "#ffffff",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#3a3631",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Download PDF
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default TranscriptionControls
