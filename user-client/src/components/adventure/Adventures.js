import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class Adventure extends React.Component{

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
             adventures: [],
             search: search,
             user: user
        }
    }

   async componentDidMount(){
        console.log('Uso u avanture')
        await this.getUser()
        this.getAdventures()

    }

    getAdventures(){

        let config = { params: {
          } }
      
    
        if (this.state.search.name != "") {
            config.params.name = this.state.search.name;
          }
      
          if (this.state.search.price != -1) {
            config.params.price = this.state.search.price;
          }
          config.params.ownerId = this.state.user.id;

        Axios.get('/adventures', config)
            .then(res => {
                console.log(res.data)
                this.setState({adventures: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
            
    }
    setToImage(image){
      return "data:image/png;base64," + image;
    }

    async getUser(){
        console.log('Uzimam isntruktora')
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
        }
        try{
            console.log('SALJEM ZAHTEV')
			let result = await Axios.get("/users/profile", config);
            console.log(result)
			this.setState({
				user: result.data
			});
            console.log(this.state.user)
		  }
		  catch (error){
			console.log(error);
		  }
    }

    goToAdventure(id){
        console.log(id)
        this.props.navigate('/adventures/'+ id)
        window.location.reload()
    }

    goToAddAdventure(){
        this.props.navigate('/adventures/add')
    }
    decodeFileBase64(base64String){
        return decodeURIComponent(
            atob(base64String)
            .split("")
            .map(function (c){
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
            )
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value
  
        let search = this.state.search
  
        search[name] = value
        this.setState({search: search})
        console.log(this.state.search)
        this.getAdventures()
    }
    goToReservations(entityId){
        this.props.navigate('/reservationsForOwner/'+ entityId)
    }
    goToFreeTerms(entityId){
        this.props.navigate('/periodsForOwner/'+ entityId)
    }
    
    goToRangeSelect(){
        this.props.navigate('/earningsReport')
    }

    goToAttendanceReports(){
        this.props.navigate('/attendanceReport/'+ this.state.user.id)
    }
    convertBase64(file){
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = ()=>{
                resolve(fileReader.result);
            }

            fileReader.onerror = (err)=>{
                reject(err);
            }
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
                    </div><img src={this.setToImage(a.pictures[0])} alt="Image placeholder" width="300" class="ml-lg-5 order-1 order-lg-2"/>
                </div> 
                <button style={{marginLeft: "45%"}} type="button" class="btn btn-outline-primary" onClick={() => this.goToReservations(a.id)}>Show reservations</button>
                <button style={{marginLeft: "5%"}} type="button" class="btn btn-outline-primary" onClick={() => this.goToFreeTerms(a.id)}>Show free terms</button>
            </li> 
            )
        })
    }


    render(){
        return(
            <div class="container py-5">
                <div class="row text-center text-white mb-5">
                    <div class="col-lg-7 mx-auto">
                        <h1 class="display-4" style={{color: "black"}}>Your adventures:</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div className="form-inline">
                            <Form.Label style={{marginRight: "2%"}}>Name:</Form.Label>
                            <Form.Control name="name" placeholder="Search by name" style={{width: "25%", marginRight: "2%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                            <Form.Label style={{marginRight: "2%"}}>Max price:</Form.Label>
                            <Form.Control name="price" placeholder="Search by price" style={{width: "25%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                            <Button onClick={()=> this.goToAddAdventure()} style={{marginLeft: "7%"}}>Add new</Button>
                        </div>
                        <br></br>
                        <button style={{marginLeft: "47%"}} type="button" class="btn btn-outline-secondary" onClick={()=> this.goToRangeSelect()}>Earnings report</button>
                        <button style={{marginLeft: "5%"}} type="button" class="btn btn-outline-secondary" onClick={()=> this.goToAttendanceReports()}>Attendence report</button>
                        <br></br>
                        <ul class="list-group shadow">
                            {this.renderAdventures()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withNavigation(withParams(Adventure));