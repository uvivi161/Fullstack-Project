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
































// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Container,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useContext, useState, useEffect } from "react";
// import { UserContext } from "./login/UserReducer";

// const MyMeetings = () => {
//   const exMeeting = {
//       creatorId: 1,
//       title: "",
//       ocouredIn: ""
//   };
//   const [user] = useContext(UserContext);
//   const [meetings, setMeetings] = useState<{ id: number; title: string; date: string }[]>([]);
//   const [selectedMeeting, setSelectedMeeting] = useState(exMeeting);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//       if (user) {
//           fetch(`https://localhost:7170/api/MeetingControler/getByCreatorId/${user.id}`)
//               .then((res) => res.json())
//               .then((data) => setMeetings(data))
//               .catch((err) => console.error("Error fetching meetings:", err));
//       }
//   }, [user]);

//   const handleOpen = (meeting: any) => {
//       fetch(`/api/meetings/${meeting.id}`)
//           .then((res) => res.json())
//           .then((data) => {
//               setSelectedMeeting(data);
//               setOpen(true);
//           })
//           .catch((err) => console.error("Error fetching meeting details:", err));
//   };

//   const handleClose = () => {
//       setOpen(false);
//       setSelectedMeeting(exMeeting);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//         const res = await fetch(`https://localhost:7170/api/MeetingControler/deleteMeeting?id=${id}`, {
//             method: "DELETE",
//         });

//         if (res.ok) {
//             setMeetings(prev => prev.filter(meeting => meeting.id !== id));
//         } else {
//             const errorText = await res.text();
//             console.error("Failed to delete meeting:", errorText);
//         }
//     } catch (error) {
//         console.error("Error deleting meeting:", error);
//     }
// };

//   return (
//       <Container sx={{ paddingY: 4 }}>
//           <Grid container spacing={3}>
//               {meetings.map((meeting: any) => (
//                   <Grid item xs={12} sm={6} md={4} lg={6} key={meeting.id}>
//                       <Card sx={{ height: "100%", position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                           <IconButton
//                               aria-label="delete"
//                               onClick={() => handleDelete(meeting.id)}
//                               sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
//                           >
//                               <DeleteIcon color="error" />
//                           </IconButton>
//                           <CardContent>
//                               <Typography variant="h6" gutterBottom>{meeting.title}</Typography>
//                               <Typography variant="body2" color="textSecondary">
//                                   {new Date(meeting.date).toLocaleDateString()}
//                               </Typography>
//                               <Button
//                                   variant="outlined"
//                                   onClick={() => handleOpen(meeting)}
//                                   sx={{ marginTop: 2 }}
//                                   fullWidth
//                               >
//                                   לפרטים
//                               </Button>
//                           </CardContent>
//                       </Card>
//                   </Grid>
//               ))}
//           </Grid>

//           {selectedMeeting && (
//               <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//                   <DialogTitle>{selectedMeeting.title}</DialogTitle>
//                   <DialogContent>
//                       <Typography>מי יצר: {selectedMeeting.creatorId}</Typography>
//                       <Typography>נושא: {selectedMeeting.title}</Typography>
//                   </DialogContent>
//                   <DialogActions>
//                       <Button onClick={handleClose}>סגור</Button>
//                   </DialogActions>
//               </Dialog>
//           )}
//       </Container>
//   );
// };

// export default MyMeetings;













// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Container,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { useContext, useState, useEffect } from "react";
// import { UserContext } from "./login/UserReducer";

// const MyMeetings = () => {
//   const exMeeting = {
//     creatorId: 1,
//     title: "",
//     ocouredIn: "",
//   };
//   const [user] = useContext(UserContext);
//   const [meetings, setMeetings] = useState<
//     { id: number; title: string; date: string }[]
//   >([]);
//   const [selectedMeeting, setSelectedMeeting] = useState(exMeeting);
//   const [open, setOpen] = useState(false);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [meetingToDelete, setMeetingToDelete] = useState<any>(null);
//   const [confirmationText, setConfirmationText] = useState("");

//   useEffect(() => {
//     if (user) {
//       fetch(
//         `https://localhost:7170/api/MeetingControler/getByCreatorId/${user.id}`
//       )
//         .then((res) => res.json())
//         .then((data) => setMeetings(data))
//         .catch((err) => console.error("Error fetching meetings:", err));
//     }
//   }, [user]);

//   const handleOpen = (meeting: any) => {
//     fetch(`/api/meetings/${meeting.id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSelectedMeeting(data);
//         setOpen(true);
//       })
//       .catch((err) => console.error("Error fetching meeting details:", err));
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedMeeting(exMeeting);
//   };

//   const handleDeleteClick = (meeting: any) => {
//     setMeetingToDelete(meeting);
//     setConfirmationText("");
//     setConfirmOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!meetingToDelete) return;

//     try {
//       const res = await fetch(
//         `https://localhost:7170/api/MeetingControler/deleteMeeting?id=${meetingToDelete.id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (res.ok) {
//         setMeetings((prev) =>
//           prev.filter((meeting) => meeting.id !== meetingToDelete.id)
//         );
//         setConfirmOpen(false);
//       } else {
//         const errorText = await res.text();
//         console.error("Failed to delete meeting:", errorText);
//       }
//     } catch (error) {
//       console.error("Error deleting meeting:", error);
//     }
//   };

