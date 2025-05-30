import {Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import HomePage from "./components/Layout/HomePage";
import CreateMeeting from "./components/meeting/CreateMeet";
import MyMeetings from "./components/MyMeetings";
import Dashboard from "./components/dashboard/DashBoard";


export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="my-meetings" element={<MyMeetings />} />
        <Route path="create-meeting" element={
            <CreateMeeting />
        } />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  )
}