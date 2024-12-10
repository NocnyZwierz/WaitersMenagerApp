import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import style from './NavBar.module.scss'
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';


const NavBar = () => {
    return (
        <Navbar className={style.navbar}>
            <Container>
                <span>Waiter.app</span>
                <Nav className={style.nav}>
                    <Nav.Link className={style.link} as={NavLink} to="/">Home</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
};

export default NavBar;