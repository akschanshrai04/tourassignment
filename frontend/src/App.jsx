import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PackageDetail from "./pages/PackageDetail";
import BookingForm from "./pages/BookingForm";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
