import React, { Component} from 'react';
import PropTypes from 'prop-types';


class CheckList extends Component {
  render() {
    let tasks = this.props.tasks.map((task) => (
      <li key={task.id} className="checklist__task">
        <input type="checkbox" defaultChecked={task.done} />
        {task.name}
        
      </li>
    ));
  return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text"
              className="checklist--add-task"
              placeholder="Type & hit Enter to add Task" />
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;
