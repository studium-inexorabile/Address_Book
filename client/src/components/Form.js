import React from 'react'
import {connect} from 'react-redux'

// Form component that is used in <AddContact /> and
// <EditContact /> components. 

class Form extends React.Component {
    // Internal state keeps track of inputted data and
    // errors.
    state = {
        nError: undefined,
        eError: undefined,
        name: this.props.contact ? this.props.contact.name : "",
        email: this.props.contact ? this.props.contact.email : "",
        phone: this.props.contact ? this.props.contact.phone : ""
    }
    // validates data, then passes data to 'onSubmit' function
    // passed from parent to submit that data.
    validate = (e) => {
        e.preventDefault()
        const name = e.target.elements.name.value.trim()
        const email = e.target.elements.email.value.trim()
        if(!name){
            this.setState({nError: 'Please enter a valid name'})
        }else if(!email){
            this.setState({eError: 'Please enter a valid email'})
        }else{
            this.props.onSubmit({name: this.state.name, email: this.state.email, phone: this.state.phone})
            e.target.elements.name.value = ""
            e.target.elements.phone.value = ""
            e.target.elements.email.value = ""
        }
    }
    render(){
        return(
            <form onSubmit={this.validate} className="mx-auto">

                <label htmlFor="name" className="text-center">Name</label>
                <input className="w-100" type="text" name="name" value={this.state.name} onChange={(e)=>{
                    this.setState({name: e.target.value})
                }}/>

                {this.state.nError && <p>{this.state.nError}</p>}

                <br/>

                <label htmlFor="email">Email</label>
                <input className="w-100" type="email" name="email" value={this.state.email} onChange={(e)=>{
                    this.setState({email: e.target.value})
                }}/>

                {this.state.eError && <p>{this.state.eError}</p>}

                <br/>
                
                <label htmlFor="phone">Phone</label>
                <input className="w-100" type="text" name="phone" value={this.state.phone} onChange={(e)=>{
                    this.setState({phone: e.target.value})
                }}/>
                
                <br/>
                
                <button className="btn bg-secondary mt-3 float-right text-light">Submit</button>
            </form>
        )
    }
}


export default connect()(Form)