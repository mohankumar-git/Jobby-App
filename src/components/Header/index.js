import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
        <ul className="mobile-nav-menu">
          <li className="mobile-nav-item">
            <Link to="/">
              <AiFillHome className="mobile-nav-icon" />
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/jobs">
              <BsFillBriefcaseFill className="mobile-nav-icon" />
            </Link>
          </li>
          <li className="mobile-nav-item">
            <button
              className="logout-mobile-btn "
              type="button"
              onClick={onClickLogout}
            >
              <FiLogOut className="mobile-nav-icon" />
            </button>
          </li>
        </ul>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
