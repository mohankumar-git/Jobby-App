import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import FilterGroups from '../FilterGroups'
import JobCard from '../JobCard'
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

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInput = () => {
    this.getJobsLists()
    this.setState({searchInput: ''})
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.getJobsLists()
      this.setState({searchInput: ''})
    }
  }

  changeActiveEmploymentType = id => {
    const {activeEmploymentTypes} = this.state
    const activeEmploymentList = activeEmploymentTypes.filter(
      eachItem => eachItem === id,
    )
    const checkActiveEmploymentList = activeEmploymentList.length === 0

    if (checkActiveEmploymentList) {
      this.setState(
        prevState => ({
          activeEmploymentTypes: [...prevState.activeEmploymentTypes, id],
        }),
        this.getJobsLists,
      )
    } else {
      const filteredData = activeEmploymentTypes.filter(
        eachItem => eachItem !== id,
      )
      this.setState({activeEmploymentTypes: filteredData}, this.getJobsLists)
    }
  }

  changeActiveSalaryRange = id => {
    this.setState({activeSalaryRange: id}, this.getJobsLists)
  }

  retryApi = () => {
    this.getJobsLists()
  }

  getJobsLists = async () => {
    this.setState({apiStatusView: apiStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentTypes, activeSalaryRange, searchInput} = this.state

    const employmentTypes = activeEmploymentTypes.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    console.log(apiUrl)
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

  renderJobsListView = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state

    return (
      <>
        {jobsList.length !== 0
          ? this.renderJobsListView()
          : this.renderNoJobsView()}
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#f1f5f9" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page yoy are looking for.
      </p>
      <button onClick={this.retryApi} className="retry-button" type="button">
        Retry
      </button>
    </div>
  )

  renderApiView = () => {
    const {apiStatusView} = this.state

    switch (apiStatusView) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentTypes, activeSalaryRange, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <div className="jobs-route-responsive-container">
            <div className="jobs-filters-container">
              <div className="search-container-mobile-view">
                <input
                  type="search"
                  className="search-input"
                  onChange={this.changeSearchInput}
                  value={searchInput}
                  placeholder="Search"
                  onKeyDown={this.onEnterSearch}
                />
                <button
                  className="search-btn"
                  type="button"
                  onClick={this.onClickSearchInput}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <Profile />
              <FilterGroups
                activeEmploymentTypes={activeEmploymentTypes}
                activeSalaryRange={activeSalaryRange}
                changeActiveSalaryRange={this.changeActiveSalaryRange}
                changeActiveEmploymentType={this.changeActiveEmploymentType}
              />
            </div>
            <div className="jobs-list-container">
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  onChange={this.changeSearchInput}
                  value={searchInput}
                  placeholder="Search"
                  onKeyDown={this.onEnterSearch}
                />
                <button
                  className="search-btn"
                  type="button"
                  onClick={this.onClickSearchInput}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderApiView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
