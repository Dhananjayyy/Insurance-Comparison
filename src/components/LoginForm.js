import { useDispatch } from "react-redux";
import { login } from "./loggedslice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ForgotPassword from "./ForgotPassword";

export default function LoginForm(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [displayAlert, setDisplayAlert] = useState(false);
  const [email, setEmail] = useState("");
  // const [isValidEmail, setIsValidEmail] = useState(false);
  const [dispMsg, setDispMsg] = useState("");
  
  const [hideLogin, setHideLogin] = useState(false);
  const [forgotPasswordComponent, setForgotPasswordComponent] = useState(true);

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // setIsValidEmail(emailRegex.test(email));
    if(!emailRegex.test(email) && !(email === "")){
      showErrorMessage("Invalid email format",0)
    } else{
      setDisplayAlert(false);
    }
  }, [email]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setDispMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }
  
  const submitme = (e) => {
    e.preventDefault();
    const email = document.getElementById("uid").value;
    const password = document.getElementById("pwd").value;
  
    if (email.trim() === '' || password.trim() === '') {
      // setDisplayAlert(true)
      showErrorMessage("Please enter username / password", 5000);
      return;
      
    }
    const srole = document.querySelector(
      "input[type='radio'][name=selectedrole]:checked"
    ).value;
    
    fetch("http://localhost:9000/verifylogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, pwd: password, role: srole }),
    })
      .then((response) => response.json())
      .then((data) => {

        var login_status = data.login_status
        if (login_status) {
          if (parseInt(srole) === 0) {
            console.log(JSON.stringify(data.result))
            dispatch(login({ id:data.result[0].UserID, userType:'user' }));
            navigate("/userhome", {state: {"id": data.result[0].UserID}});
          }
          if (parseInt(srole) === 1) {
            dispatch(login({ id:data.result[0].AdminID, userType:'admin' }));
            navigate("/adminhome", {state: {"id": data.result[0].AdminID}});
          }
          if (parseInt(srole) === 2) {
            dispatch(login({ id:data.result[0].ProviderID, userType:'provider' }));
            navigate("/ProviderHome", {state: {"id": data.result[0].ProviderID}});
          }
        }else{
          showErrorMessage("Please enter correct username / password",5000);
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };



function handleLoginForgotSwap(){
  if(props.state.showForgotPasswordComponent){
    setHideLogin(true);
    setForgotPasswordComponent(false)
    return;
  } else {
    setHideLogin(false);
    setForgotPasswordComponent(true)
  } 
}
 


  return (
    <div>
    <div className={`${forgotPasswordComponent ? "d-none" : "d-block"}`}> <ForgotPassword/></div>
    <div className={`${hideLogin ? "d-none" : "d-block"} container mt-5 border border-dark rounded p-3 w-50 `}>
      <div className=" mb-3 display-5 text-center">LOGIN</div>
      <form className="mt-4">
        <div className="form-group">
          <div className="mb-3 border  border-color bg-light rounded p-2">
            <label htmlFor="uid">Email</label>
            <input
              type="text"
              className="form-control"
              id="uid"
              name="uid"
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3 border bg-light rounded p-2">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              name="pwd"
            />         
          </div>
          
          <div>
            <div
              className={`alert text-center alert-danger p-2 ${
                displayAlert ? "d-block" : "d-none"
              }`}
              role="alert"
            >
              {dispMsg}
            </div>
          </div>
        </div>

        <div
          className="btn-group btn-group-toggle d-flex justify-content-center border rounded"
          data-toggle="buttons"
        >
          <label className="btn btn-light">
            <input
              className="form-check-input"
              type="radio"
              name="selectedrole"
              id="idRole1"
              autoComplete="off"
              value={0}
              defaultChecked
            />{" "}
            User
          </label>
          <label className="btn btn-light ">
            <input
              className="form-check-input"
              type="radio"
              name="selectedrole"
              id="idRole2"
              autoComplete="off"
              value={1}
            />{" "}
            Admin
          </label>
          <label className="btn btn-light">
            <input
              className="form-check-input"
              type="radio"
              name="selectedrole"
              id="idRole3"
              autoComplete="off"
              value={2}
            />{" "}
            Provider
          </label>
        </div>

        <div className="text-center mt-3">
          <button
            className="btn btn-primary w-25 mx-2"
            onClick={(e) => {
              submitme(e);
            }}
          >
            Login
          </button>
          <button type="reset"
            className="btn btn-outline-danger w-25 mx-2"
            
          >
            Clear
          </button>
         
        </div>
        <div className="text-center mt-3">
          
          <Link onClick={()=>{handleLoginForgotSwap()}} style={{ textDecoration: "none" }}>
            Forgot Password?
          </Link> 
        </div>
      </form>
    </div>
    </div>
  );
}
