import React, {Component} from 'react';
import Card from '../Board/Card';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';

class KBoard extends Component {
  render(){
    let landing = <div></div>;
  if(this.props.cards!= ""){
      landing= (
<div>
<Card key={this.props.cards.id}
        taskCallbacks={this.props.taskCallbacks}
        cardCallbacks={this.props.cardCallbacks}
        id={this.props.cards.id}
        title={this.props.cards.title}
        description={this.props.cards.description}
        tasks={this.props.cards.tasks}
        color={this.props.cards.color}
        keyword={this.props.cards.keyword} />
        </div>
    );

    }
       return(
          <div className="app">

{landing}
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
