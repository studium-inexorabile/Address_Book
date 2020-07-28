import React from 'react'
import {connect} from 'react-redux'
import Form from './Form'
import {addContact} from '../actions/contactActions'

// Component that handles adding Contact using
// <Form /> component.
// When form is submitted, addContact action
// is fired with input contact info, then page is
// 'refreshed' using 'this.props.history.push('/')'

class AddContact extends React.Component {
    onSubmit = (contact) => {
        this.props.addContact(contact)
        this.props.history.push('/')
    }
    render(){
        return (
            <main role="main" className="inner cover text-light m-5 p-5">
                <div className="d-flex flex-column bg-dark p-2 mx-auto w-50 justify-content-between">
                    <h3>Add Contact</h3>
                    <Form onSubmit={this.onSubmit}/>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state, props) => ({
    contact : state.contacts.find((item)=> item.id === props.match.params.id)
})
const mapDispatchToProps = (dispatch) => ({
    addContact : (contact) => dispatch(addContact(contact))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)