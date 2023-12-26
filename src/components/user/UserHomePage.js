import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VehicleCard from "./VehicleCard";

export default function UserHomePage() {
  const uid = useSelector((state) => state.logged.id);
  const type = useSelector((state) => state.logged.userType);
  const login = useSelector((state) => state.logged.loggedIn);

  const [loading, setLoading] = useState(true);
  const [userdata, setUserData] = useState(null);
  const [vehicledata, setVehicleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (type === "user") {
          const response = await axios.get(
            `http://localhost:9000/getuserinfobyid?id=${uid}`
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }

      try {
        setLoading(true);
        if (type === "user") {
          const response = await axios.get(
            `http://localhost:9000/getvehicleinfobyid?id=${uid}`
          );
          setVehicleData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
      <h1>Welcome {userdata[0].Name} !</h1>
      {/* {JSON.stringify(userdata)}
      {JSON.stringify(vehicledata[0].Model)} */}
      From store:
      {"id: " + uid + ", loggedIn: " + login.toString() + ", userType: " + type}
      <VehicleCard data={vehicledata} />
    </div>
  );
}
