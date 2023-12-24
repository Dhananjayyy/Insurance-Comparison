import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function ProviderHome() {
  //const id = props.id;
  const mystate = useSelector((state) => state.logged);
  const location = useLocation();
  const data = location.state;
  return (
    <div>
      <h1>Provider Home</h1>
      prop: {data.id}
      {mystate.loggedIn.toString()}
      
    </div>
  );
}
