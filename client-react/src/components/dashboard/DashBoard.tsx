import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { Box, Typography, Grid, Paper, Avatar, Button, CircularProgress } from "@mui/material"
import { Calendar, Users, Plus } from "lucide-react"
import { UserContext } from "../login/UserReducer"
import "../../css/DashBoard.css"

// Types
// interface User {
//   mail: string
//   companyName: string
// }

interface Meeting {
  id: number
  title: string
  occurredIn: string
}

interface DashboardStats {
  totalMeetings: number
  totalParticipants: number
}

export default function Dashboard() {
  const [user] = useContext(UserContext)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get user from session storage
        const userString = sessionStorage.getItem("token")
        if (!userString) {
          navigate("/")
          return
        }

        const token = sessionStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }

        // Fetch participant count
        const countParticipants = await fetch(
          `https://fullstack-project-tt0t.onrender.com/api/Users/getCountByCompanyName?companyName=${user.companyName}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )

        // Fetch meetings count
        const countMeetings = await fetch(
          `https://fullstack-project-tt0t.onrender.com/api/MeetingControler/getCountByCreatorId?creatorMail=${user.mail}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )

        // Fetch meetings list
        const meetingsResponse = await fetch(
          `https://fullstack-project-tt0t.onrender.com/api/MeetingControler/getByCreatorMail?creatorMail=${user.mail}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )

        const participantsCount = await countParticipants.json()
        const meetingsCount = await countMeetings.json()
        const allMeetings = await meetingsResponse.json()

        // Filter meetings to only those from the current month
        const now = new Date()
        const currentMonthMeetings = allMeetings.filter((meeting: Meeting) => {
          const meetingDate = new Date(meeting.occurredIn)
          return meetingDate.getMonth() === now.getMonth() && meetingDate.getFullYear() === now.getFullYear()
        })

        setStats({
          totalMeetings: meetingsCount,
          totalParticipants: participantsCount,
        })

        // Show only meetings from the current month initially, or all if none in current month
        setRecentMeetings(currentMonthMeetings.length > 0 ? currentMonthMeetings : allMeetings)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, navigate])

  const handleNewMeeting = () => {
    navigate("create-meeting")
  }

  const handleViewAllMeetings = () => {
    navigate("my-meetings")
  }

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress sx={{ color: "#ff7043" }} />
      </Box>
    )
  }

  // Limit the number of meetings displayed to 6 (for 2x3 grid layout)
  const displayedMeetings = recentMeetings.slice(0, 6)

  return (
    <Box className="dashboard-container">
      {/* Header */}
      <Box className="dashboard-header">
        <Box className="dashboard-welcome">
          <Typography variant="h4" className="page-title">
            Dashboard
          </Typography>
          {user && (
            <Typography variant="body1" className="dashboard-subtitle">
              Welcome back, {user.mail.split("@")[0]}!
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          className="new-meeting-button"
          onClick={handleNewMeeting}
        >
          New Meeting
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} className="stats-container">
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="stat-card">
            <Box className="stat-header">
              <Avatar className="stat-avatar calendar-avatar">
                <Calendar size={20} />
              </Avatar>
              <Typography variant="body2" className="stat-label">
                Total Meetings
              </Typography>
            </Box>
            <Typography variant="h4" className="stat-value">
              {stats?.totalMeetings || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="stat-card">
            <Box className="stat-header">
              <Avatar className="stat-avatar users-avatar">
                <Users size={20} />
              </Avatar>
              <Typography variant="body2" className="stat-label">
                Total Participants
              </Typography>
            </Box>
            <Typography variant="h4" className="stat-value">
              {stats?.totalParticipants || 0}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Meetings - Full Width */}
      <Grid container spacing={3} className="content-container">
        <Grid item xs={12}>
          <Paper className="meetings-card">
            <Box className="meetings-header">
              <Typography variant="h6" className="section-title">
                Recent Meetings
              </Typography>
              <Button variant="text" className="view-all-button" onClick={handleViewAllMeetings}>
                View All
              </Button>
            </Box>
            <Box className="meetings-list">
              {displayedMeetings.length === 0 ? (
                <Typography className="no-meetings-text">No meetings found. Create your first meeting!</Typography>
              ) : (
                displayedMeetings.map((meeting) => (
                  <Box key={meeting.id} className="meeting-item">
                    <Box className="meeting-details">
                      <Typography variant="body1" className="meeting-title">
                        {meeting.title}
                      </Typography>
                      <Typography variant="body2" className="meeting-date">
                        • {new Date(meeting.occurredIn).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}






