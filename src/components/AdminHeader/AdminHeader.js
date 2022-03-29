import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import skipTheBins from '../../assets/skipTheBins.png';
import "./AdminHeader.css"
function AdminHeader() {
    return (
        <Navbar className="shadow-lg p-3 mb-3 bg-white" collapseOnSelect expand="md" bg="light" variant='light' sticky="top">
            <div className='container-fluid'>
                <Navbar.Brand><img src={skipTheBins} alt="Skip The Bins" className="logo-size" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="colapse-nav" className="justify-content-end">
                    <Nav >
                        <Nav.Link href="/contactus/viewqueries">Contact Us</Nav.Link>
                        <NavDropdown title="Analytics">
                            <NavDropdown.Item href="/user-dashboard">User Analytics</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="vendor-dashboard">Vendor Analytics</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="reward-dashboard">Reward Analytics</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>

    );
}

export default AdminHeader;
