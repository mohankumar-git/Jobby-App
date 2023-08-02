import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const logoImageUrl = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

class LoginPage extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state

    const userDetails = {username: usernameInput, password: passwordInput}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      //   console.log(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
      //   console.log(data.error_msg)
    }
  }

  getUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  getPasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  renderUsernameInput = () => {
    const {usernameInput} = this.state

    return (
      <div className="input-container">
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          className="input"
          value={usernameInput}
          onChange={this.getUsernameInput}
          placeholder="Username"
          id="username"
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {passwordInput} = this.state

    return (
      <div className="input-container">
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          type="password"
          className="input"
          value={passwordInput}
          onChange={this.getPasswordInput}
          placeholder="Password"
          id="password"
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <div className="login-form-container">
          <img src={logoImageUrl} alt="website logo" className="website-logo" />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            {this.renderUsernameInput()}
            {this.renderPasswordInput()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
