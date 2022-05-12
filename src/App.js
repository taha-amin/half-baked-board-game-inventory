import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import { BrowserRouter as Router, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import ListPage from './ListPage';
import UpdatePage from './UpdatePage';

import './App.css';
import { logout } from './services/fetch-utils';
import CreatePage from './CreatePage';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      token: '',
    };
  }

  // add a useEffect to get the user and inject the user object into state on load

  async componentDidMount() {
    const user = getUser();

    if (user) {
      this.setState({ token: user.access_token });
      this.setState({ email: user.user.email });
    }
  }

  async handleLogout() {
    // call the logout function
    await logout();

    // clear the user in state
    this.setState({ email: '' });
    this.setState({ token: '' });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
            {this.state.token && (
              <>
                <NavLink exact activeClassName="active-link" to="/board-games">
                  Board Games List
                </NavLink>
                <NavLink exact activeClassName="active-link" to="/create">
                  Create Page
                </NavLink>
                {/* <NavLink exact activeClassName="active-link" to="/update-games">
                  Click on a game to update it
                </NavLink> */}
                <button onClick={this.handleLogout}>Logout</button>
              </>
            )}
          </header>
          <main>
            <p>Email: {this.state.email}</p>
            <p>Click on a game to update it</p>
            <Switch>
              <Route exact path="/">
                {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
                {this.state.token ? (
                  <Redirect to="/board-games" />
                ) : (
                  <AuthPage
                    setEmail={(email) => this.setState({ email })}
                    setToken={(token) => this.setState({ token })}
                  />
                )}
              </Route>
              <Route exact path="/board-games">
                {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
                {this.state.token ? <ListPage /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/board-games/:id">
                {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
                {this.state.token ? <UpdatePage /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/create">
                {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
                {this.state.token ? <CreatePage /> : <Redirect to="/" />}
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}
