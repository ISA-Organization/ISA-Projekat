import React from 'react'
import Axios from "../../utils/Axios";
import { Container, Row, Col } from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class AdminProfile extends React.Component {

    constructor(props){
        super(props)
        let user = {
            id: 0,
            address: '',
             city: '',
             email: '',
             name: '',
             phoneNumber:'',
             surname:'',
             approved : false,
             type: null
        }
        this.state ={
           user : user
            

        }
    }
    componentDidMount(){
        console.log(localStorage.getItem('jwt'))
        this.getProfile()
        
    }
    editUser(){
        Axios.put('/users/' + this.state.user.id, this.state.user)
                .then(res => {
                    alert("Successfully edited")
                })
                .catch(err=>{
                    alert("Failed to edit")
                    console.log(err)
                })
    
    }
    getProfile(){
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
                }
        Axios.get('/users/profile', config)
                .then(res => {
                    console.log(res.data)
                    this.setState({user : res.data})
                })
                .catch(
                    err=>{
                        console.log(err)
                    }
                )
    }
    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let user = this.state.user
        user[name] = value

        this.setState({user: user})
    }

  render() {
    return(
        <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
        <span class="font-weight-bold">{this.state.user.name}</span><span class="text-black-50">{this.state.user.email}</span><span> </span></div>

        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Info</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" onChange={(e) => this.changeInputValue(e)} placeholder="first name" value={this.state.user.name}/></div>
                    <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" onChange={(e) => this.changeInputValue(e)} value={this.state.user.surname} placeholder="surname"/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label><input onChange={(e) => this.changeInputValue(e)} type="text" class="form-control" placeholder="enter phone number" value={this.state.user.phoneNumber}/></div>
                    <div class="col-md-12"><label class="labels">Address Line 1</label><input onChange={(e) => this.changeInputValue(e)} type="text" class="form-control" placeholder="enter address line 1" value={this.state.user.address+ ', '+ this.state.user.city}/></div>
                    <div class="col-md-12"><label class="labels">Email </label><input onChange={(e) => this.changeInputValue(e)} type="text" class="form-control" placeholder="enter email id" value={this.state.user.email}/></div>
                    </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" onClick={() => this.editUser()} type="button">Save Profile</button></div>
            </div>
        </div>
        
    </div>
</div>

    )
  }
}

export default AdminProfile;