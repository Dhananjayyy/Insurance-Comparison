import { useState } from "react";
import { Link} from "react-router-dom";
import BikeInsurance from "./InsuranceProviders";
import CarInsurance from "./Insurance";
import HomePageMain from "./HomePage";
import Support from "./Support";
import LoginForm from "../LoginForm";
import Registration from "../RegistrationForm";
import Insurance from "./Insurance";
import InsuranceProviders from "./InsuranceProviders";

export default function MainHomePage() {
  const [selectedLink, setSelectedLink] = useState(null);
  // const mystate = useSelector((state) => state.logged);

  const renderComponent = () => {
    switch (selectedLink) {
      case "Insurance":
        return <Insurance />;
      case "InsuranceProviders":
        return <InsuranceProviders />;
      case "Support":
        return <Support />;
      case "Login":
        return <LoginForm state={{show: true}} />;
      case "Register":
        return <Registration />;
      default:
        return <HomePageMain />;
    }
  };

  return (
    <div className="container mt-3">
      {/* login state: {mystate.loggedIn.toString()} */}
      <ul className="nav navbar container border rounded navbar-nav justify-content-center mb-5">
        <div className="row w-100">
          {/* Home Link */}
          <div className="col text-center">
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => {
                  setSelectedLink();
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
                className="nav-link"
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
                className="nav-link"
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
                className="nav-link"
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
                <button className="btn btn-outline-primary btn-block mr-2" onClick={() => {
                  setSelectedLink("Login");
                }}>
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
