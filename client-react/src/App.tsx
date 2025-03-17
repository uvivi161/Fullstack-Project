
import './App.css'
import LogIn from './components/login/Login'
import SignIn from './components/login/SignIn'

function App() {


  return (<>
  <LogIn onClick={function (): void { console.log("clicked log in")
    } }></LogIn>

    <SignIn onSignin={function (): void { console.log("clicked sign in")
    } }>
      
    </SignIn>



  </>)
}

export default App
