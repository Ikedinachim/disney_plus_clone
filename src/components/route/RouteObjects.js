import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import Login from "../../components/user/Login";
import Register from "../../components/user/Register";
import Home from "../../components/Home";
import Dashboard from "../app/Dashboard"

// const routes = (isAuthenticated) => [
//   {
//     path: '/app',
//     element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
//     children: [
//       { path: '/app/dashboard', element: <Home /> },
//     //   { path: '/account', element: <Account /> },
//       { path: '/app', element: <Navigate to="/dashboard" /> },
//       {
//         path: 'campaings',
//         element: <Outlet />,
//         children: [
//         //   { path: '/', element: <MemberGrid /> },
//         //   { path: '/add', element: <AddMember /> },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/',
//     element: !isAuthenticated ? <Home /> : <Navigate to="/app/dashboard" />,
//     children: [
//       { path: 'login', element: <Login /> },
//       { path: '/', element: <Navigate to="/Home" /> },
//       { path: 'register', element: <Register /> },
//       { path: '/register', element: <Navigate to="/Register" /> },
//     ],
//   },

// ];

function ObjRoutes() {
    // We removed the <BrowserRouter> element from App because the
    // useRoutes hook needs to be in the context of a <BrowserRouter>
    // element. This is a common pattern with React Router apps that
    // are rendered in different environments. To render an <App>,
    // you'll need to wrap it in your own <BrowserRouter> element.
    let element = useRoutes([
      // A route object has the same properties as a <Route>
      // element. The `children` is just an array of child routes.
      { path: '/', element: <Home /> },
      {
        path: 'app',
        element: <Dashboard />,
        children: [
          { path: '/', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'home', element: <Dashboard /> },
        ]
      }
    ]);
  
    return element;
  }

export default ObjRoutes;