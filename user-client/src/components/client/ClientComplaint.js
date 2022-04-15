import React from 'react'

class ClientComplaint extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                 <div class="mb-3 mt-5">
                    <label for="exampleDataList" class="form-label text-white">Owner</label>
                    <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."/>
                    <datalist id="datalistOptions">
                        <option value="House 1"/>
                        <option value="Boat 1"/>
                        <option value="Instructor 1"/>
                    </datalist>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label text-white">Complaint</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                </div>
            </div>
           
        )
    }
}

export default ClientComplaint;