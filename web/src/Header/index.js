import React, { Component } from 'react';

import LoginLogout from './LoginLogout';
import './index.css';
import NotLogin from '../NotLogin';

class Header extends Component {
  constructor(props){
    super(props);
    this.isAuthenticated = this.props.isAuthenticated.bind(this);
  }

  render() {
    
    var notLoggedin;
    if (!(this.isAuthenticated() && !!this.props.profile)){
        notLoggedin = (<div ><NotLogin/></div>);
    }
    return (
      <div>
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="navbar-brand">
          <a class="navbar-item title has-text-success" href="/">Reacty  </a>
        </div>
        <div className="navbar-item ">
          {/*}<a class="navbar-item" href="/search">
          KanbanBoard Search
          </a>*/}
        </div>
        <div className="navbar-menu">
          <LoginLogout {...this.props} />
        </div>
    </nav>
    <div>
     {notLoggedin}
    </div>
    </div>
    )
  }

}

export default Header;
