import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Dropdown, DropdownButton}from 'react-bootstrap';
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

      <Jumbotron id='backplane' fluid>
        <div className='OutputScreen' id='Screen1'>One</div>
        <div className='OutputScreen' id='Screen2'>Two</div>
        <div className='InputButton' id='Button1'>1</div>
        <div className='InputButton' id='Button2'>2</div>
        <div className='InputButton' id='Button3'>3</div>
        <div className='InputButton' id='Button4'>4</div>
      </Jumbotron>

      <Jumbotron id='baseboard' fluid>
        <p>orbitmechanic@protonmail.com</p>
      </Jumbotron>
    </>
  );
}

export default App;
