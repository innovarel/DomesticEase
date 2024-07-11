import { useEffect, useState } from "react";
import { useUser } from "@/app/contexts/user";
import { Button, Box, Link } from "@chakra-ui/react";

export const Header = () => {
  const { user, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function toggleNavbarMethod() {
      if (window.innerWidth > 992) {
        const dropdowns = document.querySelectorAll(".navbar .dropdown");
        dropdowns.forEach((dropdown) => {
          dropdown.addEventListener("mouseover", handleMouseOver);
          dropdown.addEventListener("mouseout", handleMouseOut);
        });
      } else {
        const dropdowns = document.querySelectorAll(".navbar .dropdown");
        dropdowns.forEach((dropdown) => {
          dropdown.removeEventListener("mouseover", handleMouseOver);
          dropdown.removeEventListener("mouseout", handleMouseOut);
        });
      }
    }

    function handleMouseOver() {
      setIsDropdownOpen(true);
    }

    function handleMouseOut() {
      setIsDropdownOpen(false);
    }

    function handleResize() {
      toggleNavbarMethod();
      if (window.innerWidth > 992) {
        setIsDropdownOpen(false);
      }
    }

    toggleNavbarMethod();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="header home">
      <div className="container-fluid">
        <div className="header-top row align-items-center">
          <div className="col-lg-3">
            <div className="brand">
              <a href="/">
                <img src="/a_logo.png" alt="Logo" width="200px" />
              </a>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="topbar">
              <div className="topbar-col">
                <a href="tel:+92 349 7137172">
                  <i className="fa fa-phone-alt"></i>+92 349 7137172
                </a>
              </div>
              <div className="topbar-col">
                <a href="info@example.com">
                  <i className="fa fa-envelope"></i>usmanjutt8132@gmail.com
                </a>
              </div>
              <div className="topbar-col"></div>
            </div>
            <div className="navbar navbar-expand-lg bg-light navbar-light">
              <a href="#" className="navbar-brand">
                MENU
              </a>
              <button
                type="button"
                className="navbar-toggler"
                onClick={handleToggleClick}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={`collapse navbar-collapse ${
                  isDropdownOpen ? "show" : ""
                } justify-content-between`}
              >
                <div className="navbar-nav ml-auto">
                  <a href="/" className="nav-item nav-link">
                    Home
                  </a>
                  <a href="/about" className="nav-item nav-link">
                    About
                  </a>
                  <a href="/shop" className="nav-item nav-link">
                    Shop
                  </a>
                  <a href="/services" className="nav-item nav-link">
                    Service
                  </a>
                  <a href="/contact" className="nav-item nav-link">
                    Contact
                  </a>

                  {user ? (
                    <>
                      <a
                        href="/user"
                        className="nav-link"
                        data-toggle="dropdown"
                      >
                        My Account
                      </a>
                      <a href="#" onClick={logout} className="nav-link">
                        Logout
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="/signin"
                        className="nav-link"
                        data-toggle="dropdown"
                      >
                        Login
                      </a>
                      <a
                        href="/signup/service-provider"
                        className="nav-link "
                        data-toggle="dropdown"
                      >
                        Signup
                      </a>
                    </>
                  )}
                  <a href="/book" className="btn">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
