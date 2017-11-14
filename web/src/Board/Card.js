import React, { Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';
import { DragSource, DropTarget } from 'react-dnd';
import constants from './constants';
import marked from 'marked';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';
import {Link} from 'react-router-dom';

let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName}  is longer than 80 characters`
      );
    }
  }
}

const cardDragSpec = {
  beginDrag(props) {
    return{
      id: props.id,
      status: props.status
    };
  },endDrag(props) {
    props.cardCallbacks.persistCardDrag(props.id, props.status);
  }
}

const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id);
  }
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
}

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    };
  }

  toggleDetails(){
    this.setState({showDetails : !this.state.showDetails});
  }
  render() {

    const { connectDragSource, connectDropTarget } = this.props;

    let cardDetails;
    if(this.state.showDetails){
      cardDetails = (
        <div className="card__details">
        <CheckList keyword={this.props.keyword} cardId={this.props.id} taskCallbacks={this.props.taskCallbacks}
        tasks={this.props.tasks} description={this.props.description} display={this.props.display} />
        </div>
      );
    }
    let iconDetails;
    if(this.props.status=='done'){
      iconDetails = (
        <div className="level-item">
          <a onClick={this.props.taskCallbacks.archive.bind(null, this.props.id)}
          ><span className="fa fa-archive"></span>archive</a>
        </div>
      );
    }else if(this.props.display=='backlog'){
      iconDetails = (
        <div className="level-item">
          <a onClick={this.props.taskCallbacks.revertBacklog.bind(null, this.props.id)}
          ><span className="fa fa-play-circle" aria-hidden="true"></span>Start</a>
        </div>
      );
    }

    let sideColor = {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    bottom: 0,
    left: 0,
    width: 7,
    backgroundColor: this.props.color
    };
    return connectDropTarget(connectDragSource(
      <div className="card">
        <div style={sideColor}/>
          <div className="card__edit" ><Link to={`/edit/${this.props.id}`}>&#9998;</Link></div>
          <div className={this.state.showDetails ? "card__title card__title--is-open" : "card__title"}
          onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
          {iconDetails}
          <ReactCSSTransitionGroup transitionName="toggle"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250} >
            {cardDetails}
          </ReactCSSTransitionGroup>
      </div>
    ));
  }
}

Card.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  keyword: PropTypes.string,
  color: PropTypes.string,
  taskCallbacks: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object),
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

let dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
let dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard
