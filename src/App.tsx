
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import { Route, Routes } from "react-router";
import ROUTE_URLS, { BASE_URL } from "./config/routes";
import RouteAuthGuard from "./components/route-auth-gaurd/RouteAuthGuard";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import RouteAuthGuardRestrictLoggedUser from "./components/route-auth-guard-restrict-logged-user/RouteAuthGuardRestrictLoggedUser";



export default function App() {
  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);

  return (
    <> <Routes>
      <Route
        path={BASE_URL}
        element={
          <RouteAuthGuard>
            <Layout setIsModalOpen={setIsModalOpen} />
          </RouteAuthGuard>
        }
      >
        <Route
          path={ROUTE_URLS.HOME}
          element={
            <RouteAuthGuard>
              <Home setIsModalOpen={setIsModalOpen} isOpenModal={isOpenModal} />
            </RouteAuthGuard>
          }
        />
      </Route>

      <Route
        path={ROUTE_URLS.LOGIN}
        element={
          <RouteAuthGuardRestrictLoggedUser>
            <Login />
          </RouteAuthGuardRestrictLoggedUser>
        }
      />
    </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </>

  );
}
