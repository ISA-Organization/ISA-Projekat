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
    const role = window.localStorage['role'];
    return(
      <div>
        <div className="bg">
        <h1 class="display-4">Welcome to Fishing booker!</h1>
    </div>
       { role === 'ADMIN' && approved === 'false' ?
       <div className="bg">
       <h1 class="display-4">Looks like you need to change your password!
        <a href='/changepass'>Click here!</a>
        </h1>
        </div>
          : null
       }
      </div>
    )
  }
}

export default Home;