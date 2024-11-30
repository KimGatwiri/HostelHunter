import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Tenantdashboard from "./pages/Tenant/Tenantdashboard";
import AdminRoutes from "./pages/Admin/adminRoutes";
import HostelCards from "./pages/Hostels/Hostelcard";
import Navigation from "./pages/Navigation";
import HostelList from "./pages/Hostels/listing";
import UpdateProfile from "./pages/updateProfile.JSX";
import TenantProfile from "./pages/Tenant/TenantProfile";
import UpdateTenantProfile from "./pages/Tenant/updateTenantProfile";

import BookingHostel from "./pages/Tenant/Booking";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <WithNavigation>
                <Home />
              </WithNavigation>
            }
          />
          <Route
            path="/tenant-dashboard"
            element={
              <WithNavigation>
                <Tenantdashboard />
              </WithNavigation>
            }
          />
          <Route
            path="/landlord-dashboard/*"
            element={
              <WithNavigation>
                <AdminRoutes />
              </WithNavigation>
            }
          />

          <Route
            path="/hostel/:id"
            element={
              <WithNavigation>
                <HostelCards />
              </WithNavigation>
            }
          />
          <Route
            path="/hostels"
            element={
              <WithNavigation>
                <HostelList />
              </WithNavigation>
            }
          />
          <Route
            path="/updateProfile"
            element={
              <WithNavigation>
                <UpdateProfile />
              </WithNavigation>
            }
          />
          <Route
            path="/TenantProfile"
            element={
              <WithNavigation>
                <TenantProfile />
              </WithNavigation>
            }
          />
          <Route
            path="/updateTenantProfile"
            element={
              <WithNavigation>
                <UpdateTenantProfile />
              </WithNavigation>
            }
          />
          <Route
            path="/BookingHostel"
            element={
              <WithNavigation>
                <BookingHostel />
              </WithNavigation>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

function WithNavigation({ children }) {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return children;
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

export default App;
