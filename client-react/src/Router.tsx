import { useContext } from "react";
import { UserContext } from "./components/login/UserReducer";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
// import FileUploader from "./components/meeting/FileUploader";
import HomePage from "./components/Layout/HomePage";
import CreateMeeting from "./components/meeting/CreateMeet";
import MyMeetings from "./components/MyMeetings";
import LogIn from "./components/login/Login";
// import CreateMeeting from "./components/meeting/CreateMeeting";
// import CreateMeet from "./components/meeting/createMeet";
// import LandingPage from "./components/LandingPage";

interface AuthGuardProps {
    children: React.ReactNode;
}

function TeamLeaderGaurd({ children } : AuthGuardProps) {
    const [user] = useContext(UserContext);
    return user.role === 'teamLeader' ? children : <Navigate to="/" replace />; 
}

function DeveloperGaurd({ children } : AuthGuardProps) {
    const [user] = useContext(UserContext);
    return user.role === 'developer' ? children : <Navigate to="/" replace />; 
}

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <>main error</>,
        


        // children: [
        //     {
        //         path: '/', element: <HomePage />
        //     },
        //     {
        //         path: '/MyMeetings', element: <MyMeetings/>
        //     },
        //     {
        //         path: '/CreateMeeting', element:<TeamLeaderGaurd> <CreateMeeting/> </TeamLeaderGaurd> 
        //     }
        //     // {
        //     //     path: 'ShowRecipe', element: <RecipeLayout />
        //     //     , children:
        //     //         [
        //     //             {
        //     //                 path: 'list',
        //     //                 element: <ShowRecipe />
        //     //             },
        //     //             {
        //     //                 path: ":id",
        //     //                 element: <RecipeDetails />
        //     //             }
        //     //         ]
        //     // }
        // ]
    },
    // {
    //     path: '/login',
    //     element: <LogIn />,
    //     errorElement: <>login error</>
    // }
    {
        path: '/app',
        element: <AppLayout />,
        errorElement: <>app error</>,
        children:[
            {path: 'my-meetings', element: <MyMeetings /> },
            {path: 'create-meeting', element: <TeamLeaderGaurd> <CreateMeeting /> </TeamLeaderGaurd> },
        ]
    }
]);