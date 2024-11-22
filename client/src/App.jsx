// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; // Import React Query

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Tenantdashboard from "./pages/Tenant/Tenantdashboard";
import AdminRoutes from "./pages/Admin/adminRoutes";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* Wrap the app */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tenant-dashboard" element={<Tenantdashboard />} />
          <Route path="/landlord-dashboard/*" element={<AdminRoutes />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path='/profile' element={< Profile/>}/> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
