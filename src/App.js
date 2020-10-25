import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {HouseFill} from 'react-bootstrap-icons';
import {Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText} from "reactstrap";
// import {baseURL} from "./app/constants";
import CategoryList from "./components/categories/CategoryList";
import MediaList from "./components/media/MediaList";
import TitleList from "./components/titles/TitleList";
import EditionList from "./components/editions/EditionList";
import About from "./components/about/About";
import Category from "./components/categories/Category";
import Media from "./components/media/Media";
import Titles from "./components/titles/Titles";
import Title from "./components/titles/Title";
import Editions from "./components/editions/Editions";

function App() {

  return (
      <Router>
      <Navbar>
        <Nav>
          <NavbarBrand>
              <Link to="/"><HouseFill color="black" /></Link>
          </NavbarBrand>
          {/* <NavItem>
            <Link to="/categoryList">Category List</Link>
          </NavItem>
          <NavItem>
            <Link to="/mediaList">Media List</Link>
          </NavItem>
          <NavItem>
            <Link to="/titleList">Title List</Link>
          </NavItem>
          <NavItem>
            <Link to="/editionList">Edition List</Link>
          </NavItem> */}
          <NavItem>
            <Link to="/categories">Categories</Link>
          </NavItem>
          <NavItem>
            <Link to="/media">Media</Link>
          </NavItem>
          <NavItem>
            <Link to="/titles">All Titles</Link>
          </NavItem>
          <NavItem>
            <Link to="/editions">All Editions</Link>
          </NavItem>
        </Nav>
      </Navbar>

      <Container>
      <Row>
      <Col xs="12">
      <Switch>
      <Route exact path="/" component={About} />
      <Route exact path="/about" component={About} />
      <Route exact path="/categoryList" component={CategoryList} />
      <Route exact path="/mediaList" component={MediaList} />
      <Route exact path="/titleList" component={TitleList} />
      <Route exact path="/editionList" component={EditionList} />
      <Route exact path="/categories" component={Category} />
      <Route exact path="/media" component={Media} />
      <Route exact path="/titles" component={Titles} />
      <Route exact path="/titles/:categoryID" component={Titles} />
      <Route exact path="/title/:titleID" component={Title} />
      <Route exact path="/editions" component={Editions} />
      <Route exact path="/editions/:titleID" component={Editions} />
      <Route exact path="/editions/:mediaID" component={Editions} />
      </Switch>
      </Col>
      </Row>
      </Container>

      </Router>
  );
}

export default App;
