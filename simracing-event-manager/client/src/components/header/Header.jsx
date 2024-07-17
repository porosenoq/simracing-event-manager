import { useContext, useEffect, useState } from 'react';
import { Col, Container, Image, Nav, NavDropdown, Row} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { get } from '../../utils/request';


export default function Header() {
  
  const {auth} = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function loadUserInfo() {
      const currentUserInfo = await get(`${import.meta.env.VITE_BASE_URL}/data/users_info?where=_ownerId%3D"${auth._id}"`);
      if(currentUserInfo.length) {
        setUserInfo(currentUserInfo[0]);
      } else {
        setUserInfo({avatar: "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"});
      }
    }
    if(auth._id) {
      loadUserInfo();
    } else {
      setUserInfo({});
    }
  }, [auth._id]);

  
  return (
    <>
      <Navbar collapseOnSelect expand='sm' bg="dark" data-bs-theme="dark" className="py-0">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Brand as={Link} to={'/'}>
          <Image className="logoPic mx-3" src="/brt_logo.jpg" />
            Simracing Event Manager
            </Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
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
            <Image className="profilePic" src={userInfo?.avatar} roundedCircle />
          </Col>
         </> : null}
         
        </Row>
            
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
