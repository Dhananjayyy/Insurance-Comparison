import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserHomePage() {
  const uid = useSelector((state) => state.logged.id);
  const type = useSelector((state) => state.logged.userType);
  const login = useSelector((state) => state.logged.loggedIn);

  const [loading, setLoading] = useState(true);
  const [userdata, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "user") {
          const response = await axios.get(`http://localhost:9000/getuserinfobyid?id=${uid}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-3">
      <h1>Welcome {userdata[0].Name}</h1>
      From store: {uid + " " + login.toString() + " " + type}
    </div>
  );
}
