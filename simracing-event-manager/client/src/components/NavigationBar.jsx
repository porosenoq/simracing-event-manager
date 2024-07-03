import { useContext } from 'react';
import { Col, Container, Image, Nav, NavDropdown, Row} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/authContext';


export default function NavigationBar() {

  const {auth} = useContext(AuthContext);
  
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
          <Image className="logoPic mx-3" src="/brt_logo.jpg" />
            Simracing Event Manager
            </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} className="navbar-link" to="/">Home</Nav.Link>
            {auth.email ? 
              <>
                <NavDropdown
                className="navbar-link"
                  id="nav-dropdown-dark-events"
                  title="Events"
                  menuVariant="dark"
                >
                  <NavDropdown.Item className="navbar-link sub" as={Link} to="/events/me">My events</NavDropdown.Item>
                  <NavDropdown.Item className="navbar-link sub" as={Link} to="/events/create">
                    Create event
                  </NavDropdown.Item>                  
                  <NavDropdown.Item className="navbar-link sub" as={Link} to="/events">Show all events</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                className="navbar-link"
                  id="nav-dropdown-dark-teams"
                  title="Teams"
                  menuVariant="dark"
                >
                  <NavDropdown.Item className="navbar-link" as={Link} to="/teams/me">My teams</NavDropdown.Item>
                  <NavDropdown.Item className="navbar-link" as={Link} to="/teams/create">
                    Create team
                  </NavDropdown.Item>                  
                  <NavDropdown.Item className="navbar-link" as={Link} to="/teams">Browse Teams</NavDropdown.Item>
                </NavDropdown>
              </> 
              : <><Nav.Link className="navbar-link" as={Link} to="/events">Events</Nav.Link>
              <Nav.Link className="navbar-link" as={Link} to="/teams">Teams</Nav.Link></>
            
            }
            {!auth.email ? 
            <>
            <Nav.Link as={Link} className="navbar-link" to="/login">Login</Nav.Link>
            <Nav.Link as={Link} className="navbar-link" to="/register">Register</Nav.Link>
            </>
            : null}

        <Row className="navbarRight">
          <Col className="text-light d-flex align-items-center">
          {auth.email ? 
          <>
          <NavDropdown
              id="nav-dropdown-dark-user"
              title={auth.email ? auth.email : 'Welcome, guest'}
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to={'/profile/me'}>Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={'/logout'}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </> : <>{'Welcome, guest!'}<Link to={'/login'}className='navbar-link nav-link'>please login</Link></>}
          
          </Col>
         
         {auth.email ? 
         <>
          <Col>
            <Image className="profilePic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" roundedCircle />
          </Col>
         </> : null}
         
        </Row>
            
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
