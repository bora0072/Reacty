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
      suggestions: []
    };

    autoBind(this);
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
    return (
      <SearchBar
        autoFocus
        renderClearButton
        renderSearchButton
        placeholder="select an SAT word"
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
}

export default Search;
