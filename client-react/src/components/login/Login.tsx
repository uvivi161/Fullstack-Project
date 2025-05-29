// import { useContext, useRef, useState } from "react";
// import { UserContext } from "./UserReducer";
// import { 
//   Box, 
//   Button, 
//   Grid, 
//   Modal, 
//   TextField, 
//   Typography, 
//   Paper,
//   InputAdornment,
//   IconButton,
//   CircularProgress
// } from "@mui/material";
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import '../../theme.css';

// const styles = {
//   button: {
//     backgroundColor: 'transparent',
//     border: '2px solid var(--devnote-primary)',
//     color: 'var(--devnote-primary)',
//     fontFamily: 'var(--devnote-font-secondary)',
//     fontSize: '1.5rem',
//     padding: '0.5rem 2rem',
//     borderRadius: 'var(--devnote-radius-lg)',
//     cursor: 'pointer',
//     width: '250px',
//     transition: 'all var(--devnote-transition-normal)',
//   },
//   hover: {
//     backgroundColor: 'var(--devnote-primary)',
//     color: 'white',
//   }
// };

// interface LogInProps {
//   onClick: () => void;
// }

// const LogIn: React.FC<LogInProps> = ({ onClick }) => {
//   const [,usersDispatch] = useContext(UserContext);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [emailHelperText, setEmailHelperText] = useState("");
//   const [passwordHelperText, setPasswordHelperText] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleAdd = async (event: React.FormEvent) => {
//     event.preventDefault();

//     let isValid = true;

//     if (!emailRef.current?.value) {
//       setEmailError(true);
//       setEmailHelperText("Email is required");
//       isValid = false;
//     } else {
//       setEmailError(false);
//       setEmailHelperText("");
//     }

//     if (!passwordRef.current?.value) {
//       setPasswordError(true);
//       setPasswordHelperText("Password is required");
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordHelperText("");
//     }

//     if (isValid) {
      
//       setIsLoading(true);
//       try {
//         const response = await axios.post<{ token: string }>('https://fullstack-project-tt0t.onrender.com/api/Auth/login', {
//           Mail: emailRef.current?.value,
//           Password: passwordRef.current?.value,
//           SystemContext: "user"
//         });
//         const token = response.data.token;
//         sessionStorage.setItem('token', token);
        
//         interface User {
//           id: number;
//           mail: string;
//           role: string;
//           country: string;
//           companyName: string;
//         }

//         const userResponse = await axios.get<User>('https://fullstack-project-tt0t.onrender.com/api/Users/getByMail-admin', {
//           params: { Mail: emailRef.current?.value },
//           headers: {Authorization: `Bearer ${token}`}
//         });
        
//         const fetchedUser = userResponse.data;
         
//         usersDispatch({
//           type: 'ADD',
//           data: {
//             id: fetchedUser.id,
//             mail: fetchedUser.mail,
//             password: '',
//             role: fetchedUser.role,
//             country: fetchedUser.country,
//             companyName: fetchedUser.companyName
//           }
//         });
//         onClick(); 
//         setLoggedIn(true); 
//         setOpenL(!openL);
//         navigate('/app');
//       } catch (error) {
//         alert("Invalid credentials. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleEmailChange = () => {
//     setEmailError(false);
//     setEmailHelperText("");
//   };

//   const handlePasswordChange = () => {
//     setPasswordError(false);
//     setPasswordHelperText("");
//   };

//   const [openL, setOpenL] = useState(false);
//   const [isLogin, setLoggedIn] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   return (
//     <Grid container justifyContent="center">
//       <Grid item xs={12} textAlign="center">
//         {!isLogin && (
//           <Button 
//             style={hovered ? { ...styles.button, ...styles.hover } : styles.button}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//             onClick={() => setOpenL(!openL)}
//             className="slide-up"
//           >
//             Let's Start
//           </Button>
//         )}
//       </Grid>
      
