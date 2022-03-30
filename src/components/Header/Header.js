// @author : Aabhaas Jain, Vasu Gamdha (Group 14)

import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import skipTheBins from "../../assets/skipTheBins.png";
import "./Header.css";
function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if (!user) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [location?.pathname]);

  useEffect(() => {
    // console.log(location?.pathname)
    if (
      ["/", "/login", "/signup", "/faq", "/contactus"].indexOf(
        location?.pathname
      ) !== -1
    ) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [location]);

  const logoutClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    setUser(null);
  };

  return (
    <Navbar
      className="shadow-lg p-2 mb-3 bg-white"
      collapseOnSelect
      expand="md"
      bg="light"
      variant="light"
      sticky="top"
    >
      <div className="container-fluid">
        <Navbar.Brand href="/">
          <img src={skipTheBins} alt="Skip The Bins" className="logo-size" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* <Navbar.Collapse id="colapse-nav" className="justify-content-start">
                    <Nav>
                        
                    </Nav>
                </Navbar.Collapse> */}
        <Navbar.Collapse id="colapse-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/user/pickups">Pickups</Nav.Link>
            <Nav.Link href="">Rewards</Nav.Link>
            {!showMenu && <Nav.Link href="/login">Login</Nav.Link>}
            {!showMenu && <Nav.Link href="/signup">Signup</Nav.Link>}
            {showMenu && (
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutClick}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
