//import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
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

  addTask(cardId, taskName){

  }

  deleteTask(cardId, taskId, taskIndex){
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

    //new Object without the task
    let nextState = update(this.state.cards, {
                    [cardIndex]: { tasks: {$splice: [[taskIndex, 1]]}}
                    });
    this.setState({cards: nextState});

    fetch(`/api/db/cards/${cardId}/tasks/${taskId}`,{
      method: 'delete'
    });

  }


  toggleTask(cardId, taskId, taskIndex){
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    //Save ref to tasks's 'done' value
    let newDoneValue;
    // $apply to change done value to opposite
    let nextState = update(this.state.cards, {
                          [cardIndex]: {
                            tasks: {
                              [taskIndex]: {
                                done: {$apply: (done)=>{
                                    newDoneValue = !done
                                    return newDoneValue;
                                  }
                                }
                              }
                            }
                          }
                        });
        this.setState({cards: nextState});

        fetch(`api/db/cards/${cardId}/tasks/${taskId}`, {
          method: 'put',
          body: JSON.stringify({done: newDoneValue})
        });
  }

  render(){
    return(
      <KanbanBoard cards={this.state.cards}
      taskCallbacks={{
            toggle: this.toggleTask.bind(this),
            delete: this.deleteTask.bind(this),
            add: this.addTask.bind(this) }}/>
    );
  }
}

export default Board;
