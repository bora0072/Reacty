//import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import KanbanBoard from './kanbanBoard';


class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    fetch('/api/db/cards')
      .then(res => res.json())
      .then(json => {
        this.setState({cards: json});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render(){
    return(
      <KanbanBoard cards={this.state.cards} />
    );
  }
}

export default Board;
