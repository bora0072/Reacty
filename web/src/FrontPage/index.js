import React, { Component } from 'react';

import './frontpage.css';
import FilteredList from './FilteredList'
import Annotate from './Annotate'

class Frontpage extends Component {
  render() {
    return (

         <div className="searchbar">
         <FilteredList />
         <Annotate />
         </div>

    );
  }
}

export default Frontpage;
