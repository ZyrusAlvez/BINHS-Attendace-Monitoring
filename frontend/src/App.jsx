import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProtectedRoute from "./component/ProtectedRoute.jsx";
// import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default function App() {
  return (
    <>
    {/* <AuthProvider> */}
      <RouterProvider router={router} />
    {/* </AuthProvider> */}
    </>
  );
} 
