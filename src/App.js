import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UserHome from "./components/user/UserHomeLayout";

import ProviderHome from "./components/provider/ProviderHome";
import ForgotPassword from "./components/ForgotPassword";
import MainHomePage from "./components/home/LayoutHomePage";
import Insurance from "./components/home/Insurance";
import InsuranceProviders from "./components/home/InsuranceProviders";
import Support from "./components/home/Support";
import Registration from "./components/RegistrationForm";

import MyInsurances from "./components/user/MyInsurances";
import AdminHomePage from "./components/admin/AdminHomePage";
import AdminHomeLayout from "./components/admin/AdminHomeLayout";

export default function App() {
  //const logintype = useSelector((state) => state.logged.userType);
  return (
    <>
      <Routes>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/adminhomepage" element={<AdminHomePage />} />
        <Route path="/providerhome" element={<ProviderHome />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/registerform" element={<Registration />} />
        <Route path="/layouthomepage" element={<MainHomePage />} />

        <Route path="/Insurance" element={<Insurance />} />
        <Route path="/BikeInsurance" element={<InsuranceProviders />} />
        <Route path="/Support" element={<Support />} />

        <Route path="/adminhome" element={<AdminHomeLayout />} />
        <Route path="/myinsurances" element={<MyInsurances />} />
        
        <Route
          path="/"
          element={
            <div>
              <MainHomePage/>
            </div>
          }
        />

        
      </Routes>
    </>
  );
}
