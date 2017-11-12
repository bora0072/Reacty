import React, { Component} from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';

class CheckList extends Component {
  checkInputKeyPress(evt){
    if(evt.key === 'Enter'){
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value)
      evt.target.value = '';
    }
  }
  render() {
    let tags;
    if(this.props.keyword){
      let hotKeywords = this.props.keyword.slice(0,2);
      tags = hotKeywords.map((keyword, index) =>(
        <div><span className="tag is-danger">{keyword}</span></div>
      ));
    }
    let tasks;
    if(this.props.display=='current'){
      tasks = this.props.tasks.map((task, taskIndex) => (
        <tr key={task.id}>
          <td>
            <input type="checkbox" checked={task.done}
            onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)}
            />
          </td>
          <td>{task.name}</td>
          <td>
            <a href="#"
            onClick={this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)}
            ><span className="fa fa-times"></span></a>
          </td>
        </tr>
      ));
    }else{
      tasks = this.props.tasks.map((task, taskIndex) => (
        <li key={task.id}>
          {' '}{task.name}{' '}
        </li>
      ));
    }
  if(this.props.display=='current'){
    return (
        <div class="tile is-parent">
					<article class="tile is-child">
					<div class="card material-shadow-d2">
              <header class="card-header">
              {this.props.description}
							</header>
							<div class="card-content">
								<div class="content">
                <table class="table is-narrow is-striped">
                  <tbody>
                     {tasks}
                  </tbody>
                </table>
								</div>
							</div>
							<footer class="card-footer">
              <div class='is-clearfix'>
                <ul class="tags is-pulled-center">
                  {tags}
                </ul>
                <input type="text" className="input is-success"
                      placeholder="Type & hit Enter to add Task"
                      onKeyPress={this.checkInputKeyPress.bind(this)} />
             </div>
							</footer>
							</div>
					</article>
				</div>);
  }else{
    return(
      <div className="checklist">
        {this.props.description}
        <ul>{tasks}</ul>
      </div>
    );
  }
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;
