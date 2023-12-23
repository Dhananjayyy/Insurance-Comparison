import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UserHome from "./components/user/UserHomeLayout";
import AdminHome from "./components/admin/AdminHome";

import ProviderHome from "./components/provider/ProviderHome";
import ForgotPassword from "./components/ForgotPassword";
import MainHomePage from "./components/home/LayoutHomePage";
import CarInsurance from "./components/home/Insurance";
import BikeInsurance from "./components/home/InsuranceProviders";
import Support from "./components/home/Support";
import Registration from "./components/RegistrationForm";

import MyInsurances from "./components/user/MyInsurances";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/providerhome" element={<ProviderHome />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/registerform" element={<Registration />} />
        <Route path="/layouthomepage" element={<MainHomePage />} />

        <Route path="/CarInsurance" element={<CarInsurance />} />
        <Route path="/BikeInsurance" element={<BikeInsurance />} />
        <Route path="/Support" element={<Support />} />
        
        <Route
          path="/"
          element={
            <div>
              <MainHomePage/>
            </div>
          }
        />

        <Route path="/myinsurances" element={<MyInsurances />} />
      </Routes>
    </>
  );
}
