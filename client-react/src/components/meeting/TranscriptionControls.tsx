"use client"
import { Button, LinearProgress, TextField, Box, Typography, Divider, CircularProgress } from "@mui/material"
import TextSnippetIcon from "@mui/icons-material/TextSnippet"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import DownloadIcon from "@mui/icons-material/Download"

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
              ...buttonStyle["&:hover"],
              transform: "translateY(-2px)",
            },
          }}
        >
          {isTranscribing ? "מתמלל..." : "תמלל שיחה"}
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
          <TextSnippetIcon /> עריכת תמלול:
        </Typography>

        <TextField
          multiline
          fullWidth
          rows={10}
          value={editedTranscript}
          onChange={(e) => setEditedTranscript(e.target.value)}
          sx={{
            mt: 1,
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              borderColor: "rgba(89, 80, 71, 0.3)",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(89, 80, 71, 0.6)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#595047",
              },
            },
          }}
        />

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
                      ...buttonStyle["&:hover"],
                      transform: "translateY(-2px)",
                    }
                  : {},
            }}
          >
            שמור כ־PDF
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
              הורד קובץ PDF
            </Button>
          )}
        </Box>
      </Box>
    )}
  </>
)

export default TranscriptionControls

















"use client"
// import { Button, LinearProgress, TextField, Box, Typography, Divider } from "@mui/material"
// import {
//   TextSnippet as TextSnippetIcon,
//   Download as DownloadIcon,
//   CloudUpload as CloudUploadIcon,
//   Save as SaveIcon,
// } from "@mui/icons-material"

// // This component will completely replace the buttons in FileUploader
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
//   showTranscriptEditor = true,
//   pdfSaved = false,
// }: any) => {
//   // If no file is uploaded, don't render anything
//   if (!uploadedFileUrl) return null

//   return (
//     <Box sx={{ textAlign: "center", mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
//       {/* Always show both buttons with the correct styling */}
//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <Button
//           variant="contained"
//           onClick={onTranscribe}
//           disabled={isTranscribing}
//           startIcon={<CloudUploadIcon />}
//           sx={{
//             ...buttonStyle,
//             minWidth: "160px",
//             py: 1.2,
//             fontWeight: 600,
//             transition: "all 0.3s ease",
//             bgcolor: "#1a365d !important",
//             color: "white !important",
//             "&:hover": {
//               ...buttonStyle["&:hover"],
//               transform: "translateY(-2px)",
//               bgcolor: "#0f2342 !important",
//             },
//           }}
//         >
//           {isTranscribing ? "מתמלל..." : "תמלל שיחה"}
//         </Button>

//         <Button
//           variant="contained"
//           onClick={onSavePdf}
//           disabled={loading}
//           startIcon={<SaveIcon />}
//           sx={{
//             ...buttonStyle,
//             minWidth: "160px",
//             py: 1.2,
//             fontWeight: 600,
//             transition: "all 0.3s ease",
//             bgcolor: "#1a365d !important",
//             color: "white !important",
//             "&:hover": {
//               ...buttonStyle["&:hover"],
//               transform: "translateY(-2px)",
//               bgcolor: "#0f2342 !important",
//             },
//           }}
//         >
//          Save as־PDF
//         </Button>
//       </Box>

//       {/* Show download button if PDF is saved */}
//       {pdfUrl && pdfSaved && (
//         <Button
//           variant="outlined"
//           href={pdfUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           startIcon={<DownloadIcon />}
//           sx={{
//             borderColor: "#1a365d !important",
//             color: "#1a365d !important",
//             "&:hover": {
//               borderColor: "#0f2342 !important",
//               bgcolor: "rgba(26, 54, 93, 0.05) !important",
//             },
//             minWidth: "160px",
//             py: 1.2,
//             fontWeight: 600,
//             transition: "all 0.3s ease",
//           }}
//         >
//           הורד קובץ PDF
//         </Button>
//       )}

//       {isTranscribing && (
//         <Box sx={{ mt: 3, px: 2, width: "100%" }}>
//           <LinearProgress
//             variant="determinate"
//             value={transcribeProgress}
//             sx={{
//               height: 8,
//               borderRadius: 4,
//               backgroundColor: "rgba(26, 54, 93, 0.1)",
//               "& .MuiLinearProgress-bar": {
//                 backgroundColor: "#1a365d",
//               },
//             }}
//           />
//           <Typography
//             sx={{
//               mt: 1,
//               color: "#1a365d",
//               fontWeight: 600,
//               fontSize: "0.875rem",
//               textAlign: "center",
//             }}
//           >
//             {transcribeProgress}%
//           </Typography>
//         </Box>
//       )}

//       {/* Only show transcript editor if showTranscriptEditor is true */}
//       {transcript && showTranscriptEditor && (
//         <Box sx={{ mt: 4, width: "100%" }}>
//           <Divider sx={{ mb: 3 }} />

//           <Typography
//             variant="h6"
//             sx={{
//               mb: 2,
//               color: "#1a365d",
//               fontWeight: 600,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <TextSnippetIcon /> עריכת תמלול:
//           </Typography>

