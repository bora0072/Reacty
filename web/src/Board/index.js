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
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    //new task create with given name and temp Id
    let newTask = { id: Date.now(), name: taskName, done: false};
    //creating new object and pushing the new task to the array of tasks
    let nextState = update(this.state.cards, {
                    [cardIndex]:{
                      tasks: {$push: [newTask]}
                    }
                  });
    //set the component state to the mutated(changed) object
    this.setState({cards: nextState});

    //lastly call the api to add the task on the server
    fetch(`api/db/cards/${cardId}/tasks`,{
      method: 'post',
      body: JSON.stringify(newTask)
    })
    .then((response) => response.json())
    .then((responseData) => {
      //When the server returns with an ID, update it on the ReactJS
      newTask.id = responseData.id
      this.setState({cards: nextState});
    });
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
