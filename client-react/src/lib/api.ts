// Types
interface User {
  mail: string
  companyName: string
}

interface Meeting {
  id: number
  title: string
  occurredIn: string
}

interface DashboardStats {
  totalMeetings: number
  totalParticipants: number
}

interface DashboardData {
  stats: DashboardStats
  meetings: Meeting[]
}

export async function fetchDashboardData(user: User): Promise<DashboardData> {
  const token = sessionStorage.getItem("token")

  if (!token || !user) {
    throw new Error("Authentication required")
  }

  try {
    // Fetch participant count
    const participantsResponse = await fetch(
      `https://localhost:7170/api/Users/getCountByCompanyName?companyName=${user.companyName}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    // Fetch meetings count
    const meetingsResponse = await fetch(
      `https://localhost:7170/api/MeetingControler/getCountByCreatorId?creatorMail=${user.mail}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    // Fetch meetings list
    const meetingsListResponse = await fetch(
      `https://localhost:7170/api/MeetingControler/getByCreatorMail?creatorMail=${user.mail}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    if (!participantsResponse.ok || !meetingsResponse.ok || !meetingsListResponse.ok) {
      throw new Error("Failed to fetch dashboard data")
    }

    const participantsCount = await participantsResponse.json()
    const meetingsCount = await meetingsResponse.json()
    const allMeetings = await meetingsListResponse.json()

    // Filter meetings to only those from the current month
    const now = new Date()
    const currentMonthMeetings = allMeetings.filter((meeting: Meeting) => {
      const meetingDate = new Date(meeting.occurredIn)
      return meetingDate.getMonth() === now.getMonth() && meetingDate.getFullYear() === now.getFullYear()
    })

    // Show only meetings from the current month initially, or all if none in current month
    const meetings = currentMonthMeetings.length > 0 ? currentMonthMeetings : allMeetings

    return {
      stats: {
        totalMeetings: meetingsCount,
        totalParticipants: participantsCount,
      },
      meetings,
    }
  } catch (error) {
    console.error("API error:", error)
    throw new Error("Failed to fetch dashboard data")
  }
}

export async function fetchUnviewedMeetings(userId: string): Promise<Meeting[]> {
  const token = sessionStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    // This is a placeholder - implement the actual API call to get unviewed meetings
    const response = await fetch(`https://localhost:7170/api/MeetingControler/getUnviewedByUserId?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch unviewed meetings")
    }

    return await response.json()
  } catch (error) {
    console.error("API error:", error)
    throw new Error("Failed to fetch unviewed meetings")
  }
}
