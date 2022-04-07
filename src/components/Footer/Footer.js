// Author : Aabhaas Jain
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Footer.css";
function Footer() {
  return (
    <>
      <Navbar
        className="shadow-lg p-2 mb-3 bg-white"
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
        sticky="bottom"
        id="footer"
      >
        <div className="container-fluid" id="navbar">
          {/* <Navbar.Brand><img src={skipTheBins} alt="Skip The Bins" className="logo-size" /></Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {/* <Navbar.Collapse id="colapse-nav" className="justify-content-start">
                    <Nav>
                        
                    </Nav>
                </Navbar.Collapse> */}
          <Navbar.Collapse id="colapse-nav">
            <Nav>
              <Nav.Link href="/">About Us</Nav.Link>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>
              <Nav.Link href="/faq">FAQ</Nav.Link>
              <Nav.Link href="/events">Events</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}

export default Footer;
