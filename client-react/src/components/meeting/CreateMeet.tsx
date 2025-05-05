// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Checkbox, Grid, Typography, Paper } from '@mui/material';
// import { UserContext } from '../login/UserReducer';
// import FileUploader from './FileUploader';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

// interface User {
//   id: number;
//   mail: string;
//   role: string;
//   companyName: string;
// }

// const CreateMeeting = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [user] = useContext(UserContext);

//   useEffect(() => {
//     axios.get('https://localhost:7170/api/Users/getAllUser-admin')
//       .then(response => {
//         setUsers(response.data);
//         setFilteredUsers(response.data);
//         setLoading(false);
//         select();
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//         setLoading(false);
//       });
//   }, []);

//   const toggleSelection = (user: User) => {
//     setSelectedUsers(prevSelected =>
//       prevSelected.includes(user)
//         ? prevSelected.filter(u => u.id !== user.id)
//         : [...prevSelected, user]
//     );
//   };

//   const select = () => {
//     const company = user.companyName;
//     axios.get(`https://localhost:7170/api/Users/getByCompanyName?company=${company}`)
//       .then(response => {
//         setFilteredUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//         setLoading(false);
//       });
//   };

//   const allSelected = selectedUsers.length === filteredUsers.length;

//   return (
//     <Grid container spacing={4} sx={{ padding: 2 }}>
//       {/* צד שמאל - רשימת עובדים */}
//       <Grid item xs={12} md={6}>
//         <Paper
//           elevation={0}
//           sx={{
//             width: '100%',
//             padding: 2,
//             backgroundColor: 'transparent',
//             border: '2px solid #595047',
//             borderRadius: '12px',
//             boxSizing: 'border-box',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>בחר את המשתתפים</Typography>
//           {loading ? (
//             <Typography variant="body1">טוען משתמשים...</Typography>
//           ) : (
//             <>
//               <Grid container direction="column" spacing={2}>
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map(user => (
//                     <Grid item key={user.id} container alignItems="center">
//                       <Grid item>
//                         <Checkbox
//                           checked={selectedUsers.includes(user)}
//                           onChange={() => toggleSelection(user)}
//                         />
//                       </Grid>
//                       <Grid item xs>
//                         <Typography variant="body1">{user.mail}</Typography>
//                       </Grid>
//                     </Grid>
//                   ))
//                 ) : (
//                   <Typography variant="body1">לא נמצאו משתמשים</Typography>
//                 )}
//               </Grid>

//               <Button
//                 fullWidth
//                 sx={{
//                   mt: 2,
//                   border: '2px solid #595047',
//                   color: '#595047',
//                   backgroundColor: 'transparent',
//                   borderRadius: '8px',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     backgroundColor: '#595047',
//                     color: '#fff',
//                   },
//                 }}
//                 startIcon={allSelected ? <IndeterminateCheckBoxIcon /> : <CheckBoxIcon />}
//                 onClick={() => {
//                   if (allSelected) {
//                     setSelectedUsers([]);
//                   } else {
//                     setSelectedUsers(filteredUsers);
//                   }
//                 }}
//               >
//                 {allSelected ? 'הסר סימון מהכל' : 'בחר הכל'}
//               </Button>
//             </>
//           )}
//         </Paper>
//       </Grid>

//       {/* צד ימין - העלאת קובץ */}
//       <Grid item xs={12} md={6}>
//         <Paper sx={{ padding: 10 }}>
//           <Typography variant="h5" gutterBottom>העלה ????קובץ</Typography>
//           <FileUploader />
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default CreateMeeting;









import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Checkbox, Grid, Typography, Paper, TextField, Snackbar, Alert
} from '@mui/material'; // הוספתי TextField, Snackbar, Alert
import { UserContext } from '../login/UserReducer';
import FileUploader from './FileUploader';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { LinkContext } from './context';
// import { LinkContext } from './context';

interface User {
  id: number;
  mail: string;
  role: string;
  companyName: string;
}

const CreateMeeting = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [user] = useContext(UserContext);
  const {pdfUrl, setPdfUrl } = useContext(LinkContext);

  // Alert states
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    axios.get('https://localhost:7170/api/Users/getAllUser-admin')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
        select();
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const toggleSelection = (user: User) => {
    debugger;
    setSelectedUsers(prevSelected =>
      prevSelected.includes(user)
        ? prevSelected.filter(u => u.id !== user.id)
        : [...prevSelected, user]
    );
  };

  const select = () => {
    const company = user.companyName;
    axios.get(`https://localhost:7170/api/Users/getByCompanyName?company=${company}`)
      .then(response => {
        setFilteredUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };

  const handleCreateMeeting = async () => {
    debugger;
    if (!meetingTitle.trim() || selectedUsers.length === 0) {
      setSnackMessage('אנא הזן כותרת ובחר משתתפים');
      setSnackSeverity('error');
      setSnackOpen(true);
      return;
    }

    try {
      console.log({
        title: meetingTitle,
        creatorId: user.id,
        participants: selectedUsers.map(u => ({ Mail: u.mail })),
        transcriptionPdfUrl: pdfUrl
      });
      await axios.post('https://localhost:7170/api/MeetingControler', {
        Title: meetingTitle,
        CreatorId: user.id,
        Participants: selectedUsers.map(u =>({ Mail: u.mail })),
        TranscriptionPdfUrl: pdfUrl
      });
      debugger;

      setSnackMessage('המפגש נוצר בהצלחה!');
      setSnackSeverity('success');
      setSnackOpen(true);
      setMeetingTitle('');
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error creating meeting:', error);
      setSnackMessage('שגיאה ביצירת המפגש');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const allSelected = selectedUsers.length === filteredUsers.length;

  return (
    <Grid container spacing={4} sx={{ padding: 2 }}>
      {/* צד שמאל - רשימת עובדים */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            padding: 2,
            backgroundColor: 'transparent',
            border: '2px solid #595047',
            borderRadius: '12px',
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h5" gutterBottom>בחר את המשתתפים</Typography>
          {loading ? (
            <Typography variant="body1">טוען משתמשים...</Typography>
          ) : (
            <>
              <Grid container direction="column" spacing={2}>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <Grid item key={user.id} container alignItems="center">
                      <Grid item>
                        <Checkbox
                          checked={selectedUsers.includes(user)}
                          onChange={() => toggleSelection(user)}
                        />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body1">{user.mail}</Typography>
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body1">לא נמצאו משתמשים</Typography>
                )}
              </Grid>

              <Button
                fullWidth
                sx={{
                  mt: 2,
                  border: '2px solid #595047',
                  color: '#595047',
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#595047',
                    color: '#fff',
                  },
                }}
                startIcon={allSelected ? <IndeterminateCheckBoxIcon /> : <CheckBoxIcon />}
                onClick={() => {
                  if (allSelected) {
                    setSelectedUsers([]);
                  } else {
                    setSelectedUsers(filteredUsers);
                  }
                }}
              >
                {allSelected ? 'הסר סימון מהכל' : 'בחר הכל'}
              </Button>

              {/* שדה כותרת */}
              <TextField
                fullWidth
                label="כותרת המפגש"
                variant="outlined"
                sx={{ mt: 3 }}
                value={meetingTitle}
                onChange={e => setMeetingTitle(e.target.value)}
              />

              {/* כפתור יצירת מפגש */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleCreateMeeting}
              >
                צור מפגש
              </Button>
            </>
          )}
        </Paper>
      </Grid>

      {/* צד ימין - העלאת קובץ */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 5 ,backgroundColor: 'transparent', border: '2px solid #595047', borderRadius: '12px'}}>
          <Typography variant="h5" gutterBottom>העלה קובץ</Typography>
          <FileUploader/>
        </Paper>
      </Grid>

      {/* AlertSnackBar */}
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default CreateMeeting;
