import React, { Component } from "react";
import { HashRouter, BrowserRouter, Switch, Link, Route } from "react-router-dom";

import Coin from "./coin/coin.js";
import Home from "./home/home.js";

// Enable fetch in older browsers
require('es6-promise').polyfill();
require('isomorphic-fetch');

// App
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container">
          <header className="header">
            <Link to="/">
              <h1 className="header__title">Andy Crypto</h1>
            </Link>
          </header>
          <Route exact path="/" component={Home} />
          <Route path="/:short/" component={Coin} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
