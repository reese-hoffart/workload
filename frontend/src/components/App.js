import react from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../components/Login'
import Home from '../components/Home'
import CreateEvent from './CreateEvent';
import Density from './Denisity';

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function PrivateRoute({child, ...rest}) {
  let cookie = getCookie('workloadid')
  if (cookie === '') {
    return <Redirect to={{pathname:"/login"}}/>
  } else {
    return <Route {...rest} render={({ location }) => child} />
  }
}

class App extends react.Component {
  render() {
    return (
      <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute path="/event">
              <CreateEvent/>
            </PrivateRoute>
            <PrivateRoute path="/density">
              <Density/>
            </PrivateRoute>
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
            <PrivateRoute path="/">
              <Home/>
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App