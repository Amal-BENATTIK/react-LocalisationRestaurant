import React, { useState } from 'react';
import './login.css';


const LoginForm = ({ setUserIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const users = [
    { username: 'amal', password: '123456' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the provided username and password match any user in the array
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      // Redirect to the desired route after successful login
      setUserIsLoggedIn(true);


    } else {
        setUserIsLoggedIn(false);
      // Display error message or handle failed login
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
  <div className="container login-container">
    <div className="row">
      <div className="col-md-6 login-form-1">
        <h3>Login Form</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group my-5">
            <input type="text" className="form-control" placeholder="Your Name *" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Your Password *" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group mt-3 text-center">
            <input type="submit" className="btnSubmit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    
  );
};

export default LoginForm;

