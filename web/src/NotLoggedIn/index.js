import React, { Component } from 'react';
import './index.css';

class NotLoggedIn extends Component {

  render() {
    return (

      <div>
      <div className="columns features">
      <div className="column is-4">
        <div className="card1">
          <div className="card1-image has-text-centered">
              <i className="fa fa-pencil"></i>
          </div>
          <div className="card1-content">
            <div className="content">
              <h4>#To Do</h4>

              <p>Organizing your tasks with a list can make everything much more manageable and make you feel grounded. Seeing a clear outline of your completed and uncompleted tasks will help you feel organized and stay mentally focused.</p>
          </div>
          </div>
        </div>
      </div>
      <div className="column is-4">
        <div className="card1">
          <div className="card1-image has-text-centered">
              <i className="fa fa-spinner"></i>
          </div>
          <div className="card1-content">
            <div className="content">
              <h4>#In Progress</h4>
              <p>Keep in progress task here! To-do lists are a useful external memory aid that give you permission to forget. As long as you can remember to look at your to-do list, you will never lose anything that you have recorded on it.</p>

            </div>
          </div>
        </div>
      </div>
      <div className="column is-4">
        <div className="card1">
          <div className="card1-image has-text-centered">
              <i className="fa fa-check-square"></i>
          </div>
          <div className="card1-content">
            <div className="content">
              <h4>#Done</h4>
              <p>As you cross items off your to-do list, you will feel a sense of progress and accomplishment that can be missed when rushing from one activity to the next. The affirmation that you are making progress will help motivate you to keep moving forward.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>

    );
  }
}

export default NotLoggedIn;
