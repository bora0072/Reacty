import React, {Component} from 'react';
import List from '../Board/List';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';

class KBoard extends Component {
  render(){
       return(
          <div className="app">
           <List taskCallbacks={this.props.taskCallbacks}
           cardCallbacks={this.props.cardCallbacks}  display={this.props.display}
           cards={this.props.cards.filter((card) =>  card.keyword.map((k)=>
          k === this.props.selects))
           }/>
         </div>
       );

  };
}

KBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks : PropTypes.object,
  cardCallbacks : PropTypes.object
};

export default DragDropContext(HTML5Backend)(KBoard);
