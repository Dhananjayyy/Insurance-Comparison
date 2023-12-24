import { useDispatch} from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import {logout} from '../loggedslice'
import AdminHomePage from "./AdminHomePage";
import EditData from "./EditData";
import ChangeRequests from "./ChangeRequests";
import EditHistory from "./EditHistory";

export default function AdminHomeLayout(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [selectedLink, setSelectedLink] = useState(null);
  //setSelectedLink(props.comp)

  const handleLinkClick = (link) => {
    dispatch(logout())
    setSelectedLink(link);
  };

  const renderComponent = () => {
    switch (selectedLink) {
      case "home":
        return <AdminHomePage/>
      case "editdata":
        return <EditData/>;
      case "changerequests":
        return <ChangeRequests/>
      case "history":
        return <EditHistory/>
      default:
        return <AdminHomePage/>;
    }
  };

  function handleLogout() {
    dispatch(logout())
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
                  Admin Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  onClick={() => handleLinkClick('editdata')}
                >
                  Edit Data
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  onClick={() => handleLinkClick('changerequests')}
                >
                  Change Requests
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  onClick={() => handleLinkClick('history')}
                >
                  History 
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
