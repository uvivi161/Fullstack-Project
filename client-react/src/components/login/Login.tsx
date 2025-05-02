import { useContext, useRef, useState } from "react";
import { UserContext } from "./UserReducer";
import { Box, Button, Grid2 as Grid, Modal, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
    box:{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
    },
    button: {
        backgroundColor: 'transparent',
        border: '2px solid #5A504F', // צבע כמו בתמונה
        color: '#5A504F',
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1.5rem',
        padding: '0.5rem 2rem',
        borderRadius: '12px',
        cursor: 'pointer',
        width: '250px',
        // transition: 'all 0.3s ease',
    },
    hover: {
        backgroundColor: '#5A504F',
        color: '#fff',
    }

};


interface LogInProps {
    onClick: () => void;
}

const LogIn: React.FC<LogInProps> = ({ onClick }) => {
    const [user, usersDispatch] = useContext(UserContext);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState("");
    const [passwordHelperText, setPasswordHelperText] = useState("");

    const handleAdd = async (event: React.FormEvent) => {
        event.preventDefault();

        let isValid = true;

        if (!emailRef.current?.value) {
            setEmailError(true);
            setEmailHelperText("Email is required");
            isValid = false;
        } else {
            setEmailError(false);
            setEmailHelperText("");
        }

        if (!passwordRef.current?.value) {
            setPasswordError(true);
            setPasswordHelperText("Password is required");
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordHelperText("");
        }

        if (isValid) {

            try {
                const response = await axios.post<{ token: string }>('https://localhost:7170/api/Auth/login', {
                    Mail: emailRef.current?.value,
                    password: passwordRef.current?.value
                });
                const token = response.data.token
                sessionStorage.setItem('token', token)
                interface User {
                    id: number;
                    mail: string;
                    role: string;
                    country: string;
                    companyName: string;
                }

                const userResponse = await axios.get<User>('https://localhost:7170/api/Users/getByMail-admin', {
                    params: { Mail: emailRef.current?.value },
                    headers: {Authorization: `Bearer ${token}`}
                });
                
                const fetchedUser = userResponse.data;
                 
                usersDispatch({
                    type: 'ADD',
                    data: {
                        id: fetchedUser.id,
                        mail: fetchedUser.mail,
                        password: '',
                        role: fetchedUser.role,
                        country: fetchedUser.country,
                        companyName: fetchedUser.companyName
                    }
                });
                onClick(); setLoggedIn(true); setOpenL(!openL);
                navigate('/app');
            } catch (error) {
                alert("this user is not valid")
            }
        }
    };

    const handleEmailChange = () => {
        setEmailError(false);
        setEmailHelperText("");
    };

    const handlePasswordChange = () => {
        setPasswordError(false);
        setPasswordHelperText("");
    };

    const [openL, setOpenL] = useState(false);
    const [isLogin, setLoggedIn] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        // <UserContext value={[user, usersDispatch]}>
            <Grid container>
                <Grid size={10}>
                    {!isLogin && (
                        <Button style={hovered ? { ...styles.button, ...styles.hover } : styles.button}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        // onClick={() => setShowLogIn(true)}
                            variant="contained" onClick={() => setOpenL(!openL)}>Let's Start</Button>
                    )}
                </Grid>
                <Modal open={openL} onClose={() => setOpenL(false)}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={styles.box}>
                        <form onSubmit={handleAdd}>
                            <TextField label='userEmail' inputRef={emailRef} error={emailError}
                                helperText={emailHelperText} onChange={handleEmailChange} />
                            <TextField type="password" label='userPassword' inputRef={passwordRef}
                                error={passwordError} helperText={passwordHelperText}
                                onChange={handlePasswordChange} />
                            <Button type="submit">Login</Button>
                        </form>
                    </Box>
                </Modal>
            </Grid>
        // </UserContext>
    );
};

export default LogIn;