import React from 'react'
import Axios from '../../utils/Axios'

class HouseOwnerProfile extends React.Component {

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
        this.getProfile()
    }

    getProfile(){
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
                }
        Axios.get('/users/profile', config)
                .then(res => {
                    this.setState({user : res.data})
                })
                .catch(
                    err=>{
                        console.log(err)
                    }
                )
    }

  render() {
    return(
        <div className="bg">
            <h1 class="display-4" style={{color: "black", marginLeft: "22%"}}>House Owner Profile</h1>
        </div>
    )
  }
}

export default HouseOwnerProfile;