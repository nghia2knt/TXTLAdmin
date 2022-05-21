import { useRoutes, Navigate } from "react-router-dom";

//admin
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CarList from "./pages/CarList/CarList";
import CarDetail from "./pages/CarDetail/CarDetail";
import CarForm from "./pages/CarForm/CarForm";
import AdminLogin from "./pages/Login/AdminLogin";
import CustomerList from "./pages/CustomerList/CustomerList";
import CustomerDetail from "./pages/CustomerDetail/CustomerDetail";
import InvoicesList from "./pages/InvoicesList/InvoicesList";
import BrandList from "./pages/Brand/BrandList";
import InvoicesDetail from "./pages/InvoicesDetail/InvoicesDetail";
import UserDetail from "./pages/UserDetail/UserDetail";

const Router = () => {
  return useRoutes([
    {
      path: "/Login",
      children: [{ path: "", element: <AdminLogin /> }],
    },
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        { path: "", element: <Navigate to="/Login" /> },
        { path: "Dashboard", element: <Dashboard /> },
        { path: "CarList", element: <CarList /> },
        { path: "CarDetail", element: <CarDetail /> },
        { path: "CarForm", element: <CarForm /> },
        { path: "UserList", element: <CustomerList /> },
        { path: "EditProfile/:id", element: <CustomerDetail /> },
        { path: "EditCar/:id", element: <CarDetail /> },
        { path: "Invoices", element: <InvoicesList /> },
        { path: "BrandList", element: <BrandList /> },
        { path: "Invoices/:id", element: <InvoicesDetail /> },
        { path: "Users/:id", element: <UserDetail /> },

      ],
    },
  ]);
};

export default Router;
