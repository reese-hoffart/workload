import react from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../components/Login'
import Home from '../components/Home'

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

function PrivateRoute() {
  let cookie = getCookie('workloadid')
  if (cookie === '') {
    return <Redirect to={{pathname:"/login"}}/>
  } else {
    return <Route/>
  }
}

class App extends react.Component {
  render() {
    return (
      <div className="wrapper">
        <h1>Workload</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App