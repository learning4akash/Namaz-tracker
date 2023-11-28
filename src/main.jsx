import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Today from "./today";
import Setting from "./Setting";
import Dashboard from './Dashboard';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/today",
        element: <Today />
      }, 
      {
        path: "/",
        element: <Setting />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
