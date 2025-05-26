// // import * as React from 'react';
// // import { useContext, useState } from "react";
// // // import { UserContext } from "./login/UserReducer";
// // import { Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip } from '@mui/material';
// // import { UserContext } from '../login/UserReducer';
// // import LogIn from '../login/Login';
// // import SignIn from '../login/SignIn';
// // import CreateAvatar from '../login/CreateAvatar';
// // import Logout from '@mui/icons-material/Logout';
// // import UpgradeIcon from '@mui/icons-material/Upgrade';
// // import PersonIcon from '@mui/icons-material/Person';
// // import Update from '../login/Update';
// // import { useNavigate } from 'react-router-dom';

// // export default function AccountMenu() {
// //   const [user, usersDispatch] = useContext(UserContext);
// //   const navigate = useNavigate();
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //   const open = Boolean(anchorEl);

// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [showSignIn, setShowSignIn] = useState(true);
// //   const [showLogIn, setShowLogIn] = useState(true);

// //   const handleSignInClick = () => { setShowLogIn(false); setShowSignIn(false); };
// //   const handleLogInClick = () => { setShowSignIn(false); setShowLogIn(false); };

// //   const [showUpdate, setShowUpdate] = useState(false);

// //   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const update = () => {
// //     setShowUpdate(true);
// //   };

// //   const logout = () => {
// //     sessionStorage.removeItem('token');
// //     if (user.id !== 0) {
// //       usersDispatch({ type: 'DELETE', data: {} });
// //       setShowSignIn(true);
// //       setShowLogIn(true);
// //       setIsAuthenticated(false);
// //     }
// //       navigate('/'); // חזרה לדף הבית  
// //     };

// //   return (
// //     <Box sx={{ padding: "15px", position: 'sticky', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
// //       {!isAuthenticated ? (
// //         <>
// //           {showLogIn && <LogIn onClick={handleLogInClick} />}
// //           {showSignIn && <SignIn onSignin={handleSignInClick} />}
// //         </>
// //       ) : null}

// //       <Tooltip title="Account settings">
// //         <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
// //           {user.id === 0 ? (
// //             <Avatar sx={{ width: 32, height: 32 }}><PersonIcon /></Avatar>
// //           ) : (<CreateAvatar />)}
// //         </IconButton>
// //       </Tooltip>

// //       <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
// //         slotProps={{
// //           paper: {
// //             elevation: 0,
// //             sx: {
// //               overflow: 'visible',
// //               filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
// //               mt: 1.5,
// //               '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
// //               '&::before': {
// //                 content: '""', display: 'block', position: 'absolute', top: 0, right: 14,
// //                 width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
// //               },
// //             },
// //           },
// //         }}
// //         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
// //         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
// //       >
// //         <MenuItem onClick={update}>
// //           <ListItemIcon><UpgradeIcon fontSize="small" /></ListItemIcon>
// //           Update
// //         </MenuItem>
// //         <MenuItem onClick={logout}>
// //           <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
// //           Logout
// //         </MenuItem>
// //       </Menu>
// //       {showUpdate && <Update onClose={() => setShowUpdate(false)} />}
// //     </Box>
// //   );
// // }















// import * as React from 'react';
// import { useContext, useState } from "react";
// import { 
//   Box, 
//   Avatar, 
//   Menu, 
//   MenuItem, 
//   ListItemIcon, 
//   IconButton, 
//   Tooltip, 
//   Typography,
//   Divider
// } from '@mui/material';
// import { UserContext } from '../login/UserReducer';
// import LogIn from '../login/Login';
// import SignIn from '../login/SignIn';
// import CreateAvatar from '../login/CreateAvatar';
// import Logout from '@mui/icons-material/Logout';
// import UpgradeIcon from '@mui/icons-material/Upgrade';
// import PersonIcon from '@mui/icons-material/Person';
// import SettingsIcon from '@mui/icons-material/Settings';
// import HelpIcon from '@mui/icons-material/Help';
// import Update from '../login/Update';
// import { useNavigate } from 'react-router-dom';
// import '../../theme.css';


