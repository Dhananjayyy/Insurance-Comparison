import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logout from "../logout";
import { useState } from "react";
import MyInsurances from "./MyInsurances";
import UserHomePage from "./UserHomePage";
import PersonalPlans from "./PersonalPlans";
import VehicleAnalysis from "./VehicleAnalysis";
import ForgotPassword from "../ForgotPassword";

export default function UserHome(props) {
  const mystate = useSelector((state) => state.logged);
  const location = useLocation();
  const data = location.state;
  let navigate = useNavigate();

  const [selectedLink, setSelectedLink] = useState(null);
  //setSelectedLink(props.comp)

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const renderComponent = () => {
    switch (selectedLink) {
      case "home":
        return <UserHomePage/>
      case "myinsurances":
        return <MyInsurances />;
      case "personalplans":
        return <PersonalPlans/>
      case "vehicleanalysis":
        return <VehicleAnalysis/>
      default:
        return <UserHomePage/>;
    }
  };

  function handleLogout() {
    navigate("/LayoutHomePage");
  }

  return (
    <div className="container mt-3">
      <div>
        <ul className="nav navbar container border rounded navbar-nav justify-content-center">
          <div className="row w-100">

            <div className="col text-center">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={() => handleLinkClick('home')}
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  onClick={() => handleLinkClick('myinsurances')}
                >
                  My Insurances
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  onClick={() => handleLinkClick('personalplans')}
                >
                  Personal Plans
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  onClick={() => handleLinkClick('vehicleanalysis')}
                >
                  Vehicle Analysis
                </Link>
              </li>
            </div>     
            <div className="col text-center">
              <li className="nav-item">
                <span onClick={handleLogout}>
                  <Logout />
                </span>
              </li>
            </div>
          </div>
        </ul>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
}
