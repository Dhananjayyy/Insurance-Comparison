import { useReducer, useState } from "react";

export default function Registration() {
  const init = {
    title: { value: -1, valid: false, touched: false, error: "" },
    fname: { value: "", valid: false, touched: false, error: "" },
    lname: { value: "", valid: false, touched: false, error: "" },
    email: { value: "", valid: false, touched: false, error: "" },
    phone: { value: 0, valid: false, touched: false, error: "" },
    pwd: { value: 0, valid: false, touched: false, error: "" },
    repwd: { value: 0, valid: false, touched: false, error: "" },
    // newexist: { value: "", valid: false, touched: false, error: "" },
    // budget: { value: 0, valid: false, touched: false, error: "" },
    // debt: { value: "", valid: false, touched: false, error: "" },
    // vrn: { value: "", valid: false, touched: false, error: "" },
    formValid: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return {
          ...state,
          [action.data.key]: {
            ...state[action.data.key],
            value: action.data.val,
            touched: action.data.touched,
            valid: action.data.valid,
            error: action.data.error,
          },
          formValid: action.data.formValid,
        };
      case "reset":
        return init;
      default:
        console.log("default switch");
        return state;
    }
  };

  const [users, dispatch] = useReducer(reducer, init);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertType, setAlertType] = useState("danger");


  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setErrorMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    let formValid = true;
    for (let k in users) {
      if (users[k].valid === false) {
        formValid = false;
        break;
      }
    }
    dispatch({
      type: "update",
      data: {
        key,
        val: value,
        touched: true,
        valid,
        error,
        formValid: formValid,
      },
    });
  };

  const handleReset = (key, value) => {
    dispatch({
      type: "reset",
    });
  };

  function checkPasswordsMatch() {
    const password = users.pwd.value;
    const confirmPassword = users.repwd.value;
    var ispwvalid = false;
    console.log("my pw " + password);
    console.log("my pw conf" + confirmPassword);
    if ((password === confirmPassword)) {
      ispwvalid = true;
    }
    console.log("pw matched: " + ispwvalid);
    return ispwvalid;
  }

  const validateData = (key, value) => {
    console.log(key, value);
    let valid = true;
    let error = "";
    switch (key) {
      case "title":
        if (value === "0") {
          valid = false;
          error = "Please select title";
        }
        break;
      case "fname":
      case "lname":
        var pattern = new RegExp("^[a-zA-Z]{3,}$");
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Name (Only Alphabets allowed)";
        }
        break;
      case "email":
        pattern = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Email";
        }
        break;
      case "phone":
        pattern = /^\d{10}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Phone Number";
        }
        break;
      case "pwd":
      case "repwd":
        pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Password";
        }
        break;

      default:
        console.log("default switch");
    }
    return { valid: valid, error: error };
  };

  const submitData = (e) => {
    e.preventDefault();

    const passwordsMatch = checkPasswordsMatch();
    
    if (!passwordsMatch) {
      setAlertType("alert-warning");
      showErrorMessage('Passwords do not match',5000)
      return;
    }
    //
    if(users.formValid === false){
      setAlertType("alert-danger");
      showErrorMessage('Please enter valid data',5000)
      return;
    }

    fetch("http://localhost:9000/checkemailexist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: users.email.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        // emailexists = data;
        // //console.log("email exist:" + JSON.stringify(typeof(data)));

        if (!data) {
          fetch("http://localhost:9000/insertuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: users.title.value,
              name: users.fname.value + " " + users.lname.value,
              email: users.email.value,
              phone: users.phone.value,
              pwd: users.pwd.value
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("insert data: " + data.registered);

              if(data.registered === true){
                setAlertType("alert-success");
                showErrorMessage("Registration successful. Please log in.",5000)
                return;
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        if(data){
          setAlertType("alert-info");
          showErrorMessage("Email already exists. Please log in.",5000);
          
          // console.log(document.getElementById("successalert").textContent)
          // setDisplayAlert(true)
          
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form>
      <div className="container mt-5 mb-5 border border-dark rounded ">
        <div className="mt-3 mb-5 display-5 text-center">REGISTRATION</div>
        <div className="row">
          {/* Row 1*/}
          <div className="col-md-2">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idfname" className="form-label">
                Title
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("title", e.target.value)}
                onBlur={(e) => handleChange("title", e.target.value)}
              >
                <option value="0">Choose</option>
                <option value="1">Mr.</option>
                <option value="2">Mrs.</option>
                <option value="3">Ms.</option>
                <option value="4">Dr.</option>
              </select>
              <span className="error text-danger">
                {users.title.touched && !users.title.valid && users.title.error}
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idfname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="idfname"
                placeholder="Dhananjay"
                onChange={(e) => handleChange("fname", e.target.value)}
                onBlur={(e) => handleChange("fname", e.target.value)}
                w-25
              />
              <span className="error text-danger">
                {users.fname.touched && !users.fname.valid && users.fname.error}
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idlname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="idlname"
                placeholder="Yelwande"
                onChange={(e) => handleChange("lname", e.target.value)}
                onBlur={(e) => handleChange("lname", e.target.value)}
              />
              <span className="error text-danger">
                {users.lname.touched && !users.lname.valid && users.lname.error}
              </span>
            </div>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                onChange={(e) => {
                  handleChange("email", e.target.value);
                }}
                onBlur={(e) => {
                  handleChange("email", e.target.value);
                }}
              />
              <span className="error text-danger">
                {users.email.touched && !users.email.valid && users.email.error}
              </span>
                
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="9657212458"
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={(e) => handleChange("phone", e.target.value)}
              />
              <span className="error text-danger">
                {users.phone.touched && !users.phone.valid && users.phone.error}
              </span>
            </div>
          </div>
        </div>
        <br />
        <div className="row justify-content-center ">
          <div className="col "></div>
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter your password"
                onChange={(e) => handleChange("pwd", e.target.value)}
                onBlur={(e) => handleChange("pwd", e.target.value)}
              />
              <span className="error text-danger">
                {users.pwd.touched && !users.pwd.valid && users.pwd.error}
              </span>
            </div>
          </div>
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="repwd" className="form-label">Re-Enter Password</label>
              <input
                type="password"
                className="form-control"
                id="repwd"
                placeholder="Re-enter your password"
                onChange={(e) => handleChange("repwd", e.target.value)}
                onBlur={(e) => handleChange("repwd", e.target.value)}
                name="repwd"
              />
              <span className="error text-danger">
                {users.repwd.touched && !users.repwd.valid && users.repwd.error}
              </span>
            </div>
          </div>
          <div className="col "></div>
        </div>

        <br />
        <div className="row">
          <div className="col"></div>
          <div
            className={`col alert text-center d-flex justify-content-center ${
              alertType
            } p-2 w-75 ${
              displayAlert ? "d-block" : "d-none"
            }`}
            role="alert"
          >
            {errorMsg}
          </div>
          
          <div className="col"></div>
        </div>
        <div className="row text-center m-3">
          <div className="col "></div>
          <div className="col">
            <button
              className="btn btn-primary col-6"
              type="submit"
              onClick={(e) => {
                submitData(e);
              }}
            >
              Register
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-outline-dark col-6"
              type="reset"
              onClick={() => {
                handleReset();
              }}
            >
              Clear
            </button>
          </div>
          <div className="col"></div>
        </div>
        {/* {JSON.stringify(users) + ""} */}
      </div>
    </form>
  );
}
