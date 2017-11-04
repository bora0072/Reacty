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
  render(){
    return(
      <KanbanBoard cards={cards} />
    );
  }
}

export default Board;