//       <Modal 
//         open={openL} 
//         onClose={() => !isLoading && setOpenL(false)}
//         sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           backdropFilter: 'blur(3px)'
//         }}
//       >
//         <Paper 
//           elevation={3} 
//           sx={{ 
//             width: '100%',
//             maxWidth: '400px',
//             borderRadius: 'var(--devnote-radius-xl)',
//             overflow: 'hidden'
//           }}
//           className="fade-in"
//         >
//           <Box sx={{ 
//             p: 3, 
//             backgroundColor: 'var(--devnote-primary)',
//             color: 'white',
//             textAlign: 'center'
//           }}>
//             <Typography variant="h5" fontWeight={600}>Welcome Back</Typography>
//             <Typography variant="body2">Sign in to your DevNote account</Typography>
//           </Box>
          
//           <Box component="form" onSubmit={handleAdd} sx={{ p: 3 }}>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 inputRef={emailRef}
//                 error={emailError}
//                 helperText={emailHelperText}
//                 onChange={handleEmailChange}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon sx={{ color: 'var(--devnote-gray-500)' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   mb: 2,
//                   '& .MuiOutlinedInput-root': {
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'var(--devnote-primary)',
//                       borderWidth: '2px'
//                     }
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: 'var(--devnote-primary)'
//                   }
//                 }}
//               />
              
//               <TextField
//                 fullWidth
//                 type={showPassword ? "text" : "password"}
//                 label="Password"
//                 inputRef={passwordRef}
//                 error={passwordError}
//                 helperText={passwordHelperText}
//                 onChange={handlePasswordChange}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon sx={{ color: 'var(--devnote-gray-500)' }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'var(--devnote-primary)',
//                       borderWidth: '2px'
//                     }
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: 'var(--devnote-primary)'
//                   }
//                 }}
//               />
//             </Box>
            
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               disabled={isLoading}
//               sx={{
//                 backgroundColor: 'var(--devnote-primary)',
//                 color: 'white',
//                 py: 1.5,
//                 '&:hover': {
//                   backgroundColor: 'var(--devnote-primary-dark)',
//                 },
//                 '&.Mui-disabled': {
//                   backgroundColor: 'var(--devnote-gray-300)',
//                 }
//               }}
//             >
//               {isLoading ? (
//                 <CircularProgress size={24} sx={{ color: 'white' }} />
//               ) : (
//                 'Sign In'
//               )}
//             </Button>
            
//             <Box sx={{ mt: 2, textAlign: 'center' }}>
//               <Typography variant="body2" color="textSecondary">
//                 Don't have an account? Contact your administrator
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Modal>
//     </Grid>
//   );
// };

// export default LogIn;


























// מעוצב כתום בהיר
"use client"

import type React from "react"

import { useContext, useRef, useState } from "react"
import { UserContext } from "./UserReducer"
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../../theme.css"

const styles = {
  button: {
    backgroundColor: "transparent",
    border: "2px solid var(--devnote-primary)",
    color: "var(--devnote-primary)",
    fontFamily: "var(--devnote-font-secondary)",
    fontSize: "1.5rem",
    padding: "0.5rem 2rem",
    borderRadius: "var(--devnote-radius-lg)",
    cursor: "pointer",
    width: "250px",
    transition: "all var(--devnote-transition-normal)",
  },
  hover: {
    backgroundColor: "var(--devnote-primary)",
    color: "white",
  },
}

interface LogInProps {
  onClick: () => void
}

