"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import {
  Search,
  Sun,
  Moon,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";

/* ── page title map ─────────────────────────── */
const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analyze": "Upload Documents",
  "/samples": "Sample Agreements",
  "/agreements": "Agreements",
  "/risk": "High-Risk Agreements",
  "/reference": "Legal Reference",
  "/search": "Clause Search",
  "/compare": "Compare",
  "/notifications": "Notifications",
  "/help": "Help",
  "/settings": "Settings",
};

/* ── helpers ────────────────────────────────── */
function getInitials(user: {
  displayName?: string | null;
  email?: string | null;
}) {
  if (user.displayName) {
    return user.displayName
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  if (user.email) return user.email[0].toUpperCase();

  return "U";
}

/* ── icon button ────────────────────────────── */
interface IconBtnProps {
  tooltip: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function IconBtn({ tooltip, onClick, children }: IconBtnProps) {
  return (
    <button
      className="navbar-icon-btn"
      data-tooltip={tooltip}
      onClick={onClick}
      aria-label={tooltip}
      type="button"
    >
      {children}
    </button>
  );
}

/* ── Navbar ─────────────────────────────────── */
export function Navbar() {
  

  const pathname = usePathname();
  const router = useRouter();

  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  

  const pageTitle = PAGE_TITLES[pathname] ?? "LegiFlow";

  

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 30,
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left — page title */}
      <span
        style={{
          fontSize: "15px",
          fontWeight: 500,
          color: "var(--text-primary)",
          letterSpacing: "-0.01em",
          fontFamily: "inherit",
        }}
      >
        {pageTitle}
      </span>

      {/* Right — icon cluster */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Search */}
        <IconBtn
          tooltip="Search"
          onClick={() => router.push("/search")}
        >
          <Search size={17} />
        </IconBtn>

        {/* Theme toggle */}
        <IconBtn
          tooltip={theme === "dark" ? "Light mode" : "Dark mode"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun size={17} />
          ) : (
            <Moon size={17} />
          )}
        </IconBtn>

        {/* Help */}
        <IconBtn
          tooltip="Help"
          onClick={() => router.push("/help")}
        >
          <HelpCircle size={17} />
        </IconBtn>

        {/* Settings */}
        <IconBtn
          tooltip="Settings"
          onClick={() => router.push("/settings")}
        >
          <Settings size={17} />
        </IconBtn>

        {/* Avatar */}
        {user && (
          <div
            className="navbar-avatar"
            title={user.displayName ?? user.email ?? "User"}
            aria-label="Signed in user"
          >
            {getInitials(user)}
          </div>
        )}

        {/* Sign out */}
        {user && (
          <IconBtn
            tooltip="Sign out"
            onClick={logout}
          >
            <LogOut size={17} />
          </IconBtn>
        )}
      </div>
    </header>
  );
}