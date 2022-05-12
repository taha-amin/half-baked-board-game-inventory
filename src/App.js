import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import { BrowserRouter as Router, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './UpdatePage';
import ListPage from './ListPage';
import UpdatePage from './UpdatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  // You'll need to track the user in state
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    const user = getUser();

    if (user) {
      setToken(user.access_token);
      setEmail(user.user.email);
    }
  }, []);

  async function handleLogout() {
    // call the logout function
    await logout();

    // clear the user in state
    setEmail('');
    setToken('');
  }

  return (
    <Router>
      <div className="App">
        <header>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
          {token && (
            <>
              <NavLink exact activeClassName="active-link" to="/board-games">
                Board Games List
              </NavLink>
              <NavLink exact activeClassName="active-link" to="/create">
                Create Page
              </NavLink>
              <NavLink exact activeClassName="active-link" to="/update-games">
                Update Games
              </NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </header>
        <main>
          <p>Email: {email}</p>
          <Switch>
            <Route exact path="/">
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {token ? (
                <Redirect to="/board-games" />
              ) : (
                <AuthPage setEmail={setEmail} setToken={setToken} />
              )}
            </Route>
            <Route exact path="/board-games">
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
              {token ? <ListPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/board-games/:id">
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
              {token ? <DetailPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/create">
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
              {token ? <UpdatePage /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
