import React, { Component } from 'react';

import './frontpage.css';
import FilteredList from './FilteredList'


class Frontpage extends Component {
  render() {
    return (

         <div className="searchbar">
         <FilteredList />
         </div>

    );
  }
}

export default Frontpage;
