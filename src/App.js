import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {HouseFill} from 'react-bootstrap-icons';
import {Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText, Alert, Button} from "reactstrap";
import {baseURL} from "./app/constants";

import About from "./components/about/About";

function App() {



  return (
    <Container>
      <Row>
      <Router>
      <Navbar light>
        <Nav>
          <NavbarBrand>
              <Link to="/" onClick={() => this.goToHome()}><HouseFill color="black" /></Link>
          </NavbarBrand>

        </Nav>
      </Navbar>

      <Container>
      <Row>
      <Col xs="12">
      <Switch>
      <Route exact path="/" component={About} />
      </Switch>
      </Col>
      </Row>
      </Container>

      </Router>
      </Row>
    </Container>
  );
}

export default App;
