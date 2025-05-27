
import { HashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
// import AppLayout from './components/Layout/AppLayout'
// import LogIn from './components/login/Login'
// import SignIn from './components/login/SignIn'
// import { initialUserState, UserContext, UserReducer } from './components/login/UserReducer'//שורת ביטחון
// import { UserContext } from './components/login/UserReducer'
import { Box } from '@mui/material'
// import { useContext } from 'react'
import { AppRouter} from './Router'
import { LinkProvider } from './components/meeting/LinkProvider'
import { UserProvider } from './components/login/UserProvider'

function App() {

  // const [user] = useContext(UserContext)
  return (<>
    <Box sx={{
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      backgroundSize: "cover",
      backgroundPosition: "cover",
      backgroundAttachment: "fixed",
      position: "relative",
      color: "white",
      width: "100%"
    }}>
      <UserProvider>
        <LinkProvider>
          <HashRouter>
            <AppRouter />
          </HashRouter>
          {/* <RouterProvider router={myRouter} /> */}
        </LinkProvider>
      </UserProvider>
    </Box>
  </>)
}

export default App
