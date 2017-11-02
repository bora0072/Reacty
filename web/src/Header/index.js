import React, { Component } from 'react';

import LoginLogout from './LoginLogout';

class Header extends Component {

  render() {
    return (
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="navbar-brand"><a class="navbar-item title" href="/">Reacty </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item"></a>
          </div>

          <LoginLogout {...this.props} />
        </div>
      </nav>
    )
  }

}

export default Header;