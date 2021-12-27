import React from "react";
import Axios from '../../utils/Axios';
import {Row, Col, Button, Table, Form} from 'react-bootstrap'
import './../../houses.css';
import {withParams, withNavigation} from '../../utils/routeconf'

class Houses extends React.Component{

    constructor(props){
        super(props)

        // const search = {
        //     mestoOdrzavanja: "",
        //     formatId: -1
        // }

        this.state = {
            // takmicenja: [],
            // formati: [], //za pretragu
            // search: search,
            // dozvoljenaPrijava: true
        }
    }

    componentDidMount(){

        // this.getTakmicenja(0)
        // this.getFormati()
        // if(window.localStorage['prijava'] == 1){
        //     this.setState({dozvoljenaPrijava: false})
        // }
    }

    // getFormati(){
    //     Axios.get('/formati')
    //       .then(res =>{
    //         console.log(res)
    //         this.setState({formati: res.data})
    //       })
    //       .catch(err=>{
    //         console.log(err)
    //       })
    //   }

    // getTakmicenja(newPageNo){
    //     const config = {
    //         params : {
    //           pageNo: newPageNo
    //         }
    //       }
    //     Axios.get('/takmicenja', config)
    //         .then(res => {
    //             this.pageNo=newPageNo;
    //             this.totalPages = res.headers['total-pages'];
    //             console.log(res)
    //             this.setState({takmicenja: res.data})
    //         })
    //         .catch(err =>{
    //             console.log(err)
    //         })
    // }

    // goToDodaj(){
    //     this.props.navigate('/takmicenja/dodaj')
    // }


    // obrisi(id){
    //     Axios.delete('/takmicenja/' + id)
    //         .then(res=>{
    //             console.log(res.data)
    //             alert("Uspesno obrisano!")
    //             this.getTakmicenja(this.pageNo)
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             alert("Brisanje neuspesno!")
    //         })
    // }

    // goToPrijava(id){
    //     this.props.navigate('/takmicenja/prijava/' + id);
    // }

    // renderTakmicenja(){
    //     return this.state.takmicenja.map((t) =>{
    //         return(
    //             <tr key={t.id}>
    //                 <td>{t.naziv}</td>
    //                 <td>{t.mestoOdrzavanja}</td>
    //                 <td>{t.datumPocetka}</td>
    //                 <td>{t.datumZavrsetka}</td>
    //                 <td>{t.formatNaziv}</td>
    //                 <td><Button hidden={!this.state.dozvoljenaPrijava} onClick={()=> this.goToPrijava(t.id)}>Prijavi se</Button></td>
    //                 <td><Button variant="danger" onClick={() => this.obrisi(t.id) }>Obrisi</Button></td>
    //             </tr>
    //         )
    //     })
    // }

    // changeInputValue(e){
    //     const name = e.target.name
    //     const value = e.target.value
  
    //     let search = this.state.search
  
    //     search[name] = value
    //     this.setState({search: search})
    //     this.pretrazi()
    
    //   }

    // pretrazi(){
    //     let config = {
    //         params: {
    //             mestoOdrzavanja: this.state.search.mestoOdrzavanja,
    //             formatId: this.state.search.formatId
    
    //         }
    //     }
        
    //     Axios.get('/takmicenja', config)
    //         .then(res => {
    //             console.log(config)
    //             this.setState({takmicenja: res.data})
    //             console.log(res.data)
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //         })
    // }

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
            <ul class="list-group shadow">
                {/* renderHouse */}
                <li class="list-group-item">
                    <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                        <div class="media-body order-2 order-lg-1">
                            <h5 class="mt-0 font-weight-bold mb-2">Apple iPhone XR (Red, 128 GB)</h5>
                            <p class="font-italic text-muted mb-0 small">128 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 7MP Front Camera A12 Bionic Chip Processor</p>
                            <div class="d-flex align-items-center justify-content-between mt-1">
                                <h6 class="font-weight-bold my-2">$64,999</h6>
                                <ul class="list-inline small">
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                                </ul>
                            </div>
                        </div><img src="https://i.imgur.com/KFojDGa.jpg" alt="Generic placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2"/>
                    </div> 
                </li> 
                
            </ul>
        </div>
    </div>
</div>
)
    }
}

export default withNavigation(withParams(Houses));