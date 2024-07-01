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
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {auth.email ? 
              <>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Events"
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/events/me">My events</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/events/create">
                    Create event
                  </NavDropdown.Item>                  
                  <NavDropdown.Item as={Link} to="/events">Show all events</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Teams"
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/teams/me">My teams</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/teams/create">
                    Create team
                  </NavDropdown.Item>                  
                  <NavDropdown.Item as={Link} to="/teams">Browse Teams</NavDropdown.Item>
                </NavDropdown>
              </> 
              : <><Nav.Link as={Link} to="/events">Events</Nav.Link><Nav.Link as={Link} to="/teams">Teams</Nav.Link></>
            
            }
            {!auth.email ? 
            <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
            : null}

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Menu"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>


        <Row className="navbarRight">
          <Col className="text-light d-flex align-items-center">
          <NavDropdown
              id="nav-dropdown-dark-example"
              title={auth.email ? auth.email : 'Welcome, guest'}
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Edit</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Sign out</NavDropdown.Item>
            </NavDropdown>
          </Col>
         
          <Col>
        <Image className="profilePic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" roundedCircle />
          </Col>
        </Row>
            
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
