import React, {Component} from 'react';
import List from './List';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';

class KanbanBoard extends Component {
  render(){
    if(this.props.display=='archive'){
       return(
          <div className="app">
           <List id="archive" title="#ArchiveList" taskCallbacks={this.props.taskCallbacks}
           cardCallbacks={this.props.cardCallbacks}  display={this.props.display}
           cards={this.props.cards.filter((card) => card.status === 'archive')
           }/>
         </div>
       );
    }else if(this.props.display=='current'){
      return (
        <div className="app">
          <List id="todo" title="#To Do" taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}  display={this.props.display} status={'todo'}
          cards={this.props.cards.filter((card) => card.status === 'todo')
          }/>
          <List id="in-progress" title="#In Progress" taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}  display={this.props.display} status={'in-progress'}
          cards={this.props.cards.filter((card) => card.status === 'in-progress')
          }/>
          <List id='done' title='#Done' taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}  display={this.props.display} status={'done'}
          cards={this.props.cards.filter((card) => card.status === "done")
          } />
        </div>
      );
    }else{
      return(
        <div className="app">
         <List id="backlog" title="#BackLogs" taskCallbacks={this.props.taskCallbacks}
         cardCallbacks={this.props.cardCallbacks} display={this.props.display}
         cards={this.props.cards.filter((card) => card.status === 'backlog')
         }/>
       </div>);
    }
  };
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks : PropTypes.object,
  cardCallbacks : PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
