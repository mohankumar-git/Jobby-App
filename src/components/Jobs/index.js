import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatusView: apiStatus.initial,
    jobsList: [],
    activeEmploymentTypes: [],
    activeSalaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsLists()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  onClickSearchInput = () => {
    this.getProducts()
  }

  getJobsLists = async () => {
    this.setState({apiStatusView: apiStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentTypes, activeSalaryRange, searchInput} = this.state

    const employmentTypes = activeEmploymentTypes.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))
      this.setState({jobsList: updatedData, apiStatusView: apiStatus.success})
      console.log(updatedData)
    } else {
      this.setState({apiStatusView: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state

    return <h1>Mohan</h1>
  }

  renderApiView = () => {
    const {apiStatusView} = this.state

    switch (apiStatusView) {
      case apiStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <div className="jobs-route-responsive-container">
            <div className="jobs-filters-container">
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  onChange={this.changeSearchInput}
                  placeholder="Search"
                />
                <button className="search-btn" type="button">
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <Profile />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
