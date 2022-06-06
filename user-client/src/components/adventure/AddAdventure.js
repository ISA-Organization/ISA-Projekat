import React from "react";
import Axios from '../../utils/Axios';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import MapContainer from "../maps/MapContainer";
import ImageUploader from "react-images-upload";

class AddAdventure extends React.Component{

    constructor(props){
        super(props)
        this.onDrop = this.onDrop.bind(this);

        let adventure = {
            name: "",
            address: "",
            description: "",
            rules: "",
            price: 0,
            type: "ADVENTURE",
            maxNumberOfPeople: 0,
            adventureOwnerId: 0, 
            fishingEquipment: '',
            cancellationPolicy: '',
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
             adventure: adventure,
             user: user,
             pictures:[],
             i: 0

        }
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
    componentDidMount(){
    }

    async addAdventure(){
        await this.getUser()
        await this.fileArrayToBase64(this.state.pictures)
        console.log(this.state.adventure)
        let adventure = this.state.adventure
        adventure.instructorId = this.state.user.id
        this.setState({adventure: adventure})
        console.log(this.state.adventure)
        Axios.post('/adventures', this.state.adventure)
            .then(res => {
                alert("Successfully added!")
                //this.props.navigate('/adventures')
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
            this.state.adventure.pictures.push(realValue)
        }

    }
    async uploadImage(e){
        const file = e.target.files[0]
        const base64 = await this.convertBase64(file)
        console.log(base64)
        let adventure = this.state.adventure
        adventure.picture = base64.slice(23)
        this.setState({adventure: adventure})
        console.log(this.state.adventure)

        console.log(this.decodeFileBase64(base64.substring(base64.indexOf(",") + 1)))
    }
    decodeFileBase64(base64String){
        //console.log(base64String)
        return base64String.slice(23);
        return decodeURIComponent(
            atob(base64String)
            .split("")
            .map(function (c){
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
            )
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

        let adventure = this.state.adventure
        adventure[name] = value

        this.setState({adventure: adventure})
        console.log(this.state.adventure)
    }

    render(){
        return(
            <Row>
                
                <Col md={4}>
                    <h1 style={{color: "black"}}>Add new adventure</h1>
                    <br></br>
               
                    <MapContainer lat={this.state.adventure.latitude} lng={this.state.adventure.longitude}></MapContainer>
                </Col>
                <Col md={4}>
                             <Form.Group>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Form.Label htmlFor="name">Name:</Form.Label>
                                <Form.Control name="name" placeholder="Enter adventure name" style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="address">Address:</Form.Label>
                                <Form.Control name="address"  placeholder="Enter adventure address" style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>

                                <Form.Label htmlFor="cancellationPolicy">Cancellation policy:</Form.Label>
                                <Form.Control as="textarea" name="cancellationPolicy" placeholder="Enter cancellation policy"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="fishingEquipment">Fishing Equipment:</Form.Label>
                                <Form.Control as="textarea" name="fishingEquipment" placeholder="Enter fishing equipment"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                
                            </Form.Group>
                </Col>
                <Col md={4}>
                            <Form.Group>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Form.Label htmlFor="maxNumberOfPeople">Max number of pepole:</Form.Label>
                                <Form.Control name="maxNumberOfPeople" placeholder="Max num of people"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="price">Price:</Form.Label>
                                <Form.Control name="price" placeholder="Enter adventure price"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rules">Rules:</Form.Label>
                                <Form.Control as="textarea" name="rules" placeholder="Enter adventure rules"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Enter adventure description"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                
                                <button type="button" class="btn btn-primary" style={{marginTop: "2%", marginLeft: "80%"}} onClick={()=>{ this.addAdventure() }}>Add</button>
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

export default withNavigation(withParams(AddAdventure));