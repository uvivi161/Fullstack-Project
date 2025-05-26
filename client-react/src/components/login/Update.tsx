// import { useContext, useRef, useState } from "react";
// import { Box, Button, Modal, TextField} from "@mui/material";
// import axios from "axios";
// import { UserContext } from "./UserReducer";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// interface UpdateProps {  
//     onClose: () => void; 
// }

// const Update:React.FC<UpdateProps> = ({onClose}) => {
    
//     const [user, usersDispatch] = useContext(UserContext)
//     const [open, setOpen] = useState(true);
//     const handleClose = () => {setOpen(true);onClose();};

//     const firstNmaeRef = useRef<HTMLInputElement>(null)
//     const lastNameRef = useRef<HTMLInputElement>(null)
//     const emailRef = useRef<HTMLInputElement>(null)
//     const passwordRef = useRef<HTMLInputElement>(null)
//     const adressRef = useRef<HTMLInputElement>(null)
//     const phoneRef = useRef<HTMLInputElement>(null)

//     const handlupdate = async () => {
//         try {
//             const response = await axios.put("https://fullstack-project-tt0t.onrender.com/api/user", {
//                 id: user.id,
//                 mail: emailRef.current?.value || user.mail,
//                 password: passwordRef.current?.value || user.password,
//                 adress: adressRef.current?.value || '',
//                 phone: phoneRef.current?.value || ''
//             },
//                 { 
//                     headers: {
//                         "user-id": user.id,
//                     },
//                 })
//             usersDispatch({
//                 type: 'UPDATE',
//                 data: {
//                     mail: emailRef.current?.value || user.mail,
//                     password: passwordRef.current?.value || user.password,                    
//                 }
//             })
//             handleClose();
//         } catch (err) {
//             alert("invalid user");
//         }
//         setOpen(!open);
//     }
//     return (<>
//             <Modal open={open} onClose={handleClose}>
//             <Box sx={style}>
//                 <TextField label='firstName' inputRef={firstNmaeRef} />
//                 <TextField label='lastName' inputRef={lastNameRef} />
//                 <TextField label='email' inputRef={emailRef}/>
//                 <TextField type="password" label='passward' inputRef={passwordRef} />
//                 <TextField label='addres' inputRef={adressRef} />
//                 <TextField label='phone' inputRef={phoneRef} />
//                 <Button type="submit" onClick={() => handlupdate()}>Save</Button>
//             </Box>
//         </Modal>
//     </>)
// }

// export default Update;