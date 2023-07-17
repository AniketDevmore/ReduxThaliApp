import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Thali from "./components/Thali";
import Checkout from "./components/Checkout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);
