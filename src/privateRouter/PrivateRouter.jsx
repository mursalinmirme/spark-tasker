import { useContext } from "react";
import { authContext } from "../authProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({children}) => {
    const { user, loading } = useContext(authContext);
    if (loading) {
      return <div className="text-4xl">Loading.........</div>;
    }
    if (user) {
      return children;
    }
    return <Navigate to={"/signin"}></Navigate>;
};

export default PrivateRouter;