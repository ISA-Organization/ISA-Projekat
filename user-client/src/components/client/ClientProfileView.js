import React from 'react'
import Axios from '../../utils/Axios'
import { withParams } from '../../utils/routeconf'

class ClientProfileView extends React.Component {

    constructor(props){
        super(props)

        let client = {
            id: 1,
            email: "",
            name: "",
            surname: "",
            address: "",
            city: "",
            phoneNumber: "",
            type: "",
            isDeleted: false,
            approved: true
        }
        this.state ={
            client: client

        }

    }
    componentDidMount(){
        this.getClient()
    }

    getClient(id){

        Axios.get('/users/getOne/'+ this.props.params.id)
            .then(res => {
                console.log(res.data)
                this.setState({client: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }
    render() {
        return(
            <div>
                <div class="container">
                    <div class="row gutters">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="account-settings">
                                <div class="user-profile">
                                    <div class="user-avatar">
                                        <img style={{width: "50%"}} src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"/>
                                    </div>
                                    <br></br>
                                    <h5 class="user-name">{this.state.client.name} {this.state.client.surname}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mb-2 text-primary">Personal Details</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <h6 for="fullName">Full Name:</h6>
                                        <label for="fullName">  {this.state.client.name} {this.state.client.surname}</label>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <h6 for="eMail">Email:</h6>
                                        <label for="fullName">{this.state.client.email}</label>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <h6 for="phone">Phone:</h6>
                                        <label for="fullName">{this.state.client.phoneNumber}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mt-3 mb-2 text-primary">Address</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <h6 for="Street">Street:</h6>
                                        <label for="fullName">{this.state.client.address}</label>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <h6 for="ciTy">City:</h6>
                                        <label for="fullName">{this.state.client.city}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withParams(ClientProfileView);