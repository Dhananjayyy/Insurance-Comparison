
import { useLocation } from "react-router-dom";

export default function UserHomePage() {
  const location = useLocation();
  const data = location.state;
  const id = data ? data.id : null;

 
  return (
    <div>
      <h1>This is user home page</h1>
      
    </div>
  );
}