import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class Houses extends React.Component{

    constructor(props){
        super(props)

        let search = {
            name: "",
            price: -1
        }

        this.state = {
             houses: [],
             search: search
        }
    }

    componentDidMount(){

         this.getHouses()

    }

    getHouses(){

        let config = { params: {
          } }
      
    
        if (this.state.search.name != "") {
            config.params.name = this.state.search.name;
          }
      
          if (this.state.search.price != -1) {
            config.params.price = this.state.search.price;
          }
      

        Axios.get('/houses', config)
            .then(res => {
                console.log(res)
                this.setState({houses: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }

    goToHouse(id){
        this.props.navigate('/houses/'+ id)
    }

    goToAddHouse(){
        this.props.navigate('/houses/add')
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value
  
        let search = this.state.search
  
        search[name] = value
        this.setState({search: search})
        console.log(this.state.search)
        this.getHouses()
    }

    renderHouses(){
        return this.state.houses.map((h) =>{
            return(
                <li class="list-group-item" key={h.id}>
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2" style={{cursor:"pointer"}} onClick={()=> this.goToHouse(h.id)}>{h.name}</h5>
                        <p class="font-italic text-muted mb-0 small">{h.description}</p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                            <h6 class="font-weight-bold my-2">${h.price}</h6>
                            <ul class="list-inline small">
                                <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                            </ul>
                        </div>
                    </div><img src={require('../../images/homePage.jpg')} alt="Image placeholder" width="300" class="ml-lg-5 order-1 order-lg-2"/>
                </div> 
            </li> 
            )
        })
    }


    render(){
        return(
            <div class="container py-5">
                <div class="row text-center text-white mb-5">
                    <div class="col-lg-7 mx-auto">
                        <h1 class="display-4" style={{color: "black"}}>Your houses</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <Button onClick={()=> this.goToAddHouse()} style={{marginLeft: "85%"}}>Add new</Button>
                        <div className="form-inline">
                            <Form.Label style={{marginRight: "1%"}}>Name:</Form.Label>
                            <Form.Control name="name" placeholder="Search by name" style={{width: "25%", marginRight: "1%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                            <Form.Label style={{marginRight: "1%"}}>Max price:</Form.Label>
                            <Form.Control name="price" placeholder="Search by price" style={{width: "25%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                        </div>
                        <br></br>
                        <ul class="list-group shadow">
                            {this.renderHouses()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withNavigation(withParams(Houses));