import React from 'react'
import {connect} from 'react-redux'
import { removeContact } from '../actions/contactActions'
import {Link} from 'react-router-dom'

// Component that holds individual Contacts.
// Clicking on 'name' of contact will lead to edit page
// for that contact.
// Clicking on 'remove' will fire 'removeContact' action.

const Contact = ({name, email, phone, id, ...props}) => (
        <div className="d-flex flex-column bg-dark p-2 justify-content-between">
            <div className="d-flex flex-row justify-content-between">
                <Link to={`/edit/${id}`}>
                    <h4>{name}</h4>
                </Link>
                <button className="btn bg-secondary" onClick={
                (e) => {
                    props.dispatch(removeContact({id}))
                }
                }>Remove</button>
                
            </div>
            <div className="d-flex flex-column">
                <h5 className="lead">{email}</h5>
                {
                    phone && <h5 className="lead">{phone}</h5>
                }

            </div>
        </div>
)

export default connect()(Contact)