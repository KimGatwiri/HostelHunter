import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; // Import React Query
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
// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <Router>
        <Routes>
          {/* Define route for Home, Tenant, Admin routes and Hostel */}
          <Route path="/" element={<WithNavigation><Home /></WithNavigation>} />
          <Route path="/tenant-dashboard" element={<WithNavigation><Tenantdashboard /></WithNavigation>} />
          <Route path="/landlord-dashboard/*" element={<WithNavigation><AdminRoutes /></WithNavigation>} />
          <Route path="/hostel/:id" element={<WithNavigation><HostelCards /></WithNavigation>} />
          <Route path="/hostels" element={<WithNavigation><HostelList /></WithNavigation>} />
          <Route path="/updateProfile" element={<WithNavigation><UpdateProfile/></WithNavigation>} />
          {/* Routes without Navigation */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

// Helper component to conditionally render the Navigation bar
function WithNavigation({ children }) {
  const location = useLocation();
  // Don't render the navigation bar on login or signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return children;
  }

  return (
    <>
      <Navigation /> {/* Render the Navigation Bar */}
      {children} {/* Render the rest of the page content */}
    </>
  );
}

export default App;
