import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Shield,
  FileText,
  MapPin,
  Utensils,
  QrCode,
  MessageSquare,
  Moon,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ================= MOBILE TOPBAR ================= */}
      <div className="hostel-mobile-topbar">

        <div className="hostel-mobile-brand">
          <div className="hostel-mobile-brand-icon">
            <Shield size={22} />
          </div>

          <span className="hostel-mobile-brand-name">
            Smart Hostel ERP
          </span>
        </div>

        <button
          className="hostel-mobile-menu-btn"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="hostel-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`hostel-sidebar ${
          open ? "open" : ""
        }`}
      >

        {/* ================= LOGO ================= */}
        <div className="hostel-logo">

          <div className="hostel-logo-icon">
            <Shield size={25} />
          </div>

          <div>
            <div className="hostel-logo-title">
              Smart Hostel ERP
            </div>

            <div className="hostel-logo-subtitle">
              Hostel Management System
            </div>
          </div>

        </div>

        {/* ================= USER ================= */}
        <div className="hostel-user-card">

          <div className="hostel-user">

            <div className="hostel-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="hostel-user-name">
                {user.name}
              </div>

              <div className="hostel-user-role">
                {user.role}
              </div>
            </div>

          </div>

        </div>

        {/* ================= MENU ================= */}
        <div className="hostel-menu">

          <div className="hostel-menu-title">
            MENU
          </div>

          <div className="hostel-menu-list">

            {/* ================= STUDENT ================= */}
            {user.role === "student" && (
              <>
                <Link
                  to="/student"
                  className={`hostel-nav-link ${
                    isActive("/student") ? "active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="hostel-nav-icon">
                    <LayoutDashboard size={21} />
                  </span>
                  Dashboard
                </Link>

                <Link
                  to="/student/night-entry"
                  className={`hostel-nav-link ${
                    isActive("/student/night-entry")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="hostel-nav-icon">
                    <Moon size={21} />
                  </span>
                  Night Entry
                </Link>

                <Link
                  to="/student/my-entries"
                  className={`hostel-nav-link ${
                    isActive("/student/my-entries")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="hostel-nav-icon">
                    <FileText size={21} />
                  </span>
                  My Entries
                </Link>

                <Link
                  to="/student/class-goto"
                  className={`hostel-nav-link ${
                    isActive("/student/class-goto")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="hostel-nav-icon">
                    <MapPin size={21} />
                  </span>
                  Class Goto
                </Link>

                <Link
                  to="/student/mess"
                  className={`hostel-nav-link ${
                    isActive("/student/mess")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="hostel-nav-icon">
                    <Utensils size={21} />
                  </span>
                  Mess
                </Link>

                <Link
                  to="/student/scan"
                  className={`hostel-nav-link ${
                    isActive("/student/scan")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="hostel-nav-icon">
                    <QrCode size={21} />
                  </span>
                  Scan Meal QR
                </Link>

                <Link
                  to="/student/complaints"
                  className={`hostel-nav-link ${
                    isActive("/student/complaints")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="hostel-nav-icon">
                    <MessageSquare size={21} />
                  </span>
                  Complaints
                </Link>
              </>
            )}

            {/* ================= WARDEN ================= */}
            {user.role === "warden" && (
  <>
    <Link
      to="/warden"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <LayoutDashboard size={21} />
      </span>
      Dashboard
    </Link>

    <Link
      to="/warden/night-entries"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <Moon size={21} />
      </span>
      Night Entries
    </Link>

    <Link
      to="/warden/class-goto"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <MapPin size={21} />
      </span>
      Class Goto
    </Link>

    <Link
      to="/warden/complaints"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <MessageSquare size={21} />
      </span>
      Complaints
    </Link>

    <Link
      to="/warden/mess"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <Utensils size={21} />
      </span>
      Mess
    </Link>

    <Link
      to="/warden/students"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <FileText size={21} />
      </span>
      Students
    </Link>

    {/* ANALYTICS */}
    <Link
      to="/warden/analytics"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <LayoutDashboard size={21} />
      </span>
      Analytics
    </Link>

    {/* AUDIT LOGS */}
    <Link
      to="/warden/audit-logs"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <FileText size={21} />
      </span>
      Audit Logs
    </Link>
  </>
)}
           
           {/* ================= GUARD ================= */}
{user.role === "guard" && (
  <>
    <Link
      to="/guard"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <LayoutDashboard size={21} />
      </span>
      Dashboard
    </Link>

    <Link
      to="/guard/night-entries"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <Moon size={21} />
      </span>
      Night Entries
    </Link>

    <Link
      to="/guard/class-goto"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <MapPin size={21} />
      </span>
      Class Goto
    </Link>

    <Link
      to="/guard/students"
      className="hostel-nav-link"
      onClick={() => setOpen(false)}
    >
      <span className="hostel-nav-icon">
        <FileText size={21} />
      </span>
      Students
    </Link>
  </>
)}

   </div>
        </div>

        {/* ================= LOGOUT ================= */}
        <div className="hostel-logout-container">

          <button
            className="hostel-logout"
            onClick={handleLogout}
          >
            <LogOut size={21} />
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
}