import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-card-responsive-container">
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
            <p className="description-title">Description</p>
            <p className="job-description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
