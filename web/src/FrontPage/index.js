import React, { Component } from 'react';

import './frontpage.css';
import FilteredList from './FilteredList'
import FullList from '../ReactKanban'

class Frontpage extends Component {
  render() {
    return (

         <div className="searchbar">
         <FilteredList />
         <FullList/>
         </div>

    );
  }
}

export default Frontpage;
