import { Navbar, Nav, Container } from 'react-bootstrap';
import skipTheBins from '../../assets/skipTheBins.png';
import "./Header.css"
function Header() {
    return (
        <Navbar className="shadow-lg p-3 mb-3 bg-white" collapseOnSelect expand="md" bg="light" variant='light' sticky="top">
            <div className='container-fluid'>
                <Navbar.Brand><img src={skipTheBins} alt="Skip The Bins" className="logo-size" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {/* <Navbar.Collapse id="colapse-nav" className="justify-content-start">
                    <Nav>
                        
                    </Nav>
                </Navbar.Collapse> */}
                <Navbar.Collapse id="colapse-nav" className="justify-content-end">
                    <Nav >
                    
                        <Nav.Link href="#">FAQ-admin</Nav.Link>
                        <Nav.Link href="#profile">Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>

    );
}

export default Header;
