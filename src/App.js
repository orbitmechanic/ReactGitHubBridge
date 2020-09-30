import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Dropdown, DropdownButton, Container, Button}from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './App.css';


function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand 
          href="#home">
            <img 
              alt='React logo'
              src='./logo192.png'
              height='30' width='30'
              className='React Bootstrap logo'
            />
          Orbital Investments LLC
        </Navbar.Brand>
        <DropdownButton alignRight
          title="Mode"
          id="dropdown-menu-align-right">
          <Dropdown.Item eventKey="1">0 Idling</Dropdown.Item>
          <Dropdown.Item eventKey="2">1 Personell</Dropdown.Item>
          <Dropdown.Item eventKey="3">2 Market Tool</Dropdown.Item>
          <Dropdown.Item eventKey="4">3 Cryptozoo</Dropdown.Item>
          <Dropdown.Item eventKey="5">4 Experimental</Dropdown.Item>
        </DropdownButton>
      </Navbar>

      <Container id='backplane' fluid>
        <Container className='OutputScreen' id='Screen1'>One</Container>
        <Container className='OutputScreen' id='Screen2'>Two</Container>
        <Button className='ScreenControl' variant='primary'     id='Button1'>1</Button>
        <Button className='ScreenControl' variant='secondary'   id='Button2'>2</Button>
        <Button className='ScreenControl' variant='info'        id='Button3'>3</Button>
        <Button className='ScreenControl' variant='success'     id='Button4'>4</Button>
      </Container>

      <Jumbotron id='baseboard' fluid>
        <p>orbitmechanic@protonmail.com</p>
      </Jumbotron>
    </>
  );
}

export default App;
