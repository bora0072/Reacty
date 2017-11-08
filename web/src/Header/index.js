import React, { Component } from 'react';

import LoginLogout from './LoginLogout';
import './index.css';

class Header extends Component {

  render() {
    return (
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="navbar-brand">
          <a class="navbar-item title" href="/">Reacty  </a>
        </div>

        <div className="navbar-item ">
          <a class="navbar-item" href="/search.js">
          KanbanBoard
          </a>
        </div>

        <div className="navbar-item">
          <a class="navbar-item" href="/profile">
          Profile
          </a>
        </div>



        <div className="navbar-menu">
          <LoginLogout {...this.props} />
        </div>
    </nav>
    )
  }

}

export default Header;
