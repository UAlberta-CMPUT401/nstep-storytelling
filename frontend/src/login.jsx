import React from 'react'

const AdminLoginPage = (props) => {
  return (
    <>
      <div className="admin-login-page-container">
        <header data-role="Header" className="admin-login-page-header">
          <img
            alt="logo"
            src="frontend\assets\NSTEP_Horizontal-Logo_Color_WithTagline.png"
            className="admin-login-page-image"
          />
          <div className="admin-login-page-container1">
            <div className="admin-login-page-icon-group">
              <div
                data-type="BurgerMenu"
                className="admin-login-page-burger-menu"
              >
                <svg viewBox="0 0 1024 1024" className="admin-login-page-icon">
                  <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="admin-login-page-text">
            <span>Tell your story</span>
            <br></br>
          </h1>
          <div data-type="MobileMenu" className="admin-login-page-mobile-menu">
            <nav className="admin-login-page-nav">
              <div className="admin-login-page-container2">
                <img
                  alt="image"
                  src="https://presentation-website-assets.teleporthq.io/logos/logo.png"
                  className="admin-login-page-image1"
                />
                <div
                  data-type="CloseMobileMenu"
                  className="admin-login-page-close-mobile-menu"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    className="admin-login-page-icon02"
                  >
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
            </nav>
            <div>
              <svg
                viewBox="0 0 950.8571428571428 1024"
                className="admin-login-page-icon04"
              >
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="admin-login-page-icon06"
              >
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="admin-login-page-icon08"
              >
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
        <div className="admin-login-page-container3">
          <span className="admin-login-page-text03">
            <span>Admin Login</span>
            <br></br>
          </span>
        </div>
        <div className="admin-login-page-container4">
          <span className="admin-login-page-text06">
            <span>Email</span>
            <br></br>
          </span>
          <input
            type="text"
            placeholder="placeholder"
            className="admin-login-page-textinput input"
          />
        </div>
        <div className="admin-login-page-container5">
          <span className="admin-login-page-text09">
            <span>Password</span>
            <br></br>
          </span>
          <input
            type="text"
            placeholder="placeholder"
            className="admin-login-page-textinput1 input"
          />
          <a
            href="https://example.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span>Forgot password?</span>
            <br></br>
          </a>
        </div>
        <div className="admin-login-page-container6">
          <button className="admin-login-page-button button">Login</button>
        </div>
      </div>
      <style jsx>
        {`
          .admin-login-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .admin-login-page-header {
            width: 100%;
            display: flex;
            max-width: var(--dl-size-size-maxwidth);
            align-items: center;
            padding-top: var(--dl-space-space-twounits);
            border-color: var(--dl-color-gray-black);
            border-width: 2px;
            padding-left: var(--dl-space-space-threeunits);
            padding-right: var(--dl-space-space-threeunits);
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: space-between;
          }
          .admin-login-page-image {
            height: 2rem;
          }
          .admin-login-page-container1 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: space-between;
            flex-direction: column;
          }
          .admin-login-page-icon-group {
            display: flex;
          }
          .admin-login-page-burger-menu {
            display: none;
          }
          .admin-login-page-icon {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            display: flex;
          }
          .admin-login-page-text {
            font-family: Arial;
          }
          .admin-login-page-mobile-menu {
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100vh;
            display: none;
            padding: 32px;
            z-index: 100;
            position: absolute;
            flex-direction: column;
            justify-content: space-between;
            background-color: #fff;
          }
          .admin-login-page-nav {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .admin-login-page-container2 {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: var(--dl-space-space-threeunits);
            justify-content: space-between;
          }
          .admin-login-page-image1 {
            height: 2rem;
          }
          .admin-login-page-close-mobile-menu {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .admin-login-page-icon02 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .admin-login-page-icon04 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .admin-login-page-icon06 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .admin-login-page-icon08 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .admin-login-page-container3 {
            flex: 0 0 auto;
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .admin-login-page-text03 {
            font-size: 72px;
          }
          .admin-login-page-container4 {
            width: 100%;
            height: 161px;
            display: flex;
            align-items: flex-start;
            padding-left: var(--dl-space-space-unit);
            padding-right: var(--dl-space-space-unit);
            flex-direction: column;
          }
          .admin-login-page-text06 {
            font-size: 36px;
          }
          .admin-login-page-textinput {
            height: 56px;
            align-self: stretch;
          }
          .admin-login-page-container5 {
            width: 100%;
            height: 161px;
            display: flex;
            align-items: flex-start;
            padding-left: var(--dl-space-space-unit);
            padding-right: var(--dl-space-space-unit);
            flex-direction: column;
          }
          .admin-login-page-text09 {
            font-size: 36px;
          }
          .admin-login-page-textinput1 {
            height: 62px;
            align-self: stretch;
          }
          .admin-login-page-container6 {
            flex: 0 0 auto;
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .admin-login-page-button {
            align-self: center;
          }
          @media (max-width: 1200px) {
            .admin-login-page-text {
              font-family: Arial;
            }
            .admin-login-page-container3 {
              height: 240px;
              padding-top: 54px;
              padding-bottom: 59px;
            }
            .admin-login-page-text03 {
              font-size: 68px;
            }
            .admin-login-page-container4 {
              width: 100%;
              height: 103px;
            }
            .admin-login-page-textinput {
              height: 50%;
              align-self: stretch;
              padding-right: 0.5cm;
            }
            .admin-login-page-container5 {
              width: 100%;
              height: 103px;
            }
            .admin-login-page-textinput1 {
              align-self: stretch;
              padding-right: 0.5cm;
            }
          }
          @media (max-width: 991px) {
            .admin-login-page-textinput {
              height: 50%;
            }
          }
          @media (max-width: 767px) {
            .admin-login-page-header {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .admin-login-page-burger-menu {
              display: flex;
              align-items: center;
              margin-right: 16px;
              justify-content: center;
            }
            .admin-login-page-container3 {
              height: 222px;
            }
            .admin-login-page-textinput {
              height: 50%;
            }
          }
          @media (max-width: 479px) {
            .admin-login-page-header {
              padding: var(--dl-space-space-unit);
            }
            .admin-login-page-mobile-menu {
              padding: 16px;
            }
            .admin-login-page-textinput {
              height: 50%;
            }
          }
        `}
      </style>
    </>
  )
}

export default AdminLoginPage
