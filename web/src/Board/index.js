//import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import KanbanBoard from './kanbanBoard';
let cardsList = [
  {
    id: 1,
    title: "Read the Book",
    description: "I should read the whole book",
    status: "in-progress",
    tasks: []
  },
  {
    id: 1,
    title: "Start Coding",
    description: "I should start writing a block in ReactJS",
    status: "todo",
    tasks: []
  },
  {
    id: 2,
    title: "Write some code",
    description: "Code along with the samples in the book",
    status: "todo",
    tasks: [
      {
        id: 1,
        name: "ContactList Example",
        done: true
      },
      {
        id: 2,
        name: "Kanban Example",
        done: false
      },
      {
        id: 3,
        name: "My own experiments",
        done: false
      }
    ]
  },
];

class Board extends React.Component {
  render(){
    return(
      <KanbanBoard cards={cardsList} />
    );
  }
}

export default Board;
