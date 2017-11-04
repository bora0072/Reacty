import React, { Component } from 'react';
import CheckList from './CheckList';
class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    };
  }
  render() {
    let cardDetails;
    if(this.state.showDetails){
      cardDetails = (
        <div className="card__details">
        {this.props.description}
        <CheckList cardId={this.props.id} tasks={this.props.tasks} />
        </div>
      );
    }
    return (
      <div className="card" onClick={ () => this.setState({showDetails : !this.state.showDetails})}>
        <div className="card__title">{this.props.title}</div>
        {cardDetails}
      </div>
    );
  }
}
export default Card;
