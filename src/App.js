import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {HouseFill} from 'react-bootstrap-icons';
import {Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText, Alert, Button} from "reactstrap";
import {baseURL} from "./app/constants";
import About from "./components/about/About";
import Categories from "./components/categories/Categories";

function App() {

  return (
      <Router>
      <Navbar>
        <Nav>
          <NavbarBrand>
              <Link to="/"><HouseFill color="black" /></Link>
          </NavbarBrand>
          <NavItem>
            <Link to="/categories">Categories</Link>
          </NavItem>
        </Nav>
      </Navbar>

      <Container>
      <Row>
      <Col xs="12">
      <Switch>
      <Route exact path="/" component={About} />
      <Route exact path="/about" component={About} />
      <Route exact path="/categories" component={Categories} />
      </Switch>
      </Col>
      </Row>
      </Container>

      </Router>
  );
}

export default App;
