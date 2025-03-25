import { useContext, useRef, useState } from "react";
import { UserContext } from "./UserReducer";
import { Box, Button, Grid2 as Grid, Modal, TextField } from "@mui/material";
import axios from "axios";

const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};

interface Props {
    onSignin: () => void;
}

const SignIn: React.FC<Props> = ({ onSignin }) => {
    const [user, usersDispatch] = useContext(UserContext);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState("");
    const [passwordHelperText, setPasswordHelperText] = useState("");
    const [countryHelperText, setCountryHelperText] = useState("");
    const [roleHelperText, setRoleHelperText] = useState("");

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

        if (!countryRef.current?.value) {
            setCountryError(true);
            setCountryHelperText("Country is required");
            isValid = false;
        } else {
            setCountryError(false);
            setCountryHelperText("");
        }

        if (!roleRef.current?.value) {
            setRoleError(true);
            setRoleHelperText("Role is required");
            isValid = false;
        } else {
            setRoleError(false);
            setRoleHelperText("");
        }


        if (isValid) {
            try {
                interface RegisterResponse {
                    token: string;
                }

                const res = await axios.post<RegisterResponse>('https://localhost:7170/api/Auth/register', {
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value,
                    role: roleRef.current?.value,
                    country: countryRef.current?.value
                });

                const token = res.data.token;
                sessionStorage.setItem('token', token);
                
                console.log(res);
                
                // const response = await axios.post('https://localhost:7170/api/Auth/register', {
                //     email: emailRef.current?.value,
                //     password: passwordRef.current?.value                    
                // });                 
                // usersDispatch({
                //     type: 'ADD',
                //     data: {
                        
                //         id: response.data.user.id,
                //         email: response.data.user.email,
                //         password: response.data.user.password
                //     }
                // });
                setLoggedIn(true); setOpenL(!openL); onSignin();
            } catch (error) {
                debugger;
                alert("This user already exists or there was an error during registration.");
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

    const handleCountryChange = () => {
        setPasswordError(false);
        setPasswordHelperText("");
    };

    const handleRoleChange = () => {
        setPasswordError(false);
        setPasswordHelperText("");
    };

    const [openL, setOpenL] = useState(false);
    const [isLogin, setLoggedIn] = useState(false);

    return (
        <UserContext value={[user, usersDispatch]}>
            <Grid container>
                <Grid size={10}>
                    {!isLogin && (
                        <Button sx={{ width: "100px", backgroundColor: "#3b3c71", marginLeft: "20px" }}
                            variant="contained" onClick={() => setOpenL(!openL)}>Sign In</Button>
                    )}
                </Grid>
                <Modal open={openL} onClose={() => setOpenL(false)}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={style}>
                        <form onSubmit={handleAdd}>
                            <TextField label='userEmail' inputRef={emailRef} error={emailError}
                                helperText={emailHelperText} onChange={handleEmailChange} />
                            <TextField type="password" label='userPassword' inputRef={passwordRef}
                                error={passwordError} helperText={passwordHelperText}
                                onChange={handlePasswordChange} />
                            <TextField label='Country' inputRef={countryRef} error={countryError}
                                helperText={countryHelperText} onChange={handleCountryChange}/>
                            <TextField label='userRole' inputRef={roleRef} error={roleError}
                                helperText={roleHelperText} onChange={handleRoleChange}/>
                            <Button type="submit">SignIn</Button>
                        </form>
                    </Box>
                </Modal>
            </Grid>
        </UserContext>
    );
};

export default SignIn;

