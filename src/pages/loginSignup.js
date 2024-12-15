import { useLocation } from "react-router-dom";
import TopOptionBar from "../components/navigation/topOptionBar";
import LoginModal from "../components/loginSignup/loginModal";
import SignupModal from "../components/loginSignup/signupModal";
import "./loginSignup.css";
const LoginSignup = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="content-container auth">
      <TopOptionBar />
      <div className="authContainer">
        {currentPath === "/login" ? <LoginModal /> : <SignupModal />}
      </div>
    </div>
  );
};

export default LoginSignup;
