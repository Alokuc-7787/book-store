import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home.jsx";
import Courses from "./courses/Courses.jsx";
import Signup from "./components/Signup.jsx";
import Bookstore from "./components/Bookstore";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ReadingDashboard from "./components/ReadingDashboard.jsx";
import AIChatAssistant from "./components/AIChatAssistant.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";
import PolicyPage from "./components/PolicyPage.jsx";

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/course"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PolicyPage type="/privacy-policy" />} />
        <Route path="/terms" element={<PolicyPage type="/terms" />} />
        <Route path="/refund-policy" element={<PolicyPage type="/refund-policy" />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/bookstore"
          element={
            <ProtectedRoute>
              <Bookstore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reading-dashboard"
          element={
            <ProtectedRoute>
              <ReadingDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <AIChatAssistant />
    </>
  );
}

export default App;
