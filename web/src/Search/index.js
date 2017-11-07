/*import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

class Search extends Component {
  render(){
    return (
      <div className="search">
        <SearchBar props={this.props}/>
      </div>
    );
  };
}

Search.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks : PropTypes.object,
  cardCallbacks : PropTypes.object
};

export default Search;*/

import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';

import SearchBar from './SearchBar';
import styles from './demo.css';
import words from './words.json';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      cards: []
    };
    this.isAuthenticated = this.props.isAuthenticated.bind(this);

    autoBind(this);
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



  handleClear() {
    this.setState({
      suggestions: []
    });
  }

  handleChange(input) {
    this.setState({
      suggestions: words.filter(word => word.startsWith(input))
    });
  }

  handleSelection(value) {
    if (value) {
      console.info(`Selected "${value}"`);
    }
  }

  handleSearch(value) {
    if (value) {
      console.info(`Searching "${value}"`);
    }
  }

  suggestionRenderer(suggestion, searchTerm) {
    return (
      <span>
        <span>{searchTerm}</span>
        <strong>{suggestion.substr(searchTerm.length)}</strong>
      </span>
    );
  }

  render() {
    let landingPage = <div></div>;
    if (this.isAuthenticated() && !!this.props.profile){
      landingPage= (<SearchBar
        autoFocus
        renderClearButton
        renderSearchButton
        placeholder="search for a keyword"
        onChange={this.handleChange}
        onClear={this.handleClear}
        onSelection={this.handleSelection}
        onSearch={this.handleSearch}
        suggestions={this.state.suggestions}
        suggestionRenderer={this.suggestionRenderer}
        styles={styles}
      />
    );
    }
    return (
      <div className="search">
          {landingPage}
      </div>
    );
  }
}

export default Search;
