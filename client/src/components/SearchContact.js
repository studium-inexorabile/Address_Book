import React from 'react'
import {connect} from 'react-redux'
import ContactList from './ContactList'
import { setNameFilter, setEmailFilter, setPhoneFilter } from '../actions/filterActions'

// Component that modifies 'filter' state.
// Inputs control filter state values for name, email, and phone.
// Updates 'filter' state every time input changes.
// Renders <ContactList /> component.

const SearchContact = (props) => (
    <main role="main" className="inner cover text-light m-5 d-flex justify-content-center p-5">
        <div className="text-light">
            <form onSubmit={(e) => {
                e.preventDefault()
                }}>
                <input type="text" name="name" placeholder="Name Filter" onChange={(e) => {
                e.preventDefault()
                const name = e.target.value.trim()
                props.dispatch(setNameFilter(name))
                }}/>
                <input type="text" name="email" placeholder="Email Filter" onChange={(e) => {
                e.preventDefault()
                const email = e.target.value.trim()
                props.dispatch(setEmailFilter(email))
                }}/>
                <input type="text" name="phone" placeholder="Phone Filter" onChange={(e) => {
                e.preventDefault()
                const phone = e.target.value.trim()
                props.dispatch(setPhoneFilter(phone))
                }}/>
            </form>
            <ContactList />
        </div>
    </main>
)

export default connect()(SearchContact)