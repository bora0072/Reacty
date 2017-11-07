import React from 'react';
import update from 'immutability-helper';
import './index.css';
import {throttle} from './util';

import KanbanBoard from './kanbanBoard';


class Board extends React.Component {
  constructor(props){
    super(props);
    this.isAuthenticated = this.props.isAuthenticated.bind(this);
    this.state = {
      cards: []
    }
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
  }

  componentDidMount() {

    if(this.isAuthenticated() && !!this.props.profile){
      var userHeader = new Headers();
      userHeader.append("username", this.props.profile.name);

      fetch('/api/db/createuserIfAbsent',{headers: userHeader})
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(function (error) {
          console.log(error);
        });

      fetch('/api/db/cards',{headers: userHeader})
      .then(res => res.json())
      .then(json => {this.setState({cards: json});})
      .catch(function (error) {
          console.log(error);
        });
      }
  }
  //TODO: Handle rolebacks for all the fethc Calls
  addTask(cardId, taskName){
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

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

    var userHeader = new Headers();
    userHeader.append("username", this.props.profile.name);    //lastly call the api to add the task on the server
    userHeader.append('content-type', 'application/json');
    fetch(`api/db/cards/${cardId}/tasks`,{
      method: 'post',
      headers:userHeader,
      body: JSON.stringify(newTask)
    })
    .then((responseData) => {
      //TODO: Implement Rollback
      //When the server returns with an ID, update it on the ReactJS
      // newTask.id = responseData.id
      // this.setState({cards: nextState});
    });
  }

  deleteTask(cardId, taskId, taskIndex){
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);

    //new Object without the task
    let nextState = update(this.state.cards, {
                    [cardIndex]: { tasks: {$splice: [[taskIndex, 1]]}}
                    });
    this.setState({cards: nextState});
    var userHeader = new Headers();
    userHeader.append("username", this.props.profile.name);    //lastly call the api to add the task on the server
    userHeader.append('content-type', 'application/json');
    fetch(`/api/db/cards/${cardId}/tasks/${taskId}`,{
      method: 'delete',
      headers: userHeader
    });

  }


  toggleTask(cardId, taskId, taskIndex){
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
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
        var userHeader = new Headers();
        userHeader.append("username", this.props.profile.name);    //lastly call the api to add the task on the server
        userHeader.append('content-type', 'application/json');
        fetch(`api/db/cards/${cardId}/tasks/${taskId}`, {
          method: 'put',
          headers: userHeader,
          body: JSON.stringify({done: newDoneValue})
        });
  }

  updateCardStatus(cardId, listId){
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let card = this.state.cards[cardIndex]
    if(card.status != listId){
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId }
          }
        }
      }));
    }
  }

 updateCardPosition (cardId , afterId) {
  if(cardId !== afterId) {

    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

    let card = this.state.cards[cardIndex]

    let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);

    this.setState(update(this.state, {
      cards: {
        $splice: [
              [cardIndex, 1],
              [afterIndex, 0, card]
            ]
          }
        }));
    }
  }

  persistCardDrag (cardId, status) {
    var userHeader = new Headers();
    userHeader.append("username", this.props.profile.name);    //lastly call the api to add the task on the server
    userHeader.append('content-type', 'application/json');
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Geting current card
    let card = this.state.cards[cardIndex]
    fetch(`api/db/cards/${cardId}`, {
      method: 'put',
      headers : userHeader,
      body: JSON.stringify({status: card.status, row_order_position: cardIndex})
    })
    .then((response) => {
      if(!response.ok){
        // Throw an error if server response wasn't 'ok'
        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      console.error("Fetch error:",error);
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: status }
            }
          }
        })
      );
    });
  }

  render(){

      let landingPage = <div>Please login to use KanbanBoard</div>;
      if (this.isAuthenticated() && !!this.props.profile) {
        landingPage = (
          <KanbanBoard cards={this.state.cards}
            taskCallbacks={{
              toggle: this.toggleTask.bind(this),
              delete: this.deleteTask.bind(this),
              add: this.addTask.bind(this) }}
            cardCallbacks={{
              updateStatus: this.updateCardStatus,
              updatePosition: this.updateCardPosition,
              persistCardDrag: this.persistCardDrag.bind(this)
            }}
            />
          );
      }

      return(
        <div className="KBoard">
            {landingPage}
        </div>
      )
  }
}

export default Board;
