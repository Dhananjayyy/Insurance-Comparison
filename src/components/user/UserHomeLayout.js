import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyInsurances from "./MyInsurances";
import UserHomePage from "./UserHomePage";
import PersonalPlans from "./PersonalPlans";
import Vehicle from "./Vehicle";
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
      case "vehicle":
        return <Vehicle/>
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
                  Dashboard
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
                  className={`nav-link ${selectedLink === "vehicle" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('vehicle')}
                >
                  Vehicle
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
