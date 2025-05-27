import { useContext } from "react";
import { UserContext } from "./components/login/UserReducer";
import { createBrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
// import FileUploader from "./components/meeting/FileUploader";
import HomePage from "./components/Layout/HomePage";
import CreateMeeting from "./components/meeting/CreateMeet";
import MyMeetings from "./components/MyMeetings";
// import LogIn from "./components/login/Login";
import Dashboard from "./components/dashboard/DashBoard";
// import CreateMeeting from "./components/meeting/CreateMeeting";
// import CreateMeet from "./components/meeting/createMeet";
// import LandingPage from "./components/LandingPage";

interface AuthGuardProps {
    children: React.ReactNode;
}

function TeamLeaderGaurd({ children } : AuthGuardProps) {
    const [user] = useContext(UserContext);
    return user.role === 'teamLeader' ? children : <Navigate to="/app" replace />; 
}

// function DeveloperGaurd({ children } : AuthGuardProps) {
//     const [user] = useContext(UserContext);
//     return user.role === 'developer' ? children : <Navigate to="/" replace />; 
// }

// export const myRouter = createBrowserRouter([
//     {
//         path: '/',
//         element: <HomePage />,
//         errorElement: <>main error</>,
//     },
//     {
//         path: '/app',
//         element: <AppLayout />,
//         errorElement: <>app error</>,
//         children:[
//             {path: '', element: <Dashboard/>},
//             {path: 'my-meetings', element: <MyMeetings /> },
//             {path: 'create-meeting', element: <TeamLeaderGaurd> <CreateMeeting /> </TeamLeaderGaurd> },
//         ]
//     }
// ]);





export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="my-meetings" element={<MyMeetings />} />
        <Route path="create-meeting" element={
          <TeamLeaderGaurd>
            <CreateMeeting />
          </TeamLeaderGaurd>
        } />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  )
}