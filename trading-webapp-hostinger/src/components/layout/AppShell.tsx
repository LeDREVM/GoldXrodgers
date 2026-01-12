// App shell layout component
import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import SideNav from "./SideNav";

export default function AppShell() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideNav />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <main className="container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
