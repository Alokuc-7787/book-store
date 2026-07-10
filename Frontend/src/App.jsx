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

function App() {
  return (
    <>
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
