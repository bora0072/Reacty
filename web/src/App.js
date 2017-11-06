import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import { withAuth } from './Auth';

import Header from './Header';
import Board from './Board';
import NewCard from './Board/NewCard';



class App extends Component {

  render() {

    // this.props has a bunch of stuff in it related to auth0 (from `withAuth` below)
     //console.log('props', this.props);

    return (
      <div className="App">
        <div>
          <Header {...this.props} />
        </div>
        <section className="section">
          <div className="content">
            <Route exact path="/" render={props => <Board {...props} {...this.props} />} />
            <Route exact path="/new"  render={props => <NewCard {...props} {...this.props} />} />
          </div>
        </section>
      </div>
    );
  }
}

export default withAuth(App);
