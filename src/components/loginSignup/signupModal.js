import { useState } from "react";
import { NavLink } from "react-router-dom";

const SignupModal = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    passwordMatch: true,
  });

  const handleChange = (event, type) => {
    setUser((prevUser) => {
      const updateUser = {
        ...prevUser,
        [type]: event.target.value,
      };
      if (
        updateUser.password === updateUser.confirmPassword &&
        error.passwordMatch === false
      ) {
        setError((prev) => ({
          ...prev,
          passwordMatch: true,
        }));
      }
      return updateUser;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError((prev) => ({
        ...prev,
        passwordMatch: false,
      }));
    }
    console.log(user);
    setUser((prev) => ({ ...prev, password: "" }));
  };

  return (
    <div className="signupModal">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
        </fieldset>
        <fieldset>
          <label htmlFor="user">User</label>
          <input
            id="user"
            name="user"
            type="text"
            value={user.username}
            required
            onChange={(event) => handleChange(event, "username")}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={user.email}
            onChange={(event) => handleChange(event, "email")}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={user.password}
            onChange={(event) => handleChange(event, "password")}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={`confirmPassword ${error.passwordMatch ? "" : "error"}`}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={user.confirmPassword}
            onChange={(event) => handleChange(event, "confirmPassword")}
          ></input>
          <div
            className={`errorContainer ${error.passwordMatch ? "hidden" : ""}`}
          >
            <p>Passwords do not match</p>
          </div>
        </fieldset>
        <fieldset>
          <button type="submit">Sign Up</button>
        </fieldset>
        <fieldset>
          <div className="loginLinkContainer">
            <p>Already have an account?</p>{" "}
            <NavLink to="/login">
              <a>Login now</a>
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignupModal;
