import React from 'react';
import './index.css';
import update from 'react-addons-update';
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
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);

    //new Object without the task
    let nextState = update(this.state.cards, {
                    [cardIndex]: { tasks: {$splice: [[taskIndex, 1]]}}
                    });
    this.setState({cards: nextState});

    fetch('/api/db/cards/${cardId}/tasks/${taskId}',{
      "method": 'delete'
    });

  }


  toggleTask(cardId, taskId, taskIndex){

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