// export default function AccountMenu() {
//   const [user, usersDispatch] = useContext(UserContext);
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(true);
//   const [showLogIn, setShowLogIn] = useState(true);

//   const handleSignInClick = () => { setShowLogIn(false); setShowSignIn(false); };
//   const handleLogInClick = () => { setShowSignIn(false); setShowLogIn(false); };

//   const [showUpdate, setShowUpdate] = useState(false);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const update = () => {
//     setShowUpdate(true);
//     handleClose();
//   };

//   const logout = () => {
//     sessionStorage.removeItem('token');
//     if (user.id !== 0) {
//       usersDispatch({ type: 'DELETE', data: {} });
//       setShowSignIn(true);
//       setShowLogIn(true);
//       setIsAuthenticated(false);
//     }
//     navigate('/');
//     handleClose();
//   };

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//       {!isAuthenticated ? (
//         <>
//           {showLogIn && <LogIn onClick={handleLogInClick} />}
//           {showSignIn && <SignIn onSignin={handleSignInClick} />}
//         </>
//       ) : null}

//       <Box 
//         onClick={handleClick}
//         sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           width: '100%',
//           p: 1,
//           borderRadius: 'var(--devnote-radius-md)',
//           cursor: 'pointer',
//           '&:hover': {
//             backgroundColor: 'var(--devnote-gray-200)'
//           }
//         }}
//       >
//         <Tooltip title="Account settings">
//           <Avatar sx={{ width: 40, height: 40 }}>
//             {user.mail ? user.mail[0].toUpperCase() : <PersonIcon />}
//           </Avatar>
//         </Tooltip>
        
//         <Box sx={{ ml: 2, textAlign: 'left', flexGrow: 1 }}>
//           <Typography variant="body2" fontWeight={500} noWrap>
//             {user.mail || 'Guest User'}
//           </Typography>
//           <Typography variant="caption" color="textSecondary" noWrap>
//             {user.role === 'teamLeader' ? 'Team Leader' : user.role === 'developer' ? 'Developer' : 'Guest'}
//           </Typography>
//         </Box>
        
//         <SettingsIcon sx={{ color: 'var(--devnote-gray-500)' }} />
//       </Box>

//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//         PaperProps={{
//           elevation: 3,
//           sx: {
//             overflow: 'visible',
//             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
//             mt: 1.5,
//             borderRadius: 'var(--devnote-radius-lg)',
//             minWidth: 200,
//             '&:before': {
//               content: '""',
//               display: 'block',
//               position: 'absolute',
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: 'background.paper',
//               transform: 'translateY(-50%) rotate(45deg)',
//               zIndex: 0,
//             },
//           },
//         }}
//       >
//         <MenuItem onClick={() => {
//           navigate('/app/profile');
//           handleClose();
//         }}>
//           <ListItemIcon>
//             <PersonIcon fontSize="small" sx={{ color: 'var(--devnote-primary)' }} />
//           </ListItemIcon>
//           My Profile
//         </MenuItem>
        
//         <MenuItem onClick={update}>
//           <ListItemIcon>
//             <UpgradeIcon fontSize="small" sx={{ color: 'var(--devnote-primary)' }} />
//           </ListItemIcon>
//           Update Account
//         </MenuItem>
        
//         <MenuItem onClick={() => {
//           navigate('/app/settings');
//           handleClose();
//         }}>
//           <ListItemIcon>
//             <SettingsIcon fontSize="small" sx={{ color: 'var(--devnote-primary)' }} />
//           </ListItemIcon>
//           Settings
//         </MenuItem>
        
//         <MenuItem onClick={() => {
//           window.open('https://help.devnote.com', '_blank');
//           handleClose();
//         }}>
//           <ListItemIcon>
//             <HelpIcon fontSize="small" sx={{ color: 'var(--devnote-primary)' }} />
//           </ListItemIcon>
//           Help Center
//         </MenuItem>
        
//         <Divider />
        
//         <MenuItem onClick={logout}>
//           <ListItemIcon>
//             <Logout fontSize="small" sx={{ color: 'var(--devnote-error)' }} />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
      
//       {showUpdate && <Update onClose={() => setShowUpdate(false)} />}
//     </Box>
//   );
// }
