import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Header from "../components/Header"
import Home from "../components/Home"
import Error from "../components/Error"
import Login from '../components/Login'
import SearchContact from "../components/SearchContact"
import { connect } from 'react-redux'
import { setContacts } from '../actions/contactActions'
import { _login } from '../actions/loginActions'
import EditContact from '../components/EditContact'
import AddContact from '../components/AddContact'
import Signup from '../components/Signup'

// controls routes on client-side
class AppRouter extends React.Component {
    componentDidMount(){
        // When component first mounts, checks for token in
        // localStorage. If it exists, '_login' action is
        // fired with token and username. Then 'setcontacts' action
        // fires.
        if(localStorage.jwt){
            this.props._login(localStorage.jwt, localStorage.username, undefined)
            this.props.setContacts()
        }
    }
    render(){
        return (
            <BrowserRouter>
                    <Header />
                    <Switch>
                        {/* Log In and Sign Up are accessible by anyone */}
                        <Route path="/login" component={Login} exact={true} />
                        <Route path="/signup" component={Signup} exact={true} />
                        {/* All other routes are only accessible after logging in */}
                        <PrivateRoute path="/" component={Home} exact={true} />
                        <PrivateRoute path="/show" component={SearchContact} exact={true} />
                        <PrivateRoute path="/edit/:id" component={EditContact} exact={true} />
                        <PrivateRoute path="/add" component={AddContact} exact={true} />
                        <PrivateRoute component={Error} />
                    </Switch>
            </BrowserRouter>
        )
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    // For private routes, token is checked for in localStorage.
    // If exists, component renders. If not, redirects to 'Log In'.
    return (
        <Route {...rest} render={(props) => {
            return (
            localStorage.jwt
            ? <Component {...props} />
            : <Redirect to='/login' />
        )}} />
    )
}

const mapStateToProps = (state) => ({
    login : state.login
})

const mapDispatchToProps = (dispatch) => ({
    _login : (token, username, error) => dispatch(_login(token, username, error)),
    setContacts : () => dispatch(setContacts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)