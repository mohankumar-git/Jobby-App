import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {HiExternalLink} from 'react-icons/hi'
import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {apiStatusView: apiStatus.initial, jobDetails: '', similarJobs: []}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatusView: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      methods: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedJobDetails = [data.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: eachItem.title,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatusView: apiStatus.success,
      })
    } else {
      this.setState({apiStatusView: apiStatus.failure})
    }
  }

  renderSkills = skills =>
    skills.map(eachSkill => (
      <li className="skill-item">
        <img src={eachSkill.imageUrl} alt="skills" className="skill-icon" />
        <p className="skill-name">{eachSkill.name}</p>
      </li>
    ))

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobDetails[0]
    console.log(jobDetails)

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-details-container">
        <div className="job-details-content-container">
          <div className="job-header-container">
            <div className="logo-title-rating-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <BsFillStarFill className="rating-star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-card-center-container">
              <div className="company-job-type-loc">
                <div className="job-location-container">
                  <MdLocationOn className="location-employment-icon" />
                  <p className="location-employment">{location}</p>
                </div>
                <div className="job-employment-container">
                  <BsFillBriefcaseFill className="location-employment-icon" />
                  <p className="location-employment">{employmentType}</p>
                </div>
              </div>
              <p className="salary">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="job-description-container">
            <div className="company-website-container">
              <p className="description-title">Description</p>
              <a className="website-link" href={companyWebsiteUrl}>
                <button type="button" className="visit-btn">
                  Visit
                </button>
                <HiExternalLink className="visit-icon" />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="description-title">Skills</h1>
            <ul className="skills-list">{this.renderSkills(skills)}</ul>
          </div>
          <div className="life-at-company-container">
            <div className="life-at-company-blog">
              <h1 className="description-title">Life at Company</h1>
              <p className="job-description">{description}</p>
            </div>
            <img
              src={imageUrl}
              className="life-at-company-img"
              alt="life at company"
            />
          </div>
        </div>
      </div>
    )
  }

  renderApiView = () => {
    const {apiStatusView} = this.state

    switch (apiStatusView) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#f1f5f9" height="50" width="50" />{' '}
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="job-details-page">
          <div className="job-details-responsive-container">
            {this.renderApiView()}
          </div>
        </div>
      </>
    )
  }
}

export default JobDetails
