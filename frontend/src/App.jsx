import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/pages/ProtectedRoutes";
import Login from "./components/pages/Login";
import PageNotFound from "./components/pages/PageNotFound";
import Notifier from "./components/notifier/Notifier";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/slices/authSlice";
import { useEffect, useState } from "react";
import api from "./helpers/api";
import Loader from "./components/layouts/Loader";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchAdminUser = async () => {
    const response = await api.fetchAdminUser();
    if (response.success) {
      dispatch(login(response.user));
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated) {
      fetchAdminUser();
    }
    setLoading(false);
  }, [isAuthenticated]);

  return (
    <div className="font-primary bg-background scroll-smooth">
      {loading && <Loader />}
      <Routes>
        <Route>
          <Route path="/" element={<Navigate to={"/app"} />} />
          <Route path="/app/*" element={<ProtectedRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <Notifier />
    </div>
  );
}

export default App;
