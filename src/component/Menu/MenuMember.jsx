import React, { useContext, useState } from 'react';
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText, 
  Button} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../App';

function MenuMember(props) {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const {dispatch} = useContext(AuthContext)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to='/dashboard' className="nav-link">HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/transaksi' className="nav-link">TRANSAKSI</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button color="success" onClick={()=> dispatch({type:"LOGOUT"})}>
              LOGOUT
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MenuMember;