import React, { useState, useReducer } from 'react';


function ForgotPassword() {
  
  const init = {
    emailId: { value: '', valid: false, touched: false, error: '' },
    setPassword: { value: '', valid: false, touched: false, error: '' },
    confirmPassword: { value: '', valid: false, touched: false, error: '' },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        const { key, value, touched, valid, error } = action.data;
        return { ...state, [key]: { value, touched, valid, error } };
      case 'reset':
        return init;
      default:
        break;
    }
  };

  const [UserCredentials, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState('');

  const validateData = (key, val) => {
    let valid = true;
    let error = '';

    switch (key) {
      case 'emailId':
        var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(val)) {
          valid = false;
          error = 'Email not valid';
        }
        break;
      case 'setPassword':
        pattern = /^[A-Z]{1,}[a-zA-Z0-9]{4,}$/;;
        if (!pattern.test(val)) {
          valid = false;
          error = 'Password not valid';
        }
        break;
      case 'confirmPassword':
        if (val !== UserCredentials.setPassword.value) {
          valid = false;
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }

    return { valid, error };
  };

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    dispatch({ type: 'update', data: { key, value, touched: true, valid, error } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (UserCredentials.setPassword.value !== UserCredentials.confirmPassword.value) {
     
      setMsg('Passwords do not match');
      return;
    }

   
    if (!UserCredentials.emailId.valid) {
      setMsg('Please enter a valid email');
      return;
    }

    const reqOptions = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        emailId: UserCredentials.emailId.value,
        setPassword: UserCredentials.setPassword.value,
        confirmPassword: UserCredentials.confirmPassword.value,
      }),
    };

    fetch('http://localhost:9000/updatepassword', reqOptions)
      .then((resp) => resp.text())
      .then((data) => setMsg(data));
    if(msg==="Success"){
      alert('Password successfully updated')
    }
    else if(msg==="failure"){
      alert("Password not updated")
    }
    else if(msg==="User not found"){
      alert("You are not registered user, Please register first to login.")
    }
  };

  return (
    <div className="container mt-5 border border-dark rounded p-3 w-50">
  <div className=" mb-3 display-5 text-center">Update Password</div>
  <form>
    <div className="mb-3 border  border-color bg-light rounded p-2">
      Email
      <input
        type="text"
        onChange={(e) => {
          handleChange('emailId', e.target.value);
        }}
        className="form-control mb-2"
      />
      {UserCredentials.emailId.touched && !UserCredentials.emailId.valid && (
        <div className="text-danger">Invalid email format</div>
      )}
    </div>
    <div className="mb-3 border bg-light rounded p-2">
      New Password
      <input
        type="password"
        onChange={(e) => {
          handleChange('setPassword', e.target.value);
        }}
        className="form-control mb-2"
      />
    </div>
    <div className="mb-3 border bg-light rounded p-2">
      Confirm Password
      <input
        type="password"
        onChange={(e) => {
          handleChange('confirmPassword', e.target.value);
        }}
        className="form-control mb-2"
      />
    </div>
    {msg && <div className="alert text-center alert-danger mt-3">{msg}</div>}
    <div className="text-center mt-3">
      <button
        type="submit"
        className="btn btn-primary w-25 mx-2"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </button>
      
    </div>
    
  </form>
  
</div>

  );
}

export default ForgotPassword;
