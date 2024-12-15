import { useState } from "react";
import { NavLink } from "react-router-dom";

const LoginModal = () => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    setUser((prev) => ({ ...prev, password: "" }));
  };

  const handleChange = (event, type) => {
    setUser((prevValue) => ({ ...prevValue, [type]: event.target.value }));
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Login</h2>
        </fieldset>
        <fieldset>
          <label htmlFor="user">User</label>
          <input
            id="user"
            type="text"
            value={user.userName}
            onChange={(event) => handleChange(event, "userName")}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(event) => handleChange(event, "password")}
          ></input>
        </fieldset>
        <fieldset>
          <button type="submit">Login</button>
        </fieldset>
        <fieldset>
          <div className="loginLinkContainer">
            <p>Don't have an account?</p>{" "}
            <NavLink to="/signup">
              <a>Signup now</a>
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginModal;
