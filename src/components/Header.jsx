import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { Menu, Newspaper, Sun, Moon } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "btn btn-ghost btn-lg btn-active w-full"
      : "btn btn-ghost btn-lg w-full";

  const closeModal = () => {
    document.getElementById("mobile-menu-modal").close();
  };

  return (
    <>
      <header className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
        <div className="navbar-start">
          {/* Modal open button */}
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() =>
              document.getElementById("mobile-menu-modal").showModal()
            }
          >
            <Menu className="w-5 h-5" />
          </button>
          {/* Logo */}
          <Link to="/" className="btn btn-ghost text-xl normal-case">
            <Newspaper className="w-6 h-6 mr-2" />
            NewsFeeds
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-ghost btn-sm btn-active"
                    : "btn btn-ghost btn-sm"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/topics"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-ghost btn-sm btn-active"
                    : "btn btn-ghost btn-sm"
                }
              >
                Topics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-ghost btn-sm btn-active"
                    : "btn btn-ghost btn-sm"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-ghost btn-sm btn-active"
                    : "btn btn-ghost btn-sm"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <Sun className="swap-off w-6 h-6" />
            <Moon className="swap-on w-6 h-6" />
          </label>
        </div>
      </header>

      {/* Modal */}
      <dialog
        id="mobile-menu-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Menu</h3>
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={navLinkClass} onClick={closeModal}>
              Home
            </NavLink>
            <NavLink to="/topics" className={navLinkClass} onClick={closeModal}>
              Topics
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={closeModal}>
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={closeModal}
            >
              Contact
            </NavLink>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
