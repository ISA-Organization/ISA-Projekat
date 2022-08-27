import React from 'react'
import Axios from '../../utils/Axios'
import {Button, Form} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class ClientEntityView extends React.Component{
    constructor(props){
        super(props)

        let search = {
            name: "",
            price: -1
        }

        let user = {
            id: 0,
            address: '',
             city: '',
             email: '',
             name: '',
             phoneNumber:'',
             surname:'',
             approved : false,
             type: ''
        }

        this.state = {
             houses: [],
             boats: [],
             adventures: [],
             search: search,
             user: user
        }
    }

    async componentDidMount(){

        await this.getUser()
        this.getHouses()
        this.getBoats()
        this.getAdventures()

    }
    async getAdventures(){
        let config = { params: {
        } }
    
  
      if (this.state.search.name != "") {
          config.params.name = this.state.search.name;
        }
    
        if (this.state.search.price != -1) {
          config.params.price = this.state.search.price;
        }
        config.params.ownerId = null;

      Axios.get('/adventures', config)
          .then(res => {
              this.setState({adventures: res.data})
              console.log(this.state.adventures)
          })
          .catch(err =>{
              console.log(err)
          })
    }
    async getBoats(){
        let config = { params: {
        } }
    
  
      if (this.state.search.name != "") {
          config.params.name = this.state.search.name;
        }
    
        if (this.state.search.price != -1) {
          config.params.price = this.state.search.price;
        }
        config.params.ownerId = null;

      Axios.get('/boats', config)
          .then(res => {
              this.setState({boats: res.data})
              console.log(this.state.boats)
          })
          .catch(err =>{
              console.log(err)
          })
    }
    async getUser(){
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
        }
        try{
			let result = await Axios.get("/users/profile", config);
			this.setState({
				user: result.data
			});
		  }
		  catch (error){
			console.log(error);
		  }
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
          config.params.ownerId = null;

        Axios.get('/houses', config)
            .then(res => {
                this.setState({houses: res.data})
                console.log(this.state.houses)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    goToHouse(id){
        this.props.navigate('/houses/housetorent/' + id)
        window.location.reload()
    }
    goToBoat(id){
        this.props.navigate('/boats/boattorent/' + id)
        window.location.reload()

    }
    goToAdventure(id){
        this.props.navigate('/adventures/adventuretorent/' + id)
        window.location.reload()
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value
  
        let search = this.state.search
  
        search[name] = value
        this.setState({search: search})
        console.log(this.state.search)
        this.getHouses()
        this.getBoats()
        this.getAdventures()
    }
    renderBoats(){
        return this.state.boats.map((b) =>{
            return(
                <li class="list-group-item" key={b.id}>
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2" style={{cursor:"pointer"}}><a onClick={()=> this.goToBoat(b.id)}>{b.name}</a></h5>
                        <p class="font-italic text-muted mb-0 small">{b.description}</p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                            <h6 class="font-weight-bold my-2">${b.price}</h6>
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
    
    renderHouses(){
        return this.state.houses.map((h) =>{
            return(
                <li class="list-group-item" key={h.id}>
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2" style={{cursor:"pointer"}}><a onClick={()=> this.goToHouse(h.id)}>{h.name}</a></h5>
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
    renderAdventures(){
        return this.state.adventures.map((a) =>{
            return(
                <li class="list-group-item" key={a.id}>
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2" style={{cursor:"pointer"}}><a onClick={()=> this.goToAdventure(a.id)}>{a.name}</a></h5>
                        <p class="font-italic text-muted mb-0 small">{a.description}</p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                            <h6 class="font-weight-bold my-2">${a.price}</h6>
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
                        <h1 class="display-4" style={{color: "black"}}>Available entities</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div className="form-inline">
                            <Form.Label style={{marginRight: "2%"}}>Name:</Form.Label>
                            <Form.Control name="name" placeholder="Search by name" style={{width: "25%", marginRight: "2%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                            <Form.Label style={{marginRight: "2%"}}>Max price:</Form.Label>
                            <Form.Control name="price" placeholder="Search by price" style={{width: "25%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                        </div>
                        <br></br>
                        <div><h5>Houses:</h5></div>
                        <ul class="list-group shadow">
                            {this.renderHouses()}
                        </ul>
                        <div><h5>Boats:</h5></div>
                        <ul class="list-group shadow">
                            {this.renderBoats()}
                        </ul>
                        <div><h5>Adventures:</h5></div>
                        <ul class="list-group shadow">
                            {this.renderAdventures()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withNavigation(withParams(ClientEntityView));