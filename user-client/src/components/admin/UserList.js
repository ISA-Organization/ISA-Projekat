import React from "react";
import '../../index.css';
import Axios from "../../utils/Axios";
import {Button, Card, CardGroup, Modal} from 'react-bootstrap';

import {withParams, withNavigation} from '../../utils/routeconf';
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
// function PopUpToggle(){
    
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
//         <>
//         <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//             <Modal.Title>Reason for declining</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//         </Modal></>
//     )
// }


// const UserList = () => {
//     const [users, setUsers] = useState([])
//     const [modal, setModal] = useState(false)

//     useEffect(() =>{
//         let config = { params:{}}

//         Axios.get('/users', config)
//             .then(res => {
//                 console.log(res)
//                 setUsers(res.data)
//             })
//             .catch( err =>{
//                  console.log(err)
//             })
//     }, [])

    

//     return( 
//         <div className="container py-5">
//         <div className="row text-center text-white mb-5">
//             <div className="col-lg-7 mx-auto">
//                 <h1 className="display-4" style={{ color: 'black' }}>
//                     Accounts waiting for conformation
//                 </h1>
//             </div>
//         </div>
//         <div className="row">
//             <CardGroup>
//                 {users &&
//                     users.map((user) => (
//                         <ListItem
//                             key={user.id}
//                             u={user}
//                             setModal={setModal}
//                             modal={modal}
//                         />
//                     ))}
//             </CardGroup>
//         </div>
//     </div>
//     )
// }

class UserList extends React.Component{
    
 

    constructor(props){
        super(props)
        this.state = {
            users: [],
            declined: false,
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
    togglePopUpButton(){
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
                            {u.approved === false ?
                            <div>
                            <Button variant="primary" class="mr-5" onClick={()=> this.approveAccount(u.id, u)}>Approve</Button>
                            <Button variant="danger" onClick={()=> this.togglePopUpButton()}>Decline</Button>
                            </div>
                            : null
                             } 

                           
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
