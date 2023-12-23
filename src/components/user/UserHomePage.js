import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Logout from "../logout";

export default function UserHomePage(){
    const mystate = useSelector((state) => state.logged);
  const location = useLocation();
  const data = location.state;
  const id = data ? data.id : null;
    return(
        <div>
            <h1> This is user home page</h1>
            prop: {id !== null ? id : "No ID available"}
      {mystate.loggedIn.toString()}
      <div className={mystate.loggedIn ? "d-block" : "d-none"}>
        <Logout />
      </div>
        </div>
    )
}