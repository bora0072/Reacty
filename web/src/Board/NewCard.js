import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

class NewCard extends Component{

  constructor(props){
    super(props);
    this.state ={
      id: Date.now(),
      title:'rahul',
      description:'',
      status:'todo',
      color:'#c9c9c9',
      tasks:[]
     };
     this.handleChange = this.handleChange.bind(this);
     this.handledescription = this.handledescription.bind(this);
     this.handlestatus = this.handlestatus.bind(this);
     this.handlecolor = this.handlecolor.bind(this);
  }
  componentWillMount(){

  }

  handleChange(event){
    this.setState({title: event.target.value});
  }
  handledescription(event){
      this.setState({description: event.target.value});
  }
  handlestatus(event){
      this.setState({status: event.target.value});
  }
  handlecolor(event){
      this.setState({color: event.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    var userHeader = new Headers();
    userHeader.append("username", this.props.profile.name);
    userHeader.append("content-type", 'application/json');
    let newTask = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      status:this.state.status,
      color:this.state.color,
      tasks:[]
    }
    fetch(`api/db/cards`,{
      method: 'POST',
      headers: userHeader,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      this.props.history.push("/");
    });
  }

  handleClose(e){
    this.props.history.push("/");
  }

  render(){
    return(
      <div>
        <div className="card big">
          <form onSubmit={this.handleSubmit.bind(this)}>
  	        <input type='text'
                   value={this.state.title}
                   onChange={this.handleChange}
                   placeholder="Title"
                   required={true}
                   autoFocus={true} /><br />
            <textarea value={this.state.description}
                      onChange={this.handledescription}
                      placeholder="Description"
                      required={true} /><br />
            <label htmlFor="status">Status</label>
            <select id="status"
                    value={this.state.status}
                    onChange={this.handlestatus}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <br />
            <label htmlFor="color">Color</label>
            <input id="color"
                   value={this.state.color}
                   onChange={this.handlecolor}
                   type="color"
                   defaultValue="#ff0000" />

            <div className='actions'>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
        <div className="overlay" onClick={this.handleClose.bind(this)}>
        </div>
      </div>
      );
    }
  }

  NewCard.propTypes = {
    cardCallbacks: PropTypes.object,
  };

export default NewCard;
