import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function AdminHomePage(){
    const mystate = useSelector((state) => state.logged);
  const location = useLocation();
  const data = location.state;
  const id = data ? data.id : null;
    return(
        <div>
            <h1> This is admin home page</h1>
            prop: {id !== null ? id : "No ID available"}
            <br/>
            login state: {mystate.loggedIn.toString()}
        </div>
    )
}