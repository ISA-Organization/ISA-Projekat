import React from "react";
import '../../index.css';
import Axios from "../../utils/Axios";
import {Button, Card, CardGroup} from 'react-bootstrap';

import {withParams, withNavigation} from '../../utils/routeconf'


class UserList extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        this.getUsers()
    }

    getUsers(){
        let config = { params:{}}

        Axios.get('/users', config)
            .then(res => {
                console.log(res)
                this.setState({users: res.data})
            })
            .catch( err =>{
                 console.log(err)
            })
    }
    approveAccount(id, u){
        let config = {params:{}}
        console.log(id) 
        console.log(u) 
        Axios.put('/users/' + id, u)
        .then(res =>{
            this.props.navigate('/users')
            window.location.reload(); 
        })
        .catch(err =>{
            alert("Failed!")
            console.log(err)
        })
    }
    
    renderUsers(){
        return this.state.users.map((u) => {
            return(
                <li class="list-group-item" key={u.id}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{u.name + ' ' + u.surname}</Card.Title>
                                <Card.Text>
                                    Grad: {u.city}, Ulica: {u.address}, Broj Telefona: {u.phoneNumber}, 
                                    Email: {u.email}
                                </Card.Text>
                            {u.approved === false ? <Button variant="primary"  onClick={()=> this.approveAccount(u.id, u)}>Approve</Button>: null}
                        </Card.Body>
                    </Card>
                </li> 
                )
        })
    }

    render(){
        return(
            <div class="container py-5">
                <div class="row text-center text-white mb-5">
                    <div class="col-lg-7 mx-auto">
                        <h1 class="display-4" style={{color: "black"}}>Accounts waiting for conformation</h1>
                    </div>
                </div>
                <div class="row">
                        <CardGroup>
                            {this.renderUsers()}
                            </CardGroup>
                </div>
            </div>
        )
    }
}
export default withNavigation(withParams(UserList));
