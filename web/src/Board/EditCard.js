import React,{Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';


class EditCard extends Component{


  constructor(props){
    super(props);
    this.state = {
      card: {
              id: Date.now(),
              title:'',
              description:'',
              status:'todo',
              color:'#c9c9c9',
              tasks:[]
             }};
     this.handleChange = this.handleChange.bind(this);
     this.handledescription = this.handledescription.bind(this);
     this.handlestatus = this.handlestatus.bind(this);
     this.handlecolor = this.handlecolor.bind(this);

  }



 componentDidMount(){
  //  console.log('here...');
  //  console.log(this.props.match.params.card_id);
   var userHeader = new Headers();
   userHeader.append("username", this.props.profile.name);

   fetch(`/api/db/cards/${this.props.match.params.card_id}/find`,{headers: userHeader})
   .then(res => res.json())
   .then(json => {console.log(json);this.setState({card: json});
   })
   .catch(function (error) {
       console.log(error);
     });
   }

   handleChange(event){
     var newValue = event.target.value;
     const newCard= update(this.state.card,{title: {$set: newValue}});
    this.setState({card: newCard});
   }

   handledescription(event){
     var newValue = event.target.value;
     const newCard= update(this.state.card,{description: {$set: newValue}});
    this.setState({card: newCard});
   }
   handlestatus(event){
     var newValue = event.target.value;
     const newCard= update(this.state.card,{status: {$set: newValue}});
    this.setState({card: newCard});
   }
   handlecolor(event){
     var newValue = event.target.value;
     const newCard= update(this.state.card,{color: {$set: newValue}});
    this.setState({card: newCard});
   }

   handleSubmit(e){
     e.preventDefault();

     let newCard = {
       id: this.state.card.id,
       title: this.state.card.title,
       description: this.state.card.description,
       status:this.state.card.status,
       color:this.state.card.color,
       tasks:this.state.card.tasks,
       keyword:this.state.card.keyword
     }
     

     var userHeader = new Headers();
     userHeader.append("username", this.props.profile.name);    //lastly call the api to add the task on the server
     userHeader.append('content-type', 'application/json');


     fetch(`api/db/editCard/${this.props.match.params.card_id}`,{
       method: 'put',
       headers: userHeader,
       body: JSON.stringify({card:newCard})
     })
     .then((response) => {
       this.props.history.push("/");
     });
   }

   handleClose(e){
     this.props.history.push("/");
   }

 render(){
 return (
   <div>
     <div className="card big">
       <form onSubmit={this.handleSubmit.bind(this)}>
         <input type='text'
                value={this.state.card.title}
                onChange={this.handleChange}
                placeholder="Title"
                required={true}
                autoFocus={true} /><br />
              <textarea value={this.state.card.description}
                   onChange={this.handledescription}
                   placeholder="Description"
                   required={true} /><br />
         <label htmlFor="status">Status</label>
         <select id="status"
                 value={this.state.card.status}
                 onChange={this.handlestatus}>
           <option value="todo">To Do</option>
           <option value="in-progress">In Progress</option>
           <option value="done">Done</option>
           <option value="backlog">Backlog</option>
         </select>
         <br />
         <label htmlFor="color">Color</label>
         <input id="color"
                value={this.state.card.color}
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

 )
 }
}
EditCard.propTypes = {
 cardCallbacks: PropTypes.object,
};


export default EditCard;
