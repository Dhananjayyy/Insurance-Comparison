import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import HomePageMain from "./HomePage";
import Support from "./Support";
import LoginForm from "../LoginForm";
import Registration from "../RegistrationForm";
import Insurance from "./Insurance";
import InsuranceProviders from "./InsuranceProviders";

export default function MainHomePage() {
  const [selectedLink, setSelectedLink] = useState(null);
  const [loginKey, setLoginKey] = useState(0)
  
  useEffect(() => {
    console.log("home rendered")
    setSelectedLink('Home');
  }, []);

  const renderComponent = () => {
    switch (selectedLink) {
      case "Home":
        return <HomePageMain/>
      case "Insurance":
        return <Insurance />;
      case "InsuranceProviders":
        return <InsuranceProviders />;
      case "Support":
        return <Support />;
      case "Login":
        return <LoginForm key={loginKey} state={{ showForgotPasswordComponent: true }} />;
      case "Register":
        return <Registration />;
      default:
        
        return <HomePageMain />;
    }
  };
  
  const handleLoginClick = () => {
    setSelectedLink("Login");
    setLoginKey((prevKey) => prevKey === 0 ? 1 : 0);
  };

  return (
    <div className="container  mt-3">
      {/* login state: {mystate.loggedIn.toString()} */}
      <ul role="tablist" className="nav nav-pills danger navbar border rounded navbar-nav  justify-content-center mb-5">
        <div className="row w-100">
          {/* Home Link */}
          <div className="col text-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${selectedLink === "Home" ? 'active text-white bg-dark' : ''}`}
                onClick={() => {
                  setSelectedLink("Home");
                }}
              >
                Home
              </Link>
            </li>
          </div>

          {/* Car Insurance Link */}
          <div className="col text-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${selectedLink === "Insurance" ? 'active text-white bg-dark' : ''}`}
                onClick={() => {
                  setSelectedLink("Insurance");
                }}
              >
                Insurance
              </Link>
            </li>
          </div>

          {/* Bike Insurance Link */}
          <div className="col text-center">
            <li className="nav-item">
              <Link
               className={`nav-link ${selectedLink === "InsuranceProviders" ? 'active text-white bg-dark' : ''}`}
                onClick={() => {
                  setSelectedLink("InsuranceProviders");
                }}
              >
                Providers
              </Link>
            </li>
          </div>

          {/* Support Link */}
          <div className="col text-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${selectedLink === "Support" ? 'active text-white bg-dark' : ''}`}
                onClick={() => {
                  setSelectedLink("Support");
                }}
              >
                Support
              </Link>
            </li>
          </div>

          {/* Login and Register Buttons */}
          <div className="col text-center">
            <li className="nav-item">
              <div className="btn-group">
                <button className="btn btn-primary btn-block mr-2"  onClick={handleLoginClick}>
                  Login
                </button>
                <button className="btn btn-outline-dark btn-block" onClick={() => {
                  setSelectedLink("Register");
                }}>
                  Register
                </button>
              </div>
            </li>
          </div>
        </div>
      </ul>
      {/* Render the selected component */}
      <div>{renderComponent()}</div>
    </div>
  );
}
