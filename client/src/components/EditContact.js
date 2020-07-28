import React from 'react'
import {connect} from 'react-redux'
import Form from './Form'
import {editContact} from '../actions/contactActions'

// Component that handles editing Contact using
// <Form /> component.
// When form is submitted, editContact action
// is fired with input contact info, then page is
// 'refreshed' using 'this.props.history.push('/')'

class EditContact extends React.Component {
    onSubmit = (contact) => {
        this.props.editContact(this.props.match.params.id, contact)
        this.props.history.push('/')
    }
    render(){
        return (
            <main role="main" className="inner cover text-light m-5 p-5">
                <div className="d-flex flex-column bg-dark p-2 w-50 justify-content-between">
                    <h3>Edit Contact</h3>
                    <Form contact={this.props.contact} onSubmit={this.onSubmit}/>
                </div>
            </main>
        )
    }
}

// finds Contact in state that matches dynamic URL parameter
const mapStateToProps = (state, props) => ({
    contact : state.contacts.find((item)=> item.id == props.match.params.id)
})
const mapDispatchToProps = (dispatch) => ({
    editContact : (id, contact) => dispatch(editContact(id, contact))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditContact)