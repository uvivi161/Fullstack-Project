// import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
// import { useContext, useState, useEffect } from "react";
// import { UserContext } from "./login/UserReducer";



// const MyMeetings = () => {
//     const exMeeting = {
//         creatorId :1,
//         title: "",
//         ocouredIn: ""
//     }
//     const [user] = useContext(UserContext);
//     const [meetings, setMeetings] = useState([]);
//     const [selectedMeeting, setSelectedMeeting] = useState(exMeeting);
//     const [open, setOpen] = useState(false);
//     // const exMeeting = {
//     //     id: 1,
//     //     date: "30/03/2025",
//     //     title: "example meeting",
//     //     creatorName: "nnn",

//     // }
//     useEffect(() => {
//         if (user) {
//             fetch(`https://localhost:7170/api/MeetingControler/getByCreatorId/${user.id}`)
//                 .then((res) => res.json())
//                 .then((data) => setMeetings(data))
//                 .catch((err) => console.error("Error fetching meetings:", err));
//         }
//     }, [user]);

//     const handleOpen = (meeting :any) => {
//         fetch(`/api/meetings/${meeting.id}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setSelectedMeeting(data);
//                 setOpen(true);
//             })
//             .catch((err) => console.error("Error fetching meeting details:", err));
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedMeeting(exMeeting);
//     };

//     return (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px", padding: "16px" }}>
//             {meetings.map((meeting: any) => (
//                 <Card key={meeting.id} sx={{ padding: "16px" }}>
//                     <CardContent>
//                         <Typography variant="h6">{meeting.title}</Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             {new Date(meeting.date).toLocaleDateString()}
//                         </Typography>
//                         <Button variant="outlined" onClick={() => handleOpen(meeting)} sx={{ marginTop: "8px" }}>
//                             לפרטים
//                         </Button>
//                     </CardContent>
//                 </Card>
//             ))}
            

//             {selectedMeeting && (
//                 <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//                     <DialogTitle>{selectedMeeting.title}</DialogTitle>
//                     <DialogContent>
//                         <Typography>מי יצר: {selectedMeeting.creatorId}</Typography>
//                         {/* <Typography>משתתפים: {selectedMeeting.participants?.join(", ")}</Typography> */}
//                         <Typography>נושא: {selectedMeeting.title}</Typography>
//                         {/* <Typography>תימצות: {selectedMeeting.summary}</Typography> */}
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose}>סגור</Button>
//                     </DialogActions>
//                 </Dialog>
//             )}
//         </div>
//     );
// };



// export default MyMeetings;























import React, { useContext, useEffect, useState } from "react";
import {Card,CardContent,Typography,Button,Collapse,CircularProgress,Grid,Box,Divider,List,ListItem,ListItemText,Alert,} from "@mui/material";
import { UserContext } from "./login/UserReducer";

// טיפוסי מידע
type User = {
  id: number;
  email: string;
};

type Meeting = {
  id: number;
  title: string;
  occurredIn: string;
  creatorId: number;
  creatorEmail: string;
  participants: User[];
  fileUrl?: string;
};

const MyMeetings = () => {

  const [user] = useContext(UserContext); 
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //     useEffect(() => {
//         if (user) {
//             fetch(`https://localhost:7170/api/MeetingControler/getByCreatorId/${user.id}`)
//                 .then((res) => res.json())
//                 .then((data) => setMeetings(data))
//                 .catch((err) => console.error("Error fetching meetings:", err));
//         }
//     }, [user]);
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        fetch(`https://localhost:7170/api/MeetingControler/getByCreatorId/${user.id}`).
        then((res)=> res.json())
        .then((data) => setMeetings(data))
        // .catch((err) => console.error("Error fetching meetings:", err));
        // debugger;
        // const data = await res.json();
        // setMeetings(data);
      } catch (err) {
        console.error("שגיאה בטעינת המפגשים", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const toggleDetails = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!meetings.length) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Alert severity="info">אין לך מפגשים להצגה כרגע.</Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} p={3}>
      {meetings.map(meeting => (
        <Grid item xs={12} sm={6} md={4} key={meeting.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {meeting.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(meeting.occurredIn).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                נוצר ע"י: {meeting.creatorEmail}
              </Typography>

              <Button
                variant="contained"
                color={expandedId === meeting.id ? "secondary" : "primary"}
                size="small"
                sx={{ mt: 2 }}
                onClick={() => toggleDetails(meeting.id)}
              >
                {expandedId === meeting.id ? "סגור פרטים" : "לפרטים"}
              </Button>

              <Collapse in={expandedId === meeting.id} timeout="auto" unmountOnExit>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1">משתתפים:</Typography>
                <List dense>
                  {meeting.participants.map(user => (
                    <ListItem key={user.id}>
                      <ListItemText primary={user.email} />
                    </ListItem>
                  ))}
                </List>

                {meeting.fileUrl ? (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={meeting.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      הורדת קובץ מצורף
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    לא הועלה קובץ למפגש זה.
                  </Typography>
                )}
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyMeetings;
