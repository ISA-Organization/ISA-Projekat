import React from 'react'

import Modal from '../admin/modal'
import {Button} from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import Axios from '../../utils/Axios'

const ListItem = ({u, setModal, modal}) => {
    const approveAccount = (id, u) => {
        console.log('approve')

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
    // funkcija onClose parsuje setter setModal iz parent componente render users definisanu u setState na liniji 11
    const onClose = () => {
        setModal(false)
    }

    return (
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
                                     <Button variant="primary" class="mr-5" onClick={()=> approveAccount(u.id, u)}>Approve</Button>
                                     <Button variant="danger" onClick={()=> setModal(true)}>Decline</Button>
                                     </div>
                                     : null
                                      } 
        
                                   
                                 </Card.Body>
                             </Card>
                             {

                             }
                             <Modal modal={modal} onClose={onClose}/>
                         </li> 
    )
}

export default ListItem