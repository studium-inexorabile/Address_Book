import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../actions/loginActions'

// Component for 'Log In'. 
// If token is found in state, redirects to <Home /> component.
// If not, displays form for sign in.

class Login extends React.Component {
    render(){
        return (
            this.props.creds.token ?
            <Redirect to='/' /> :
            <main role="main" className="inner cover text-light m-5 p-5 text-center">
                <div className="d-flex flex-column bg-dark p-2 mx-auto my-5 py-5 w-50 justify-content-between">
                    <h3>Log In</h3>
                    <form onSubmit={(e) => {
                        // takes inputted data and passes it to 'login' action
                        // then 'refreshes' using 'this.props.history.push('/')'
                        e.preventDefault()
                        const username = e.target.elements.username.value.trim()
                        const password = e.target.elements.password.value.trim()
                        this.props.login(username, password)
                        this.props.history.push('/')
                    }}>
                        <label htmlFor="username">Username</label><br/>
                        <input type="text" id="username"/><br/>
                        <label htmlFor="password">Password</label><br/>
                        <input type="password" id="password"/><br/> <br/>
                        <button className="btn bg-secondary text-light">Submit</button>
                        <br/> <br/>
                        {
                            // if error is found, displays error
                            this.props.creds.error &&
                            <p id="error" className="p-0 m-0">{this.props.creds.error}</p>
                        }
                    </form>
                </div>
            </main>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    login : (username, password) => dispatch(login(username, password))
})

const mapStatetoProps = (state) => ({
    creds: state.login
})

export default connect(mapStatetoProps, mapDispatchToProps)(Login)