

import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import '../Board/index.css';
import SearchBar from './search-bar';
import styles from './demo.css';
import words from './words.json';

import {Link} from 'react-router-dom';
import KBoard from './kBoard';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      cards: [],
      selects: '',
      display: 'current',
      discards: []
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
    var keywordList= this.state.cards.map((c) =>
      c.keyword.map((k)=> k)
    );
    var data=[];
      for(var i=0;i<keywordList.length;i++){
        for(var j=0;j<keywordList[i].length;j++)
        data.push(keywordList[i][j]);
      }
        console.log(data);
        console.log(words);
      this.setState({
        suggestions: data.filter(word => word.startsWith(input))
      });
      console.log(this.state.suggestions);
  }


  handleSelection(value) {
    if (value) {
      this.setState({
        selects: value
      });

    }
  }

  handleSearch(value) {
    if (value) {
        console.log(this.state.selects);
      console.info(`Searching "${value}"`);
    }
    var dcards= this.state.cards.map((c) =>
      c.keyword.map((k)=>{
      if(k == this.state.selects)
      {
        this.setState({discards : c});
      }})
    );
    console.log(this.state.discards);
  }

  suggestionRenderer(suggestion, searchTerm) {
    return (
      <span>
        <span>{searchTerm}</span>
        <strong>{suggestion.substr(searchTerm.length)}</strong>
      </span>
    );
  }

  handleClick(type) {
    this.setState({display:type});
  }

  render() {


    let landingPage = <div><h4>Please login to Search</h4></div>;
    if (this.isAuthenticated() && !!this.props.profile){
      landingPage= (
<div>
        <SearchBar
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
      <br/>
      <KBoard selects={this.state.selects} cards={this.state.discards}
        />
        </div>
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
