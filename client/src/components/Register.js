import React from 'react';
import axios from 'axios';
import validator from 'email-validator';

class Register extends React.Component{

constructor(props){
  super(props);

    this.state={
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      jobTitle:'',
      registrationCompleted:false,
      passwordValidationMessage:null,
      confirmPasswordValidationMessage:null,
      nameValidationMessage:null,
      emailValidationMessage:null

    }
    this.handleNameChange=this.handleNameChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange=this.handleConfirmPasswordChange.bind(this);
    this.handleJobTitleChange=this.handleJobTitleChange.bind(this);

      this.handleInputChange=this.handleInputChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);

}

handleNameChange(event){
this.setState({name:event.target.Value})

}
handleEmailChange(event){
this.setState({email:event.target.Value})

}
handlePasswordChange(event){
this.setState({password:event.target.Value})

}
handleConfirmPasswordChange(event){
this.setState({confirmPassword:event.target.Value})

}
handleJobTitleChange(event){
this.setState({jobTitle:event.target.Value})

}
handleInputChange(event){
  this.setState({
    [event.target.name]:event.target.value
  });
}
handleSubmit(event){
  event.preventDefault();

  let nameValidationMessage=null;
  if(/\d/.test(this.state.name)){
  nameValidationMessage="Name cannot contain numbers";
  }
  let emailValidationMessage=null;
  if(!validator.validate(this.state.email)){
    emailValidationMessage="Not valid email";
  }

  let passwordValidationMessage=null;
  if(this.state.password.length<6)
  {
    passwordValidationMessage="password should be atleast 6 characters";
  }

let confirmPasswordValidationMessage=null;
  if(this.state.password!==this.state.confirmPassword)
  {
    confirmPasswordValidationMessage="password and confirm password fields Not Equal";
  }
if(nameValidationMessage || passwordValidationMessage || confirmPasswordValidationMessage || emailValidationMessage)
{
  this.setState({
    nameValidationMessage:nameValidationMessage,
    passwordValidationMessage:passwordValidationMessage,
    confirmPasswordValidationMessage:confirmPasswordValidationMessage,
    emailValidationMessage:emailValidationMessage
  });
}
else{
  let _this=this;
  axios.post('http://localhost:8080/api/register',this.state)
  .then(function(response){
    if(response.data.status==='success'){
      _this.setState({registrationCompleted:true})
    }
  })
  .catch(function(error){
    console.log(error);
  });
}
}
render(){
return(
    <div>
    {this.state.registrationCompleted?
    <p>Thanks for Signing Up</p>
    :

  <form onSubmit={this.handleSubmit}>

    <div className="form-group">
      <label htmlFor="inputName">Name</label>
      <input onChange={this.handleInputChange} name="name" type="text" value={this.state.name} className="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter Name"/>

    </div>
    {this.state.nameValidationMessage &&
    <p>{this.state.nameValidationMessage}</p>}

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="text" onChange={this.handleInputChange} name="email" email="email" value={this.state.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>

  {this.state.emailValidationMessage &&
  <p>{this.state.emailValidationMessage}</p>}

  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" onChange={this.handleInputChange} name="password" value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>

  {this.state.passwordValidationMessage &&
  <p>{this.state.passwordValidationMessage}</p>}

  <div className="form-group">
    <label htmlFor="exampleInputPassword2">Confirm Password</label>
    <input type="password" onChange={this.handleInputChange}  name="confirmPassword" value={this.state.comfirmPassword} className="form-control" id="exampleInputPassword2" placeholder="Confirm Password"/>
  </div>
  {this.state.confirmPasswordValidationMessage &&
  <p>{this.state.confirmPasswordValidationMessage}</p>}

  <div className="form-group">
    <label htmlFor="jobTitle">Job Title</label>
    <input type="text" onChange={this.handleInputChange} name="jobTitle" value={this.state.jobTitle} className="form-control" id="jobTitle" placeholder="Job Title"/>
  </div>




  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
}
</div>


  )
}

}
export default Register;
