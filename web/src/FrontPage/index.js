import React, { Component } from 'react';

import frustratedMonkey from './frustrated-monkey.gif';
import './frontpage.css';

const countStyle = {
  color: 'brown',
};

class Frontpage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0
    }
    this.foo = this.foo.bind(this);
  }

  foo() {
    this.setState(prevState => {
      return {clickCount: prevState.clickCount + 1}
    })
  }

  render() {
    return (
      <div className="FrontPage">
        <h1>
          <span className="icon"><i className="fa fa-home"></i></span>
          &nbsp;
          the front page!
        </h1>

        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <button className="button" onClick={this.foo}>example button</button>
            </div>
            <div className="level-item" style={countStyle}>
              click count: {this.state.clickCount}
            </div>
          </div>
        </div>

        <div>
          <img src={frustratedMonkey} alt="animated gif of a monkey shoving a laptop off the table" />
        </div>

      </div>
    );
  }
}

//export default Frontpage;

// FilteredList Component starts from here
class FilteredList extends Component{
  constructor(){
    super();
    this.state = {
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Hash Browns"
       ],
       items: []
    }


    this.filterList = this.filterList.bind(this);
  }


  filterList(event){
    // var updatedList is another class?
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }


  componentWillMount(){
    this.setState({items: this.state.initialItems})
  }


  render(){
    return (
      <div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Type here" onChange={this.filterList}/>
        </fieldset>
        </form>
      <List items={this.state.items}/>
      </div>
    );
  }
}




class List extends Component{
  render(){
    return (
      <ul className="list-group">
      {
        this.props.items.map(function(item) {
          return <li className="list-group-item" data-category={item} key={item}>{item}</li>
        })
       }
      </ul>
    )
  }
};

export default FilteredList;

//
// var FilteredList = React.createClass({
//   filterList: function(event){
//     var updatedList = this.state.initialItems;
//     updatedList = updatedList.filter(function(item){
//       return item.toLowerCase().search(
//         event.target.value.toLowerCase()) !== -1;
//     });
//     this.setState({items: updatedList});
//   },
//   getInitialState: function(){
//      return {
//        initialItems: [
//          "Apples",
//          "Broccoli",
//          "Chicken",
//          "Duck",
//          "Eggs",
//          "Fish",
//          "Granola",
//          "Hash Browns"
//        ],
//        items: []
//      }
//   },
//   componentWillMount: function(){
//     this.setState({items: this.state.initialItems})
//   },
//   render: function(){
//     return (
//       <div className="filter-list">
//         <form>
//         <fieldset className="form-group">
//         <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
//         </fieldset>
//         </form>
//       <List items={this.state.items}/>
//       </div>
//     );
//   }
// });
//
// var List = React.createClass({
//   render: function(){
//     return (
//       <ul className="list-group">
//       {
//         this.props.items.map(function(item) {
//           return <li className="list-group-item" data-category={item} key={item}>{item}</li>
//         })
//        }
//       </ul>
//     )
//   }
// });
//
// React.render(<FilteredList/>, document.getElementById('app'));
