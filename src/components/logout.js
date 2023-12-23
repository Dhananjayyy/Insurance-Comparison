import { useDispatch } from "react-redux";
import {logout} from './loggedslice'

export default function Logout  () {
    let dispatch = useDispatch();
    return (
        <div>
            <button className="btn btn-outline-danger" onClick={()=> {dispatch(logout())}}>Logout</button>
        </div>
    );

}