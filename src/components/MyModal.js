import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';

// Le composant Modal qui s'affiche pour se connecter ou s'inscrire
class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: props.initialModalState

    };
    this.toggle2 = this.toggle2.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggle2() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div> 
        <Navbar dark expand="md" fixed="top">
          <NavbarToggler onClick={this.toggle2} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#" onClick={this.toggle} style={{color: '#ff9933'}}>Espace Administrateur</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={this.toggle} style={{color: '#ff9933'}}>Espace Candidat</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Connectez-vous</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" color="danger" onClick={this.toggle}>Je n'ai pas de compte</Button>
            <Button color="primary" onClick={this.routeChange}>Se connecter</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

class SampleApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <MyModal initialModalState={false} />
      </div>
    )
  }
}

export default SampleApp;