const LogIn: React.FC<LogInProps> = ({ onClick }) => {
  const [, usersDispatch] = useContext(UserContext)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState("")
  const [passwordHelperText, setPasswordHelperText] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault()

    let isValid = true

    if (!emailRef.current?.value) {
      setEmailError(true)
      setEmailHelperText("Email is required")
      isValid = false
    } else {
      setEmailError(false)
      setEmailHelperText("")
    }

    if (!passwordRef.current?.value) {
      setPasswordError(true)
      setPasswordHelperText("Password is required")
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordHelperText("")
    }

    if (isValid) {
      setIsLoading(true)
      try {
        const response = await axios.post<{ token: string }>("https://fullstack-project-tt0t.onrender.com/api/Auth/login", {
          Mail: emailRef.current?.value,
          password: passwordRef.current?.value,
          SystemContext: "user",
        })
        const token = response.data.token
        sessionStorage.setItem("token", token)

        interface User {
          id: number
          mail: string
          role: string
          country: string
          companyName: string
        }

        const userResponse = await axios.get<User>("https://fullstack-project-tt0t.onrender.com/api/Users/getByMail-admin", {
          params: { Mail: emailRef.current?.value },
          headers: { Authorization: `Bearer ${token}` },
        })

        const fetchedUser = userResponse.data

        usersDispatch({
          type: "ADD",
          data: {
            id: fetchedUser.id,
            mail: fetchedUser.mail,
            password: "",
            role: fetchedUser.role,
            country: fetchedUser.country,
            companyName: fetchedUser.companyName,
          },
        })
        onClick()
        setLoggedIn(true)
        setOpenL(!openL)
        navigate("/app")
      } catch (error) {
        alert("Invalid credentials. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleEmailChange = () => {
    setEmailError(false)
    setEmailHelperText("")
  }

  const handlePasswordChange = () => {
    setPasswordError(false)
    setPasswordHelperText("")
  }

  const [openL, setOpenL] = useState(false)
  const [isLogin, setLoggedIn] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} textAlign="center">
        {!isLogin && (
          <Button
            style={hovered ? { ...styles.button, ...styles.hover } : styles.button}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setOpenL(!openL)}
            className="slide-up"
          >
            Let's Start
          </Button>
        )}
      </Grid>

      <Modal
        open={openL}
        onClose={() => !isLoading && setOpenL(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(244, 162, 97, 0.1)",
            background: "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
          }}
          className="fade-in"
        >
          <Box
            sx={{
              p: 4,
              background: "linear-gradient(135deg, #f4a261 0%, #e76f51 100%)",
              color: "white",
              textAlign: "center",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{
                position: "relative",
                zIndex: 1,
                mb: 0.5,
                fontSize: "1.5rem",
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              sx={{
                position: "relative",
                zIndex: 1,
                opacity: 0.9,
                fontSize: "0.95rem",
              }}
            >
              Sign in to your DevNote account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleAdd} sx={{ p: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Email"
                inputRef={emailRef}
                error={emailError}
                helperText={emailHelperText}
                onChange={handleEmailChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fafafa",
                    border: "none",
                    "& fieldset": {
                      border: "1px solid #e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#f4a261",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#f4a261",
                      borderWidth: "2px",
                      boxShadow: "0 0 0 3px rgba(244, 162, 97, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#6b7280",
                    "&.Mui-focused": {
                      color: "#f4a261",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                inputRef={passwordRef}
                error={passwordError}
                helperText={passwordHelperText}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{
                          color: "#9ca3af",
                          "&:hover": {
                            color: "#f4a261",
                            backgroundColor: "rgba(244, 162, 97, 0.05)",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fafafa",
                    border: "none",
                    "& fieldset": {
                      border: "1px solid #e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#f4a261",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#f4a261",
                      borderWidth: "2px",
                      boxShadow: "0 0 0 3px rgba(244, 162, 97, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#6b7280",
                    "&.Mui-focused": {
                      color: "#f4a261",
                    },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                background: "linear-gradient(135deg, #f4a261 0%, #e76f51 100%)",
                color: "white",
                py: 1.8,
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 16px rgba(244, 162, 97, 0.3)",
                border: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #e76f51 0%, #d63031 100%)",
                  boxShadow: "0 6px 20px rgba(244, 162, 97, 0.4)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-disabled": {
                  background: "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
                  color: "#9ca3af",
                  boxShadow: "none",
                },
              }}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign In"}
            </Button>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  fontSize: "0.9rem",
                }}
              >
                Don't have an account? Contact your administrator
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </Grid>
  )
}

export default LogIn
