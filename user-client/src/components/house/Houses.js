import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class Houses extends React.Component{

    constructor(props){
        super(props)

        this.state = {
             houses: []
        }
    }

    componentDidMount(){

         this.getHouses()

    }

    getHouses(){

        Axios.get('/houses')
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
                        <Button onClick={()=> this.goToAddHouse()}>Add new</Button>
                        <br></br>
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