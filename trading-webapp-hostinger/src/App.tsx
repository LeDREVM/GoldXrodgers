import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppShell from "./components/layout/AppShell";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Home from "./routes/Home";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Dashboard from "./routes/dashboard/Dashboard";
import Journal from "./routes/journal/Journal";
import Settings from "./routes/settings/Settings";
import NotFound from "./routes/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
