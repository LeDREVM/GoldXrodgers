// Side navigation component
import React from "react";
import { NavLink } from "react-router-dom";

function Item({
  to,
  label
}: {
  to: string;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "block",
        padding: "10px 12px",
        borderRadius: 12,
        color: isActive ? "var(--text)" : "var(--muted)",
        background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
        border: "1px solid var(--border)",
        textDecoration: "none"
      })}
    >
      {label}
    </NavLink>
  );
}

export default function SideNav() {
  return (
    <aside
      style={{
        width: 240,
        padding: 18,
        borderRight: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        height: "100vh",
        background: "rgba(0,0,0,0.15)",
        backdropFilter: "blur(10px)"
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 14 }}>Menu</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Item to="/dashboard" label="Dashboard" />
        <Item to="/journal" label="Journal" />
        <Item to="/settings" label="Settings" />
      </div>

      <div style={{ marginTop: 16 }} className="muted">
        Session NY • Focus execution
      </div>
    </aside>
  );
}
