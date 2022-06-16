import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import CreateNewEvent from './pages/createNewEvent/CreateNewEvent'
import MyEvents from './pages/myEvents/MyEvents'
import Signup from './pages/signup/Signup'
import EditEvent from './pages/editEvent/EditEvent'

import Navbar from './components/Navbar'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && user.displayName && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
            <Route exact path="/CreateNewEvent">
              {!user && <Redirect to="/login" />}
              {user && <CreateNewEvent />}
            </Route>
            <Route exact path="/MyEvents">
              {!user && <Redirect to="/login" />}
              {user && <MyEvents />}
            </Route>
            <Route exact path="/editEvent">
              {!user && <Redirect to="/login" />}
              {user && <EditEvent />}
            </Route>
            
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App