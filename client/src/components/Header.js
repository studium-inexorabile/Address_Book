import React from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../actions/loginActions'

// Component that makes up header.
// If token exists in localStorage, header displays
// user links.
// If token doesn't exist, header displays 'Sign In'
// and 'Sign Up' links.

class Header extends React.Component {
    render(){
        return (
            this.props.login.token ?
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand lead text-light" href="#">Address Book</a>
                {/* Displays username when logged in. */}
                <p className="text-light my-auto font-italic">{this.props.login.username}</p>
                    <ul className="navbar-nav mr-0 d-flex flex-row">
                        <li className="nav-item mx-3">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to="/show">Search Contacts</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to="/add">Add a Contact</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            {/* Uses 'logout' action to log user out. */}
                            <NavLink to="" onClick={this.props.logout}>Logout</NavLink>
                        </li>
                    </ul>
            </nav> 
            :
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand lead text-light" href="#">Address Book</a>
                    <ul className="navbar-nav mr-0 d-flex flex-row">
                        <li className="nav-item mx-3">
                            <NavLink to="/login">Log In</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to="/signup">Sign Up</NavLink>
                        </li>
                    </ul>
            </nav>
        )
    }
}  

const mapStateToProps = (state) => ({
    login : state.login
})
const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)