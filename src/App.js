import React, { useState, useCallback, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/Auth';

import { AuthContext } from './context/authContext';

import './App.css';

const App = () => {
  const auth = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  })

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  })
  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <h4 className="text-xl text-white text-right mt-6 mr-10">
        { isLoggedIn ? <h4 onClick={logout}>Logout</h4> : <h4>Login</h4> }
      </h4>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
