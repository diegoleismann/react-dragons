import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Navbar bg="danger" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Dragões</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to='/add' className="nav-link"> Adicionar Dragão </Link>
            <Link to='/list' className="nav-link"> Dragões </Link>
            <Link to='/login' className="nav-link"> Sair </Link>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header
