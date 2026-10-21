import Button from "../ui/button/Button";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../store/authSlice";

function Logout({ className }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <Button onClick={logoutHandler} className={`px-4 py-2  ${className}`}>
      Sign out
    </Button>
  );
}

export default Logout;
