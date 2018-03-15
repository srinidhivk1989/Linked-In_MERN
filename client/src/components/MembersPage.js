import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class MembersPage extends React.Component{
constructor(props){
  super(props);
  this.state={
    members:null
  }
}
//''==something like text
//null--not checked yet
//[]--checked db, but no members
componentDidMount(){
  let _this=this;
  axios.get('http://localhost:8080/api/members')
  .then(function(response)
{
  _this.setState({members:response.data})
  console.log(response);
})
.catch(function(error){
  console.log(error);
})
}
render(){
return(
  <div>

  {this.state.members?
      <table>
        <tbody>
    {this.state.members.map(function(member){
      return (
        <tr key={member._id}>
          <td>{member.name}</td>
          <td><Link to={`/members/${member._id}`} >View Profile</Link></td>


        </tr>

      )
    })}
  </tbody>
</table>
    :
    <p> Looking for members...</p>
}

</div>

  )
}

}
export default MembersPage;