//           <TextField
//             multiline
//             fullWidth
//             rows={10}
//             value={editedTranscript}
//             onChange={(e) => setEditedTranscript(e.target.value)}
//             sx={{
//               mt: 1,
//               mb: 3,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "8px",
//                 borderColor: "rgba(26, 54, 93, 0.3)",
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(26, 54, 93, 0.6)",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#1a365d",
//                 },
//               },
//             }}
//           />
//         </Box>
//       )}
//     </Box>
//   )
// }

// export default TranscriptionControls































// //"use client"
// import { Button, LinearProgress, TextField, Box, Typography, Divider } from "@mui/material"
// import {
//   TextSnippet as TextSnippetIcon,
//   Download as DownloadIcon,
//   CloudUpload as CloudUploadIcon,
//   Save as SaveIcon,
// } from "@mui/icons-material"

// // This component will completely replace the buttons in FileUploader
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
//   showTranscriptEditor = true,
//   pdfSaved = false,
// }: any) => {
//   // If no file is uploaded, don't render anything
//   if (!uploadedFileUrl) return null

//   return (
//     <Box sx={{ textAlign: "center", mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
//       {/* Show transcribe and save buttons ONLY if PDF is not saved yet */}
//       {!pdfSaved && (
//         <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//           <Button
//             variant="contained"
//             onClick={onTranscribe}
//             disabled={isTranscribing}
//             startIcon={<CloudUploadIcon />}
//             sx={{
//               ...buttonStyle,
//               minWidth: "160px",
//               py: 1.2,
//               fontWeight: 600,
//               transition: "all 0.3s ease",
//               bgcolor: "#1a365d !important",
//               color: "white !important",
//               "&:hover": {
//                 ...buttonStyle?.["&:hover"],
//                 transform: "translateY(-2px)",
//                 bgcolor: "#0f2342 !important",
//               },
//             }}
//           >
//             {isTranscribing ? "מתמלל..." : "תמלל שיחה"}
//           </Button>

//           <Button
//             variant="contained"
//             onClick={onSavePdf}
//             disabled={loading}
//             startIcon={<SaveIcon />}
//             sx={{
//               ...buttonStyle,
//               minWidth: "160px",
//               py: 1.2,
//               fontWeight: 600,
//               transition: "all 0.3s ease",
//               bgcolor: "#1a365d !important",
//               color: "white !important",
//               "&:hover": {
//                 ...buttonStyle?.["&:hover"],
//                 transform: "translateY(-2px)",
//                 bgcolor: "#0f2342 !important",
//               },
//             }}
//           >
//             שמור כ־PDF
//           </Button>
//         </Box>
//       )}

//       {/* Show download button ONLY if PDF is saved */}
//       {pdfSaved && pdfUrl && (
//         <Button
//           variant="outlined"
//           component="a"
//           href={pdfUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           startIcon={<DownloadIcon />}
//           sx={{
//             borderColor: "#1a365d !important",
//             color: "#1a365d !important",
//             "&:hover": {
//               borderColor: "#0f2342 !important",
//               bgcolor: "rgba(26, 54, 93, 0.05) !important",
//             },
//             minWidth: "160px",
//             py: 1.2,
//             fontWeight: 600,
//             transition: "all 0.3s ease",
//           }}
//         >
//           הורד קובץ PDF
//         </Button>
//       )}

//       {isTranscribing && (
//         <Box sx={{ mt: 3, px: 2, width: "100%" }}>
//           <LinearProgress
//             variant="determinate"
//             value={transcribeProgress}
//             sx={{
//               height: 8,
//               borderRadius: 4,
//               backgroundColor: "rgba(26, 54, 93, 0.1)",
//               "& .MuiLinearProgress-bar": {
//                 backgroundColor: "#1a365d",
//               },
//             }}
//           />
//           <Typography
//             sx={{
//               mt: 1,
//               color: "#1a365d",
//               fontWeight: 600,
//               fontSize: "0.875rem",
//               textAlign: "center",
//             }}
//           >
//             {transcribeProgress}%
//           </Typography>
//         </Box>
//       )}

//       {/* Only show transcript editor if showTranscriptEditor is true */}
//       {transcript && showTranscriptEditor && (
//         <Box sx={{ mt: 4, width: "100%" }}>
//           <Divider sx={{ mb: 3 }} />

//           <Typography
//             variant="h6"
//             sx={{
//               mb: 2,
//               color: "#1a365d",
//               fontWeight: 600,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <TextSnippetIcon /> עריכת תמלול:
//           </Typography>

//           <TextField
//             multiline
//             fullWidth
//             rows={10}
//             value={editedTranscript}
//             onChange={(e) => setEditedTranscript(e.target.value)}
//             sx={{
//               mt: 1,
//               mb: 3,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "8px",
//                 borderColor: "rgba(26, 54, 93, 0.3)",
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(26, 54, 93, 0.6)",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#1a365d",
//                 },
//               },
//             }}
//           />
//         </Box>
//       )}
//     </Box>
//   )
// }

// export default TranscriptionControls