//   return (
//     <Container sx={{ paddingY: 4 }}>
//       <Grid container spacing={12}>
//         {meetings.map((meeting: any) => (
//           <Grid item xs={12} sm={6} md={4} lg={6} key={meeting.id}>
//             <Card
//               sx={{
//                 height: "100%",
//                 position: "relative",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//             >
//               <IconButton
//                 aria-label="delete"
//                 onClick={() => handleDeleteClick(meeting)}
//                 sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
//               >
//                 <DeleteOutlineIcon />
//               </IconButton>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {meeting.title}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {new Date(meeting.date).toLocaleDateString()}
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   onClick={() => handleOpen(meeting)}
//                   sx={{ marginTop: 2 }}
//                   fullWidth
//                 >
//                   לפרטים
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {selectedMeeting && (
//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//           <DialogTitle>{selectedMeeting.title}</DialogTitle>
//           <DialogContent>
//             <Typography>מי יצר: {selectedMeeting.creatorId}</Typography>
//             <Typography>נושא: {selectedMeeting.title}</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>סגור</Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       <Dialog
//         open={confirmOpen}
//         onClose={() => setConfirmOpen(false)}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogTitle>אימות מחיקה</DialogTitle>
//         <DialogContent>
//           <Typography>
//             כדי למחוק את המפגש, הקלד/י את שמו המדויק:
//           </Typography>
//           <Typography fontWeight="bold" sx={{ my: 1 }}>
//             {meetingToDelete?.title}
//           </Typography>
//           <TextField
//             autoFocus
//             fullWidth
//             variant="outlined"
//             value={confirmationText}
//             onChange={(e) => setConfirmationText(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>ביטול</Button>
//           <Button
//             onClick={handleConfirmDelete}
//             disabled={confirmationText !== meetingToDelete?.title}
//             color="error"
//           >
//             מחק
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default MyMeetings;






















import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Container,
  IconButton,
  TextField,
  List,
  ListItem,
  Link,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./login/UserReducer";

const MyMeetings = () => {
  const exMeeting = {
    id: 0,
    title: "",
    occurredIn: new Date().toISOString(),
    creatorId: 0,
    transcriptionPdfUrl: "",
    participants: [],
  };

  const [user] = useContext(UserContext);
  const [meetings, setMeetings] = useState<
    { id: number; title: string; date: string }[]
  >([]);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(exMeeting);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState<any>(null);
  const [confirmationText, setConfirmationText] = useState("");

  useEffect(() => {
    if (user) {
      fetch(
        `https://localhost:7170/api/MeetingControler/getByCreatorId/${user.id}`
      )
        .then((res) => res.json())
        .then((data) => setMeetings(data))
        .catch((err) => console.error("Error fetching meetings:", err));
    }
  }, [user]);

  const handleOpen = (meeting: any) => {
    fetch(`https://localhost:7170/api/MeetingControler/getById?id=${meeting.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Meeting not found");
        return res.json();
      })
      .then((data) => {
        setSelectedMeeting(data);
        setOpen(true);
      })
      .catch((err) => console.error("Error fetching meeting details:", err));
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMeeting(exMeeting);
  };

  const handleDeleteClick = (meeting: any) => {
    setMeetingToDelete(meeting);
    setConfirmationText("");
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!meetingToDelete) return;

    try {
      const res = await fetch(
        `https://localhost:7170/api/MeetingControler/deleteMeeting?id=${meetingToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setMeetings((prev) =>
          prev.filter((meeting) => meeting.id !== meetingToDelete.id)
        );
        setConfirmOpen(false);
      } else {
        const errorText = await res.text();
        console.error("Failed to delete meeting:", errorText);
      }
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Grid container spacing={12}>
        {meetings.map((meeting: any) => (
          <Grid item xs={12} sm={6} md={4} lg={6} key={meeting.id}>
            <Card
              sx={{
                height: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteClick(meeting)}
                sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
              >
                <DeleteOutlineIcon />
              </IconButton>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {meeting.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(meeting.date).toLocaleDateString()}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleOpen(meeting)}
                  sx={{ marginTop: 2 }}
                  fullWidth
                >
                  לפרטים
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* דיאלוג לפרטים */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{selectedMeeting.title}</DialogTitle>
        <DialogContent dividers>
          <Typography>
            <strong>תאריך:</strong>{" "}
            {new Date(selectedMeeting.occurredIn).toLocaleString("he-IL")}
          </Typography>
          <Typography>
            <strong>יוצר המפגש:</strong> {selectedMeeting.creatorId}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>משתתפים:</strong>
          </Typography>
          <List>
            {selectedMeeting.participants?.length > 0 ? (
              selectedMeeting.participants.map((user: any) => (
                <ListItem key={user.id}>{user.email}</ListItem>
              ))
            ) : (
              <ListItem>אין משתתפים</ListItem>
            )}
          </List>
          {selectedMeeting.transcriptionPdfUrl && (
            <Typography sx={{ mt: 2 }}>
              <strong>קובץ תמלול:</strong>{" "}
              <Link
                href={selectedMeeting.transcriptionPdfUrl}
                target="_blank"
                rel="noopener"
              >
                הורד PDF
              </Link>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>סגור</Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג לאישור מחיקה */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>אימות מחיקה</DialogTitle>
        <DialogContent>
          <Typography>כדי למחוק את המפגש, הקלד/י את שמו המדויק:</Typography>
          <Typography fontWeight="bold" sx={{ my: 1 }}>
            {meetingToDelete?.title}
          </Typography>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>ביטול</Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={confirmationText !== meetingToDelete?.title}
            color="error"
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyMeetings;
