import React from 'react'
import {connect} from 'react-redux'
import Contact from './Contact'
import filterContacts from '../selectors/selectors'
import { sortByName, sortByEmail } from '../actions/filterActions'

// Component that renders Contacts.
// 'Sort by Name' and 'Sort by Email' buttons fire
// actions that modify 'filter' state. 
// Filtered Contacts are mapped through, and their 
// details are passed to <Contact /> component

const ContactList = (props) => (
    <div className="p-5">
        {/* If contacts belong to user, they are displayed. 
        If not, 'No contacts' is displayed. */}
        {props.contacts.length > 0 ? <div className="pb-2">
            <button className="btn bg-dark text-light mx-1" onClick={(e) => props.dispatch(sortByName())}>Sort By Name</button>
            <button className="btn bg-dark text-light mx-1" onClick={(e) => props.dispatch(sortByEmail())}>Sort By Email</button>
        </div>
        :
        <h2>No contacts.</h2> }
            {
                props.contacts.map((item) => 
                    ( 
                    <div key={item.id}><Contact {...item}/><br /></div> 
                    )
                )
            } 
        </div>  
)

// Pulls Contacts from 'contact' state, and uses
// 'filter' state to filter/sort them 
const mapStatetoProps = (state) => ({
    contacts: filterContacts(state.contacts, state.filters)
})

export default connect(mapStatetoProps)(ContactList)