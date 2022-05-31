import axios from 'axios';
import React from 'react'
import '../index.css'

class Home extends React.Component {

  constructor(props){
    super(props);
    let approved = localStorage.getItem('approved');
    let superAdmin = localStorage.getItem('superAdmin')
  }
  componentDidMount(){
    this.renderIsApproved();
    this.isSuperAdmin();
  }

  renderIsApproved(){
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
          }
    console.log('Brate salje se zahtev')
    axios.get('http://localhost:8080/api/users/approved', config)
    .then(res =>{
      localStorage.setItem('approved', res.data)
      this.setState({approvedUser : res.data})
      //console.log(this.approvedUser)
    }).catch(err => {
      console.log(err)
    })
  }
  isSuperAdmin(){
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
          }
    axios.get('http://localhost:8080/api/users/superAdmin', config)
    .then(res =>{
      localStorage.setItem('superAdmin', res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  
  render() {
    const approved = window.localStorage['approved'];

    return(
      <div>
      { approved === 'true' ? 
        <div className="bg">
        <h1 class="display-4">Welcome to Fishing booker!</h1>
    </div>
    :
    <div><h1>Sorry your account hasnot yet been activated </h1></div>
      }
      </div>
    )
  }
}

export default Home;