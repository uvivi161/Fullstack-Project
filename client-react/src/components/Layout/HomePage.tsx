import { colors } from "@mui/material";
import { blue } from "@mui/material/colors";
import useTypingEffect from "./useTypingEffect";

const HomePage = () => {

    const text = useTypingEffect("WELCOME TO OUR WEBSITE", 150, 250, 100)
    return(<>
    <div style={{color: 'blue'}}>
        {text}
    </div>
    </>)
}

export default HomePage;