import React from 'react';
import axios from 'axios';

class  MemberProfile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      member:null
    }
  }
  componentDidMount(){
    let _this=this;
    axios.get('http://localhost:8080/api/members/'+this.props.match.params.id)
    .then(function(response){
      _this.setState({member:response.data})
    })
    .catch(function(error){
      console.log(error);
    });
  }
render() {
console.log(this.state.member);
  return(
    <div>
      {this.state.member?
        <div>
          <h2>Name:{this.state.member.name} </h2>
          <p>Job Title:{this.state.member.jobTitle} </p>
          <p>Email: {this.state.member.email}</p>
      </div>
    :
    <p>Looking for member</p>
  }
  </div>
   )
  }
}
export default MemberProfile;
