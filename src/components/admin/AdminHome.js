import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Logout from "../logout";

export default function AdminHome() {
  //const id = props.id;
  const mystate = useSelector((state) => state.logged);
  const location = useLocation();
  const data = location.state;
  return (
    <div>
      <h1>Admin Home</h1>
      prop: {data.id}
      {mystate.loggedIn.toString()}
      <div className={mystate.loggedIn ? "d-block" : "d-none"}>
        <Logout />
      </div>
    </div>
  );
}
