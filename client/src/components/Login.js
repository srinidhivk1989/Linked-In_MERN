import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Login extends React.Component{
  constructor(props)
  {
    super(props);

      this.state={
        email:'',
        password:'',
        errorMessage:null

    }
    this.handleInput=this.handleInput.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleInput(event)
  {
    this.setState({
      [event.target.name]:event.target.value
    });
   }
handleSubmit(event)
{ let _this=this;
  event.preventDefault();
  axios.post('http://localhost:8080/api/login',this.state)
  .then(function(response){
if(response.data.status==='error'){

  _this.setState({errorMessage:response.data.message})
}
else{
  _this.props.history.push('/members');
}



  })
  .catch(function(error){
    console.log(error);
  });


}
render(){
return(
  <div>

    {this.state.errorMessage && <p>{this.state.errorMessage}</p>}

  <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="LoginEmail">Email address</label>
          <input onChange={this.handleInput} value={this.state.email} name="email" type="email" className="form-control" id="LoginEmail" aria-describedby="emailHelp" placeholder="Enter email" />

        </div>
        <div className="form-group">
          <label htmlFor="LoginPassword">Password</label>
          <input onChange={this.handleInput} value={this.state.password} name="password" type="password" className="form-control" id="LoginPassword" placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

</div>
  )
}

}
export default withRouter(Login);
