import "./styles.css";
import React from "react";
import MomentCustom from "./momentCustom";
import Header from "./header";
import Timeline from "./timeline/timeline";
// How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <div className="ParentContainer">
        <Router>
          <div>
            <div className="mainContainer header">
              <div className="headerContainer fixed-width mx-auto">
                <ul className="mainNav margin-0 unstyled-list d-flex justify-center">
                  <li className="padding-10">
                    <NavLink exact to="/" activeClassName="selectedNav">
                      Home
                    </NavLink>
                  </li>
                  <li className="padding-10">
                    <NavLink to="/timeCalculator" activeClassName="selectedNav">
                      Time Calculator
                    </NavLink>
                  </li>
                  <li className="padding-10">
                    <NavLink to="/timeline" activeClassName="selectedNav">
                      Timeline creator
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
            <Switch>
              <Route exact path="/">
                <Header title="Timeline Creator" />
                <Timeline />
              </Route>
              <Route path="/timeCalculator">
                <MomentCustom />
              </Route>
              <Route path="/timeline">
                <Header title="Timeline Creator" />
                <Timeline />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
