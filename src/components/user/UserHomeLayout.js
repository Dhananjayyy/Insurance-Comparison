import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyInsurances from "./MyInsurances";
import UserHomePage from "./UserHomePage";
import PersonalPlans from "./PersonalPlans";
import VehicleAnalysis from "./VehicleAnalysis";
import { logout } from "../loggedslice";

export default function UserHome(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLink, setSelectedLink] = useState(null);
  //setSelectedLink(props.comp)

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    console.log("home rendered")
    setSelectedLink('home');
  }, []);

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
    dispatch(logout())
    navigate("/LayoutHomePage");
  }

  return (
    <div className="container mt-3">
      <div>
        <ul className="nav navbar nav-pills container border rounded navbar-nav justify-content-center">
          <div className="row w-100">

            <div className="col text-center">
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedLink === "home" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('home')}
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "myinsurances" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('myinsurances')}
                >
                  My Insurances
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "personalplans" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('personalplans')}
                >
                  Personal Plans
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "vehicleanalysis" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('vehicleanalysis')}
                >
                  Vehicle Analysis
                </Link>
              </li>
            </div>     
            <div className="col text-center">
              <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </div>
          </div>
        </ul>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
}
