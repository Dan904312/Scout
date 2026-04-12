import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/library">Library</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/library">
            <h2>Library Screen</h2>
          </Route>
          <Route path="/profile">
            <h2>Profile Screen</h2>
          </Route>
          <Route path="/analytics">
            <h2>Analytics Screen</h2>
          </Route>
          <Route path="/">
            <h2>Home Screen</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default HomePage;