import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import MapContainer from "../maps/MapContainer";
import ImageUploader from "react-images-upload";

class AddHouse extends React.Component{

    constructor(props){
        super(props)
        this.onDrop = this.onDrop.bind(this);

        let house = {
            name: "",
            address: "",
            description: "",
            numberOfRooms: 0,
            numberOfBeds: 0,
            rules: "",
            price: 0,
            type: "HOUSE",
            houseOwnerId: 0, 
            latitude: 45.267136, 
            longitude: 19.833549,
            pictures: []
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
             house: house,
             user: user,
             pictures:[],
             i: 0
        }
    }

    componentDidMount(){
    }
    onDrop(pictureFiles, pictureDataURLs) {
            this.setState({
              pictures: this.state.pictures.concat(pictureFiles[pictureFiles.length -1])
    
            }, () => {
                console.log(this.state.pictures)
                this.setState({i : this.state.i + 1})
            });
            console.log(pictureFiles)
          }
    async addHouse(){
        await this.getUser()
        await this.fileArrayToBase64(this.state.pictures)
        let house = this.state.house
        house.houseOwnerId = this.state.user.id
        this.setState({house: house})

        Axios.post('/houses', this.state.house)
            .then(res => {
                alert("Successfully added!")
                this.props.navigate('/houses')
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }
    async fileArrayToBase64(images){
            for(let image of images){
                const base64 = await this.convertBase64(image)
                let realValue = base64.slice(23)
                this.state.house.pictures.push(realValue)
            }
    
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

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let house = this.state.house
        house[name] = value

        this.setState({house: house})
    }

    render(){
        return(
            <Row>
                
                <Col md={4}>
                    <h1 style={{color: "black"}}>Add new house</h1>
                    <br></br>
                    
                    <MapContainer lat={this.state.house.latitude} lng={this.state.house.longitude}></MapContainer>
                </Col>
                <Col md={4}>
                             <Form.Group>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Form.Label htmlFor="name">Name:</Form.Label>
                                <Form.Control name="name" placeholder="Enter house name" style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="address">Address:</Form.Label>
                                <Form.Control name="address"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                             
                                <br></br>
                                <Form.Label htmlFor="numberOfRooms">Number of rooms:</Form.Label>
                                <Form.Control  name="numberOfRooms"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="numberOfBeds">Number of beds:</Form.Label>
                                <Form.Control name="numberOfBeds"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                
                            </Form.Group>
                </Col>
                <Col md={4}>
                            <Form.Group>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Form.Label htmlFor="price">Price:</Form.Label>
                                <Form.Control name="price"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rules">Rules:</Form.Label>
                                <Form.Control as="textarea" name="rules"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" name="description"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                
                                <button type="button" class="btn btn-primary" style={{marginTop: "2%", marginLeft: "80%"}} onClick={()=>{ this.addHouse() }}>Add</button>
                            </Form.Group>
                </Col>
                        
                <Col md={12}>
                    <Form.Group>
                        <ImageUploader
                        withIcon={true}
                        buttonText="Choose images"
                        onChange={this.onDrop}
                        withPreview={true}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}/>
                    </Form.Group>
                </Col>     
            </Row>
        )
    }
}

export default withNavigation(withParams(AddHouse));