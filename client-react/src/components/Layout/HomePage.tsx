import { colors } from "@mui/material";
import { blue } from "@mui/material/colors";
import useTypingEffect from "./useTypingEffect";
import working from "../../assets/images/working.png";
import { useState } from "react";
import { DisplaySettings } from "@mui/icons-material";
import LogIn from "../login/Login";
const HomePage = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // background: 'linear-gradient(to right, #e0f7fa, #ffffff)', // רקע עדין
            padding: '2rem',
            textAlign: 'center' as React.CSSProperties['textAlign'],
        },
        text: {
            fontFamily: "'Dancing Script', cursive",
            fontSize: '3rem',
            color: '#444',
            fontWeight: 'normal',
        },
        image: {
            maxWidth: '700px',
            // height: '',
            marginTop: '180px'
        },
        button: {
            backgroundColor: 'transparent',
            border: '2px solid #5A504F', // צבע כמו בתמונה
            color: '#5A504F',
            fontFamily: "'Dancing Script', cursive",
            fontSize: '2rem',
            padding: '0.5rem 2rem',
            borderRadius: '12px',
            cursor: 'pointer',
            // transition: 'all 0.3s ease',
        },
        hover: {
            backgroundColor: '#5A504F',
            color: '#fff',
        }
    };

    // const handleClick = () => {
    //     navigate('/login'); // נניח שזה הרואט של עמוד ההתחברות
    // };
    const [showLogIn, setShowLogIn] = useState(false);
    const [hovered, setHovered] = useState(false);
    // const text = useTypingEffect("WELCOME TO OUR WEBSITE", 150, 250, 100)
    return (<>
        <div style={styles.container as React.CSSProperties}>
            <img
                src={working} // שימי כאן את הנתיב לתמונה שלך
                alt="טקסט בעברית"
                style={styles.image}
            />
            {/* <button
                style={hovered ? { ...styles.button, ...styles.hover } : styles.button}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setShowLogIn(true)}
            >
                Let's Start
            </button> */}
            {/* {showLogIn && <LogIn onClick={() => setShowLogIn(false)} />} */}
            <LogIn onClick={() => setShowLogIn(false)} />
        </div>
    </>)
}

export default HomePage;