"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = searchParams.get("theme") || "light";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    router.push(`${pathname}?theme=${newTheme}`);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className="navbar">
  {/* Title */}
  <div className="brand">School Management</div>

  {/* Right side (links + theme) */}
  <div className="nav-right-container">
    <div className="nav-right">
      {pathname.includes("/add") ? (
        <a href={`/show?theme=${theme}`}>Show Schools</a>
      ) : (
        <a href={`/add?theme=${theme}`}>Add School</a>
      )}
    </div>

    {/* Theme + Mobile menu */}
    <div className="nav-actions">
      <span className="theme-icon" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </span>
      <div
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>
    </div>
  </div>

  {/* Mobile Dropdown */}
  {menuOpen && (
    <div className="mobile-dropdown">
      {pathname.includes("/add") ? (
        <a href={`/show?theme=${theme}`} onClick={() => setMenuOpen(false)}>
          Show Schools
        </a>
      ) : (
        <a href={`/add?theme=${theme}`} onClick={() => setMenuOpen(false)}>
          Add School
        </a>
      )}
    </div>
  )}
</nav>

  );
}
