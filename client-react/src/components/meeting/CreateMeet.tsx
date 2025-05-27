import { useState, useEffect, useContext } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Chip,
  Avatar,
  Grid,
  Divider,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
  Stack,
  Tooltip,
} from "@mui/material"
import {
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  CloudUpload as CloudUploadIcon,
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import { UserContext } from "../login/UserReducer"
import { LinkContext } from "./context"
import FileUploader from "./FileUploader"
import axios from "axios"
// import "../../theme.css"
import "../../css/CreateMeeting.css"

interface UserType {
  id: number
  mail: string
  role?: string
  [key: string]: any
}

const CreateMeeting = () => {
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  // const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const [user] = useContext(UserContext)
  const { pdfUrl, setPdfUrl } = useContext(LinkContext)

  // Stepper state
  const [activeStep, setActiveStep] = useState(0)
  const steps = ["Meeting Details", "Select Participants", "Upload Recording", "Review & Create"]

  // Form state
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [description, setDescription] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<UserType[]>([])
  const [allUsers, setAllUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [resetKey, setResetKey] = useState(0)
  console.log("pdfUrl from context:", pdfUrl) 

  useEffect(() => {
    const fetchUsersByCompany = async () => {
      try {
        const company = user.companyName
        const token = sessionStorage.getItem("token")
        if (!user || !user.companyName) return
        const response = await axios.get(`https://fullstack-project-tt0t.onrender.com/api/Users/getByCompanyName?company=${company}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setAllUsers(response.data)
        console.log(response.data, "------------------------")
      } catch (error) {
        console.error("Error fetching users:", error)
        setError("Failed to load users. Please try again.")
      }
    }

    fetchUsersByCompany()
  }, [user.companyName])

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleCreateMeeting = async () => {
    if (!title || !date || selectedParticipants.length === 0 || !pdfUrl) {
      setError("Please fill in all required fields and upload a file.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const token = sessionStorage.getItem("token")
      const meetingData = {
        title,
        creatorId: user.id,
        transcriptionPdfUrl: pdfUrl,
        participants: selectedParticipants.map((p) => ({ mail: p.mail })),
      }
      console.log(meetingData, "meetingData");
      
      await axios.post("https://fullstack-project-tt0t.onrender.com/api/MeetingControler", meetingData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setSuccess(true)
      // Reset form after successful creation
      setTimeout(() => {
        setTitle("")
        setDate(new Date().toISOString().split("T")[0])
        setDescription("")
        setSelectedParticipants([])
        setActiveStep(0)
        setSuccess(false)
        setPdfUrl(null)
        setResetKey(prev => prev+1)
      }, 3000)
    } catch (error) {
      console.error("Error creating meeting:", error)
      setError("Failed to create meeting. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Check if current step is complete
  const isStepComplete = () => {
    switch (activeStep) {
      case 0:
        return title.trim() !== "" && date !== ""
      case 1:
        return selectedParticipants.length > 0
      case 2:
        return pdfUrl !== null
      default:
        return true
    }
  }

  // Handle adding participants (fixed to prevent duplicates)
  // const handleAddParticipants = (newValue: UserType[]) => {
  //   // This ensures we only add participants that aren't already selected
  //   const uniqueNewParticipants = newValue.filter(
  //     (newUser) => !selectedParticipants.some((existingUser) => existingUser.id === newUser.id),
  //   )
  //   setSelectedParticipants((prev) => [...prev, ...uniqueNewParticipants])
  // }

  
  // Render step content
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className="step-content">
            <Box className="form-section">
              <Box className="section-header">
                <CalendarIcon className="section-icon" />
                <Typography variant="h6" className="section-title">
                  Meeting Information
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meeting Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    variant="outlined"
                    placeholder="Enter a descriptive title for your meeting"
                    className="text-field"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Meeting Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    className="text-field"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meeting Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Add any additional details about the meeting"
                    className="text-field"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="info-box">
              <InfoIcon className="info-icon" />
              <Typography variant="body2" className="info-text">
                Provide a clear title and accurate date to help team members identify this meeting.
              </Typography>
            </Box>
          </Box>
        )
      case 1:
        return (
          <Box className="step-content">
            <Box className="form-section">
              <Box className="section-header">
                <GroupIcon className="section-icon" />
                <Typography variant="h6" className="section-title">
                  Select Participants
                </Typography>
              </Box>

              <Box className="search-container" sx={{ width: "100%" }}>
                <Typography variant="subtitle1" className="search-title">
                  Search and add participants
                </Typography>

                <Autocomplete
                  multiple
                  id="participants-select"
                  options={allUsers.filter((user) => !selectedParticipants.some((p) => p.id === user.id))}
                  onChange={(_event, newValue) => {
                    // Instead of adding to existing participants, we'll replace with the new selection
                    const uniqueNewParticipants = newValue.filter(
                      (newUser) => !selectedParticipants.some((existingUser) => existingUser.id === newUser.id),
                    )
                    setSelectedParticipants((prev) => [...prev, ...uniqueNewParticipants])
                  }}
                  value={[]} // Always keep the input field empty
                  getOptionLabel={(option) => option.mail}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Type to search users..."
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <PersonIcon color="action" sx={{ mr: 1 }} />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                      className="search-field"
                      fullWidth // Make sure it uses full width
                    />
                  )}
                  sx={{ width: "100%" }} // Ensure the Autocomplete itself is full width
                />
              </Box>

              {selectedParticipants.length > 0 ? (
                <Box className="participants-section">
                  <Box className="participants-header">
                    <Typography variant="subtitle1" className="participants-title">
                      Selected Participants ({selectedParticipants.length})
                    </Typography>

                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      onClick={() => setSelectedParticipants([])}
                      startIcon={<DeleteIcon />}
                      className="clear-button"
                    >
                      Clear All
                    </Button>
                  </Box>

                  <Box className="participants-grid">
                    {selectedParticipants.map((participant) => (
                      <Card key={participant.id} variant="outlined" className="participant-card">
                        <CardContent className="participant-card-content">
                          <Box className="participant-info">
                            <Avatar className="participant-avatar">{participant.mail[0].toUpperCase()}</Avatar>
                            <Box className="participant-details">
                              <Tooltip title={participant.mail}>
                                <Typography variant="body1" noWrap>
                                  {participant.mail}
                                </Typography>
                              </Tooltip>
                              <Typography variant="caption" color="textSecondary">
                                {participant.role || "Team Member"}
                              </Typography>
                            </Box>
                          </Box>

                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedParticipants(selectedParticipants.filter((p) => p.id !== participant.id))
                            }}
                            className="remove-participant-button"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Box className="no-participants">
                  <GroupIcon className="no-participants-icon" />
                  <Typography variant="subtitle1" color="textSecondary">
                    No participants selected yet
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Search and add team members to your meeting
                  </Typography>
                </Box>
              )}
            </Box>

            <Box className="info-box">
              <InfoIcon className="info-icon" />
              <Typography variant="body2" className="info-text">
                All selected participants will receive access to the meeting details and transcription.
              </Typography>
            </Box>
          </Box>
        )
      case 2:
        return (
          <Box className="step-content">
            <Box className="form-section">
              <Box className="section-header">
                <CloudUploadIcon className="section-icon" />
                <Typography variant="h6" className="section-title">
                  Upload Recording
                </Typography>
              </Box>

              <Box className="upload-container">
                <CloudUploadIcon sx={{ fontSize: 48, color: "var(--devnote-primary)", mb: 2, opacity: 0.8 }} />
                <Typography variant="subtitle1" className="upload-title">
                  Audio File Upload
                </Typography>

                <Typography variant="body2" color="textSecondary" className="upload-description">
                  Upload an MP3 recording of your meeting. The file will be automatically transcribed.
                </Typography>

                <Box className="uploader-wrapper">
                  <FileUploader key={resetKey}/>
                </Box>
                {pdfUrl && (
                  <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="subtitle2" color="success.main">
                      <CheckIcon /> File processed and ready
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box className="upload-warning">
                <InfoIcon className="warning-icon" />
                <Box>
                  <Typography variant="subtitle2" className="warning-title">
                    Important:
                  </Typography>
                  <Typography variant="body2" className="warning-text">
                    The transcription process may take a few minutes. Please wait until the process is complete before
                    proceeding. If the transcription button doesn't appear immediately, please wait a moment and it will
                    show up.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )
      case 3:
        return (
          <Box className="step-content">
            <Box className="form-section">
              <Box className="section-header">
                <CheckIcon className="section-icon" />
                <Typography variant="h6" className="section-title">
                  Review & Create
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" className="review-card">
                    <CardContent>
                      <Typography variant="subtitle1" className="review-section-title">
                        <CalendarIcon fontSize="small" className="review-section-icon" />
                        Meeting Information
                      </Typography>

                      <Divider className="review-divider" />

                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Title
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {title}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Date
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {new Date(date).toLocaleDateString()}
                          </Typography>
                        </Box>

                        {description && (
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Description
                            </Typography>
                            <Typography variant="body1">{description}</Typography>
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined" className="review-card">
                    <CardContent>
                      <Typography variant="subtitle1" className="review-section-title">
                        <GroupIcon fontSize="small" className="review-section-icon" />
                        Participants ({selectedParticipants.length})
                      </Typography>

                      <Divider className="review-divider" />

                      {selectedParticipants.length > 0 ? (
                        <Box className="review-participants">
                          {selectedParticipants.map((participant) => (
                            <Chip
                              key={participant.id}
                              avatar={<Avatar>{participant.mail[0].toUpperCase()}</Avatar>}
                              label={participant.mail}
                              size="medium"
                              className="review-participant-chip"
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="error">
                          No participants selected
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card variant="outlined" className="review-card">
                    <CardContent>
                      <Typography variant="subtitle1" className="review-section-title">
                        <CloudUploadIcon fontSize="small" className="review-section-icon" />
                        Transcription File
                      </Typography>

                      <Divider className="review-divider" />

                      {pdfUrl ? (
                        <Box className="file-success">
                          <CheckIcon className="success-icon" />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Transcription file uploaded successfully
                          </Typography>
                        </Box>
                      ) : (
                        <Box className="file-error">
                          <InfoIcon className="error-icon" />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            No transcription file uploaded
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {error && (
              <Alert severity="error" className="error-alert">
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" className="success-alert">
                Meeting created successfully!
              </Alert>
            )}
          </Box>
        )
      default:
        return "Unknown step"
    }
  }

  return (
    <Box className="create-meeting-page">
      <Box className="page-header">
        <Typography variant="h4" className="page-title">
          Create New Meeting
        </Typography>
        {/* <Typography variant="body1" className="page-subtitle">
          Fill in the details, select participants, and upload your meeting recording
        </Typography> */}
      </Box>

      <Box className="stepper-container">
        <Box className="step-numbers">
          {steps.map((label, index) => (
            <Box
              key={index}
              className={`step-number ${activeStep === index ? "active" : ""} ${activeStep > index ? "completed" : ""}`}
            >
              <Box className="step-circle">{index + 1}</Box>
              <Typography className="step-label">{label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="step-container">{getStepContent(activeStep)}</Box>

      <Box className="navigation-buttons">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          className="back-button"
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handleCreateMeeting : handleNext}
          disabled={!isStepComplete() || (activeStep === steps.length - 1 && loading)}
          endIcon={
            activeStep === steps.length - 1 ? (
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SaveIcon />
              )
            ) : (
              <ArrowForwardIcon />
            )
          }
          className={activeStep === steps.length - 1 ? "create-button" : "next-button"}
        >
          {activeStep === steps.length - 1 ? (loading ? "Creating..." : "Create Meeting") : "Next"}
        </Button>
      </Box>
    </Box>
  )
}

export default CreateMeeting
