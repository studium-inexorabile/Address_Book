import React from 'react'
import ContactList from './ContactList'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

// Base component for most of application.
// If token exists in state, <ContactList />
// is rendered. If not, redirects to <Login /> .

class Home extends React.Component {
  render() {
    return (
      this.props.login.token ?
      <main role="main" className="inner cover text-light m-5 d-flex justify-content-center p-5">
            <div className="text-light">
              <ContactList />
            </div>
      </main>
      :
      <Redirect to='/login' />
    )
  }
}

const mapStateToProps = (state) => ({
  login : state.login
})

export default connect(mapStateToProps)(Home)