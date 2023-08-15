import { useContext } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Chat from "../component/Chat/Chat";
import Login from "../page/Login";

export const router = createBrowserRouter([
  {
    path: "/chat",
    element: <Chat/>,
    children: [

    ]
  },
  {
    path: "about",
    element: <div>Nothing</div>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "*",
    element: <div>Nothing</div>
  }
]);

interface SpecialRouteProps {
	children: JSX.Element,
	isSuspendedRoute?: boolean
}

// const PrivateRoute = ({ children, isSuspendedRoute }: SpecialRouteProps) => {
// 	const [ user ] = useContext(UserContext);
// 	if (user.isAuthenticated) {
// 		if (user.isBanned && !isSuspendedRoute) {
// 			return <Navigate to="/suspended" />;
// 		}
// 		else if (!user.isBanned && isSuspendedRoute) {
// 			return <Navigate to="/chat" />;
// 		}
// 		return children;
// 	}
// 	return <Navigate to="/login" />;
// };

// const PublicOnlyRoute = ({ children }: SpecialRouteProps) => {
// 	const [ user ] = useContext(UserContext);
// 	return !user.isAuthenticated ? children : <Navigate to="/chat" />;
// };