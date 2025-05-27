"use client"
import type React from "react"

import { useContext, useState, useEffect, useRef, type SetStateAction } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Container,
  IconButton,
  TextField,
  Link,
  CircularProgress,
  Chip,
  Divider,
  Paper,
  Avatar,
  Box,
  Tooltip,
  Pagination,
  Badge,
  Switch,
  FormControlLabel,
} from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import DescriptionIcon from "@mui/icons-material/Description"
import PeopleIcon from "@mui/icons-material/People"
import EmailIcon from "@mui/icons-material/Email"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import SortIcon from "@mui/icons-material/Sort"
import NotificationsIcon from "@mui/icons-material/Notifications"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { UserContext } from "./login/UserReducer"
import "../theme.css"
import "../css/my-meetings.css"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import CheckIcon from "@mui/icons-material/Check"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

const MyMeetings = () => {
  // Empty meeting structure
  const emptyMeeting = {
    id: 0,
    creatorId: 1,
    title: "",
    occurredIn: "",
    isViewd: false,
    transcriptionPdfUrl: "",
    participants: [{ id: 0, mail: "" }],
  }

  // States
  const [user] = useContext(UserContext)
  const [meetings, setMeetings] = useState<{ id: number; title: string; occurredIn: string; isViewd: boolean }[]>([])
  const [selectedMeeting, setSelectedMeeting] = useState(emptyMeeting)
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [meetingToDelete, setMeetingToDelete] = useState<{ id: number; title: string } | null>(null)
  const [confirmationText, setConfirmationText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [creatorMail, setCreatorMail] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const meetingsPerPage = 6
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [filterKeyword, setFilterKeyword] = useState<string | null>(null)
  const [showUnviewedOnly, setShowUnviewedOnly] = useState(false)
  const filterKeywords = ["meeting", "review", "planning", "discussion", "update"]

  // Reference to store data returned from server - updates synchronously
  const currentMeetingDataRef = useRef(null)

  useEffect(() => {
    if (user) {
      fetchMeetings()
    }
  }, [user])

  const fetchMeetings = async () => {
    try {
      setIsLoading(true)
      let res

      if (user.role === "teamLeader") {
        // Team Leader - fetch by creator
        res = await fetch(`https://fullstack-project-tt0t.onrender.com/api/MeetingControler/getByCreatorId?creatorMail=${user.mail}`)
      } else if (user.role === "developer") {
        // Developer - fetch by participant
        res = await fetch(`https://fullstack-project-tt0t.onrender.com/api/Users/getAllMeetings?id=${user.id}`)
      } else {
        console.warn("Unrecognized role, no meetings loaded.")
        return
      }
      if (!res.ok) {
         const errorText = await res.text(); // לא json
          throw new Error(errorText);
      }
      const data = await res.json()
      setMeetings(data)
    } catch (err) {
      console.error("Error fetching meetings:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Open meeting details dialog - new approach
  const handleOpen = (meeting: any) => {
    // First open empty dialog with loading state
    setIsDetailLoading(true)
    setOpen(true)

    // Then load the data
    fetchMeetingDetails(meeting.id)
  }

  const getCreatorMail = async (creatorId: number) => {
    try {
      const res = await fetch(`https://fullstack-project-tt0t.onrender.com/api/Users/getById?id=${creatorId}`)
      const data = await res.text()
      // console.log("Raw data:", data)
      setCreatorMail(data)
      // console.log("Creator mail:", data)
    } catch (error) {
      console.error("Error fetching creator mail:", error)
      return "Not available"
    }
  }

  // Separate function to load meeting details
  const fetchMeetingDetails = async (meetingId: any) => {
    try {
      const res = await fetch(`https://fullstack-project-tt0t.onrender.com/api/MeetingControler/getById?id=${meetingId}`)
      const data = await res.json()
      // Save data in reference - updates immediately
      currentMeetingDataRef.current = data
      console.log("Data received in ref:", currentMeetingDataRef.current)
      getCreatorMail(data.creatorId) // Load creator's email
      // Update state - will update in next render cycle
      setSelectedMeeting(data)

      // Update meetings list to mark this meeting as viewed
      if (user.role === "developer" && !data.isViewd) {
        // Update local state to reflect the meeting is now viewed
        setMeetings((prevMeetings) => prevMeetings.map((m) => (m.id === meetingId ? { ...m, isViewd: true } : m)))
      }
    } catch (err) {
      console.error("Error fetching meeting details:", err)
    } finally {
      setIsDetailLoading(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
    // Reset selected meeting only after dialog closes
    setTimeout(() => {
      setSelectedMeeting(emptyMeeting)
      currentMeetingDataRef.current = null
    }, 300)
  }

  const handleDeleteClick = (meeting: any) => {
    setMeetingToDelete(meeting)
    setConfirmationText("")
    setConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!meetingToDelete) return

    try {
      setIsLoading(true)
      const res = await fetch(`https://fullstack-project-tt0t.onrender.com/api/MeetingControler/deleteMeeting?id=${meetingToDelete.id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setMeetings((prev: { id: number; title: string; occurredIn: string; isViewd: boolean }[]) =>
          prev.filter((meeting) => meeting.id !== meetingToDelete.id),
        )
        setConfirmOpen(false)
      } else {
        const errorText = await res.text()
        console.error("Failed to delete meeting:", errorText)
      }
    } catch (error) {
      console.error("Error deleting meeting:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // This function returns the most up-to-date data for the selected meeting
  const getCurrentMeetingData = () => {
    // If there's data in the reference, use it (it's always up-to-date)
    return currentMeetingDataRef.current || selectedMeeting
  }

  // Function to display the first letter of each word in the meeting title (for avatar)
  const getInitials = (title: string) => {
    if (!title) return "M"
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget)
  }

  const handleSortClose = () => {
    setSortAnchorEl(null)
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleSortChange = (order: "newest" | "oldest") => {
    setSortOrder(order)
    handleSortClose()
  }

  const handleFilterChange = (keyword: string | null) => {
    setFilterKeyword(keyword)
    handleFilterClose()
  }

  const toggleUnviewedFilter = () => {
    setShowUnviewedOnly(!showUnviewedOnly)
    setPage(1) // Reset to first page when toggling filter
  }

  // Filter meetings based on search term and keyword filter
  const filteredBySearch = meetings.filter((meeting) => meeting.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Apply keyword filter if selected
  const filteredByKeyword = filterKeyword
    ? filteredBySearch.filter((meeting) => meeting.title.toLowerCase().includes(filterKeyword.toLowerCase()))
    : filteredBySearch

  // Apply unviewed filter if selected (only for developers)
  const filteredMeetings =
    user?.role === "developer" && showUnviewedOnly
      ? filteredByKeyword.filter((meeting) => meeting.isViewd === false)
      : filteredByKeyword

  // Sort meetings by date
  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    const dateA = new Date(a.occurredIn).getTime()
    const dateB = new Date(b.occurredIn).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  // Pagination
  const totalPages = Math.ceil(filteredMeetings.length / meetingsPerPage)
  const displayedMeetings = sortedMeetings.slice((page - 1) * meetingsPerPage, page * meetingsPerPage)

  const handlePageChange = (_event: any, value: SetStateAction<number>) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Count unviewed meetings for developer role
  const unviewedCount = user?.role === "developer" ? meetings.filter((meeting) => meeting.isViewd === false).length : 0

  // Check if a meeting is unviewed (explicitly check for false)
  const isUnviewed = (meeting: { isViewd: boolean }) => {
    return meeting.isViewd === false
  }

  return (
    <Container maxWidth="xl" className="meetings-container">
      {/* Page Header */}
      <Box className="page-header">
        <Box>
          <Typography variant="h4" className="page-title">
            {user?.role === "teamLeader" ? "My Created Meetings" : "My Meetings"}
            {user?.role === "developer" && unviewedCount > 0 && (
              <Tooltip title={`${unviewedCount} unviewed meeting${unviewedCount > 1 ? "s" : ""}`}>
                <Badge
                  badgeContent={unviewedCount}
                  color="error"
                  sx={{
                    ml: 2,
                    "& .MuiBadge-badge": {
                      fontSize: "0.8rem",
                      height: "22px",
                      minWidth: "22px",
                    },
                  }}
                >
                  <NotificationsIcon color="action" />
                </Badge>
              </Tooltip>
            )}
          </Typography>
          <Typography variant="body1" className="page-subtitle">
            {user?.role === "teamLeader"
              ? "View and manage meetings you've created"
              : "View meetings you've participated in"}
          </Typography>
        </Box>

        <Box className="search-container">
          <Paper elevation={0} className="search-field">
            <SearchIcon className="search-icon" />
            <TextField
              placeholder="Search meetings..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1) // Reset to first page on search
              }}
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
              }}
              className="search-input"
            />
          </Paper>

          {user?.role === "developer" && (
            <FormControlLabel
              control={
                <Switch
                  checked={showUnviewedOnly}
                  onChange={toggleUnviewedFilter}
                  color="error"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#ff5630",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#ff5630",
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <VisibilityOffIcon fontSize="small" color={showUnviewedOnly ? "error" : "action"} />
                  <Typography variant="body2" sx={{ fontWeight: showUnviewedOnly ? "bold" : "normal" }}>
                    Unviewed only
                  </Typography>
                </Box>
              }
              sx={{
                mr: 2,
                border: showUnviewedOnly ? "1px solid #ff5630" : "none",
                borderRadius: "4px",
                padding: showUnviewedOnly ? "4px 8px" : "0",
                backgroundColor: showUnviewedOnly ? "rgba(255, 86, 48, 0.1)" : "transparent",
              }}
            />
          )}

          <Tooltip title="Filter">
            <IconButton className={`action-button ${filterKeyword ? "active" : ""}`} onClick={handleFilterClick}>
              <FilterListIcon />
              {filterKeyword && <span className="active-filter-badge"></span>}
            </IconButton>
          </Tooltip>

          <Tooltip title="Sort">
            <IconButton className={`action-button ${sortOrder !== "newest" ? "active" : ""}`} onClick={handleSortClick}>
              <SortIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Main Content */}
      {isLoading && meetings.length === 0 ? (
        <Box className="loading-container">
          <CircularProgress className="loading-spinner" />
          <Typography variant="h6" className="loading-text">
            Loading meetings...
          </Typography>
        </Box>
      ) : filteredMeetings.length === 0 ? (
        <Box className="empty-state">
          <Box className="empty-state-icon-container">
            <CalendarTodayIcon className="empty-state-icon" />
          </Box>
          <Typography variant="h5" className="empty-state-title">
            {showUnviewedOnly
              ? "No unviewed meetings found"
              : searchTerm
                ? "No meetings match your search"
                : "No meetings found"}
          </Typography>
          <Typography variant="body1" className="empty-state-message">
            {showUnviewedOnly
              ? "You have viewed all your meetings"
              : searchTerm
                ? "Try a different search term or clear your search"
                : user?.role === "teamLeader"
                  ? "Create your first meeting to get started with DevNote"
                  : "You haven't been added to any meetings yet"}
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {displayedMeetings.map((meeting) => (
              <Grid item xs={12} sm={6} md={4} key={meeting.id}>
                <Card
                  className="meeting-card"
                  sx={{
                    position: "relative",
                    border:
                      user?.role === "developer" && isUnviewed(meeting) ? "2px solid #ff5630 !important" : undefined,
                    boxShadow:
                      user?.role === "developer" && isUnviewed(meeting)
                        ? "0 4px 12px rgba(255, 86, 48, 0.3) !important"
                        : undefined,
                  }}
                >
                  {/* Unviewed indicator */}
                  {user?.role === "developer" && isUnviewed(meeting) && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "100%",
                        height: "6px",
                        backgroundColor: "#ff5630",
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Card Header with Gradient */}
                  <Box className="card-header-stripe" />

                  <Box className="card-header">
                    <Box className="card-title-container">
                      {/* Add notification badge for unviewed meetings for developers */}
                      {user?.role === "developer" && isUnviewed(meeting) ? (
                        <Badge
                          color="error"
                          variant="dot"
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          sx={{
                            "& .MuiBadge-badge": {
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                            },
                          }}
                        >
                          <Avatar
                            className="meeting-avatar"
                            sx={{
                              border: isUnviewed(meeting) ? "2px solid #ff5630" : undefined,
                            }}
                          >
                            {getInitials(meeting.title)}
                          </Avatar>
                        </Badge>
                      ) : (
                        <Avatar className="meeting-avatar">{getInitials(meeting.title)}</Avatar>
                      )}
                      <Box className="card-title-content">
                        <Typography variant="h6" className="card-title">
                          {meeting.title}
                        </Typography>
                        <Box className="card-date">
                          <CalendarTodayIcon className="card-date-icon" />
                          <Typography variant="body2">{formatDate(meeting.occurredIn)}</Typography>
                        </Box>
                      </Box>
                    </Box>

                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(meeting)
                      }}
                      className="delete-button"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>

                  <Divider className="card-divider" />

                  <CardContent className="card-content">
                    <Box className="card-actions">
                      <Button
                        variant="contained"
                        onClick={() => handleOpen(meeting)}
                        disabled={isLoading}
                        className="view-details-button"
                        fullWidth
                        sx={{
                          bgcolor: user?.role === "developer" && isUnviewed(meeting) ? "#ff5630 !important" : undefined,
                          "&:hover": {
                            bgcolor:
                              user?.role === "developer" && isUnviewed(meeting) ? "#e04120 !important" : undefined,
                          },
                        }}
                      >
                        {isLoading
                          ? "Loading..."
                          : user?.role === "developer" && isUnviewed(meeting)
                            ? "View New Meeting"
                            : "View Meeting Details"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box className="pagination-container">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                className="pagination"
              />
            </Box>
          )}
        </>
      )}

      {/* Meeting Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" className="meeting-dialog">
        {isDetailLoading ? (
          <DialogContent className="dialog-loading-content">
            <CircularProgress className="loading-spinner" />
            <Typography variant="h6" className="loading-text">
              Loading meeting details...
            </Typography>
          </DialogContent>
        ) : (
          <>
            <Box className="dialog-header">
              <Box className="dialog-header-content">
                <Typography variant="h4" className="dialog-title">
                  {getCurrentMeetingData().title}
                </Typography>
              </Box>
            </Box>

            <DialogContent className="dialog-content">
              <Box className="dialog-body">
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} className="detail-section">
                      <Box className="section-header">
                        <Box className="section-icon-container">
                          <CalendarTodayIcon className="section-icon" />
                        </Box>
                        <Typography variant="h6" className="section-title">
                          Meeting Details
                        </Typography>
                      </Box>

                      <Divider className="section-divider" />

                      <Box className="detail-item">
                        <Typography variant="subtitle2" className="detail-label">
                          Date and Time
                        </Typography>
                        <Box className="detail-value-container">
                          <Typography variant="body1" className="detail-value">
                            {getCurrentMeetingData().occurredIn
                              ? new Date(getCurrentMeetingData().occurredIn).toLocaleString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Not available"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className="detail-item">
                        <Typography variant="subtitle2" className="detail-label">
                          Created by
                        </Typography>
                        <Box className="creator-container">
                          <Avatar className="creator-avatar">{creatorMail ? creatorMail[0].toUpperCase() : "?"}</Avatar>
                          <Box className="creator-info">
                            <Tooltip title="Send email" placement="top">
                              <Link href={`mailto:${creatorMail}`} className="creator-email">
                                <EmailIcon fontSize="small" />
                                {creatorMail || "Not available"}
                              </Link>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} className="detail-section">
                      <Box className="section-header">
                        <Box className="section-icon-container">
                          <PeopleIcon className="section-icon" />
                        </Box>
                        <Typography variant="h6" className="section-title">
                          Participants
                        </Typography>
                      </Box>

                      <Divider className="section-divider" />

                      {getCurrentMeetingData().participants && getCurrentMeetingData().participants.length > 0 ? (
                        <Box className="participants-container">
                          {getCurrentMeetingData().participants.map((p, index) => (
                            <Tooltip key={index} title="Send email" placement="top">
                              <Chip
                                label={p.mail || "Not available"}
                                avatar={
                                  <Avatar className="participant-avatar">
                                    {p.mail ? p.mail[0].toUpperCase() : "?"}
                                  </Avatar>
                                }
                                component={Link}
                                href={p.mail ? `mailto:${p.mail}` : undefined}
                                clickable={!!p.mail}
                                className="participant-chip"
                              />
                            </Tooltip>
                          ))}
                        </Box>
                      ) : (
                        <Box className="no-participants">
                          <Typography className="no-data-message">No participants found for this meeting</Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                </Grid>

                {getCurrentMeetingData().transcriptionPdfUrl && (
                  <Paper elevation={0} className="detail-section transcription-section">
                    <Box className="section-header">
                      <Box className="section-icon-container">
                        <DescriptionIcon className="section-icon" />
                      </Box>
                      <Typography variant="h6" className="section-title">
                        Transcription File
                      </Typography>
                    </Box>

                    <Divider className="section-divider" />

                    <Box className="download-container">
                      <Button
                        variant="contained"
                        startIcon={<DescriptionIcon />}
                        component={Link}
                        href={getCurrentMeetingData().transcriptionPdfUrl}
                        target="_blank"
                        rel="noopener"
                        className="download-button"
                      >
                        Download Transcription PDF
                      </Button>
                    </Box>
                  </Paper>
                )}
              </Box>
            </DialogContent>

            <DialogActions className="dialog-actions">
              <Button onClick={handleClose} variant="outlined" className="close-button">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
        className="confirm-dialog"
      >
        <Box className="confirm-header">
          <Box className="confirm-icon-container">
            <DeleteOutlineIcon />
          </Box>
          <Typography variant="h6" className="confirm-title">
            Confirm Deletion
          </Typography>
        </Box>

        <DialogContent className="confirm-content">
          <Typography className="confirm-message">
            To delete this meeting, please type its exact name to confirm:
          </Typography>

          <Paper elevation={0} className="confirm-meeting-name">
            {meetingToDelete?.title}
          </Paper>

          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder="Type meeting name here"
            className="confirm-input"
          />
        </DialogContent>

        <DialogActions className="confirm-actions">
          <Button onClick={() => setConfirmOpen(false)} className="cancel-button">
            Cancel
          </Button>

          <Button
            onClick={handleConfirmDelete}
            disabled={confirmationText !== meetingToDelete?.title || isLoading}
            variant="contained"
            className={`delete-confirm-button ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? <CircularProgress size={24} className="button-spinner" /> : "Delete Meeting"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Sort Menu */}
      <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleSortClose} className="sort-menu">
        <MenuItem onClick={() => handleSortChange("newest")}>
          {sortOrder === "newest" && (
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText inset={sortOrder !== "newest"}>Newest First</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSortChange("oldest")}>
          {sortOrder === "oldest" && (
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText inset={sortOrder !== "oldest"}>Oldest First</ListItemText>
        </MenuItem>
      </Menu>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        className="filter-menu"
      >
        <MenuItem onClick={() => handleFilterChange(null)}>
          {filterKeyword === null && (
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText inset={filterKeyword !== null}>All Meetings</ListItemText>
        </MenuItem>
        <Divider />
        {filterKeywords.map((keyword) => (
          <MenuItem key={keyword} onClick={() => handleFilterChange(keyword)}>
            {filterKeyword === keyword && (
              <ListItemIcon>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText inset={filterKeyword !== keyword}>Contains "{keyword}"</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  )
}

export default MyMeetings
