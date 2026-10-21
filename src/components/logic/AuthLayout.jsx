import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  if (authStatus === authentication) {
    return children;
  }

  return <Navigate to={authentication ? "/getin/signup" : "/"} replace />;
}

export default Protected;
