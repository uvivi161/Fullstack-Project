
import { RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './components/Layout/AppLayout'
import LogIn from './components/login/Login'
import SignIn from './components/login/SignIn'
import { initialUserState, UserContext, UserReducer } from './components/login/UserReducer'
import { Box } from '@mui/material'
import { useReducer } from 'react'
import { myRouter } from './Router'
import { LinkProvider } from './components/meeting/LinkProvider'

function App() {

  const [user, dispatch] = useReducer(UserReducer, initialUserState)

  return (<>
  {/* <LogIn onClick={function (): void { console.log("clicked log in")
    } }></LogIn>

    <SignIn onSignin={function (): void { console.log("clicked sign in")
    } }>
      
    </SignIn> */}



<Box sx={{
        height: "100vh",
        overflowY:'auto',
        display: 'flex',
        flexDirection: 'column',
        // backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "cover",
        backgroundAttachment: "fixed",
        position: "relative",
        color: "white",
        width: "100%"
      }}>
        <UserContext.Provider value={[user, dispatch]}>
          <LinkProvider>
          <RouterProvider router={myRouter} />
          </LinkProvider>
        </UserContext.Provider>
      </Box>
  </>)
}

export default App
