
// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button } from '@mui/material';
// import { UserContext } from '../login/UserReducer';

// interface User {
//   id: number;
//   mail: string;
//   role: string;
//   companyName: string;
// }

// const CreateMeet = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
//   const [selectedCompany, setSelectedCompany] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [user] = useContext(UserContext);

//   useEffect(() => {
//     axios.get('https://localhost:7170/api/Users/getAllUser-admin')
//       .then(response => {
//         console.log('Fetched users:', response.data); // בדיקה האם הנתונים תקינים
//         setUsers(response.data);
//         setFilteredUsers(response.data); // נוודא שהרשימה המלאה מוצגת בהתחלה
//         setLoading(false);
//         select();
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//         setLoading(false);
//       });

//   }, []);

//   // useEffect(() => {
//   //   if (!selectedCompany.trim()) {
//   //     setFilteredUsers(users); // אם אין חיפוש, נציג את כל המשתמשים
//   //   } else {
//   //     setFilteredUsers(
//   //       users.filter(user => user.company?.toLowerCase().includes(selectedCompany.toLowerCase()))
//   //     );
//   //   }
//   // }, [selectedCompany, users]);

//   const toggleSelection = (user: User) => {
//     setSelectedUsers(prevSelected =>
//       prevSelected.includes(user)
//         ? prevSelected.filter(u => u.id !== user.id)
//         : [...prevSelected, user]
//     );
//   };

//   const select = () => {
//     debugger;
//       const company = user.companyName;
//       axios.get(`https://localhost:7170/api/Users/getByCompanyName?company=${company}`)
//       .then(response => {
//       console.log('Fetched usersByCompany:', response.data); // בדיקה האם הנתונים תקינים
//       setFilteredUsers(response.data);
//       })
//       .catch(error => {
//       console.error('Error fetching users:', error);
//       setLoading(false);
//       });
//   }

//   return (
//     <div style={{color: '#000'}}>
//       {/* <label>בחר חברה:</label>
//       <input
//         type="text"
//         value={selectedCompany}
//         onChange={e => setSelectedCompany(e.target.value)}
//         placeholder="הכנס שם חברה"
//       />
//       <Button onClick={() => select()}>search...</Button>
//        */}
//       {loading ? (
//         <p>טוען משתמשים...</p>
//       ) : (
//         <>
//             {/* <Button onClick={() => setSelectedUsers(filteredUsers)}>בחר הכל</Button> */}
//             <ul>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map(user => (
//               <li key={user.id} style={{ display: 'flex', alignItems: 'center', color: '#000', marginBottom: '8px' }}>
//               <input
//               type="checkbox"
//               checked={selectedUsers.includes(user)}
//               onChange={() => toggleSelection(user)}
//               style={{ marginRight: '8px' }}
//               />
//               <span>{user.mail}</span>
//               <span style={{ marginLeft: 'auto', marginRight: '150px', whiteSpace: 'nowrap' }}>{user.companyName}</span>
//               </li>
//               ))
//             ) : (
//               <p>לא נמצאו משתמשים</p>
//             )}
//             </ul>
//             <Button
//               onClick={() => {
//               if (selectedUsers.length === filteredUsers.length) {
//                 setSelectedUsers([]); // הסר סימון מהכל
//               } else {
//                 setSelectedUsers(filteredUsers); // בחר הכל
//               }
//               }}
//             >
//               {selectedUsers.length === filteredUsers.length ? 'הסר סימון מהכל' : 'בחר הכל'}
//             </Button>

//           {/* <h3>משתמשים שנבחרו:</h3>
//           <ul>
//             {selectedUsers.map(user => (
//               <li key={user.id}>{user.Mail}</li>
//             ))}
//           </ul> */}
//         </>
//       )}
//     </div>
//   );
// };

// export default CreateMeet;



import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Grid, Typography, Paper } from '@mui/material';
import { UserContext } from '../login/UserReducer';
import FileUploader from '../FileUploader';
// import FileUploader from './FileUploader'; // מייבא את קומפוננטת העלאת הקובץ

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
  const [loading, setLoading] = useState(true);
  const [user] = useContext(UserContext);

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
    setSelectedUsers(prevSelected =>
      prevSelected.includes(user)
        ? prevSelected.filter(u => u.id !== user.id)
        : [...prevSelected, user]
    );
  };

    const select = () => {
    debugger;
      const company = user.companyName;
      axios.get(`https://localhost:7170/api/Users/getByCompanyName?company=${company}`)
      .then(response => {
      console.log('Fetched usersByCompany:', response.data); // בדיקה האם הנתונים תקינים
      setFilteredUsers(response.data);
      })
      .catch(error => {
      console.error('Error fetching users:', error);
      setLoading(false);
      });
  }

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {/* חצי שמאלי - רשימת העובדים */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>בחר את המשתתפים</Typography>
          {loading ? (
            <Typography variant="body1">טוען משתמשים...</Typography>
          ) : (
            <>
              <div>
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
                  variant="outlined"
                  onClick={() => {
                    if (selectedUsers.length === filteredUsers.length) {
                      setSelectedUsers([]); // הסר סימון מהכל
                    } else {
                      setSelectedUsers(filteredUsers); // בחר הכל
                    }
                  }}
                  fullWidth
                  style={{ marginTop: '10px' }}
                >
                  {selectedUsers.length === filteredUsers.length ? 'הסר סימון מהכל' : 'בחר הכל'}
                </Button>
              </div>
            </>
          )}
        </Paper>
      </Grid>

      {/* חצי ימין - העלאת קובץ */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>העלה קובץ</Typography>
          <FileUploader /> {/* כאן נטמיע את קומפוננטת העלאת הקובץ */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateMeeting;
