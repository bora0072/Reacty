import React, { Component } from 'react';

/**
 * Demo of a fully authenticated API call.
 */
class AllCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      error: false,
      loading: true
    };
  }

  componentDidMount() {
    let myRequest = new Request('/api/db/allcards', {
      method: 'GET',
      // this header sends the user token from auth0
      headers: this.props.getAuthorizationHeader()
    });

    fetch(myRequest)
      .then(response => {
        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if (!response.ok) {
          this.setState({ 'loading': false, 'error': true });
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json();console.log(JSON.stringify(res.json()));)
      .then(json => {
        this.setState({
          'cards': json.cards,
          'loading': false
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
  /*  // let cardsList = this.state.cards.map(function(todo) {
    //   return <li key={todo._id}>{todo.task}</li>;
    // });
    //
    // if (this.state.loading) {
    //   return <h1>loading...</h1>
    // } else if (this.state.error) {
    //   return <h1>todos from a protected db call (401 unauthorized)</h1>
    // } else {
    //   return (
    //     <div className="Db">
    //       <h1>todos from a protected db call</h1>
    //       <ul>
    //         {todoList}
    //       </ul>
    //     </div>
    //   );
    //}
   //Your rendering logic goes here.*/
  }
}

export default ProtectedCall;
