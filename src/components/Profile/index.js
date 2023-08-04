import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileDetails: {}, apiStatusView: apiStatus.initial}

  componentDidMount() {
    this.getProfile()
  }

  retryApi = () => {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatusView: apiStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedData = data.profile_details
      //   console.log(fetchedData)
      const updatedData = {
        name: fetchedData.name,
        profileImageUrl: fetchedData.profile_image_url,
        shortBio: fetchedData.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatusView: apiStatus.success,
      })
    } else {
      this.setState({apiStatusView: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <div className="profile-details-container">
          <img src={profileImageUrl} className="profile-img" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <button onClick={this.retryApi} type="button" className="retry-button">
      Retry
    </button>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />{' '}
    </div>
  )

  renderApiView = () => {
    const {apiStatusView} = this.state

    switch (apiStatusView) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="profile-component">{this.renderApiView()}</div>
        <hr className="horizontal-line" />
      </>
    )
  }
}

export default Profile
