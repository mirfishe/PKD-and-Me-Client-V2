import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {HouseFill} from "react-bootstrap-icons";
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

  const showCategoryList = false;
  const showMediaList = false;
  const showTitleList = false;
  const showEditionList = false;

  return (
      <BrowserRouter basename="/pkd-and-me">
      <Navbar color="light" light>
        <Nav>
          <NavbarBrand className="mx-2">
            <Link to="/"><HouseFill color="black" /></Link>
          </NavbarBrand>
          {showCategoryList ? 
          <NavItem className="mx-2">
            <Link to="/categoryList"><NavbarText>Category List</NavbarText></Link>
          </NavItem>
          : null}
          {showMediaList ? 
          <NavItem className="mx-2">
            <Link to="/mediaList"><NavbarText>Media List</NavbarText></Link>
          </NavItem>
          : null}
          {showTitleList ? 
          <NavItem className="mx-2">
            <Link to="/titleList"><NavbarText>Title List</NavbarText></Link>
          </NavItem>
          : null}
          {showEditionList ? 
          <NavItem className="mx-2">
            <Link to="/editionList"><NavbarText>Edition List</NavbarText></Link>
          </NavItem>
          : null}
          {/* <NavItem className="mx-2">
            <Link to="/categories"><NavbarText>Categories</NavbarText></Link>
          </NavItem>
          <NavItem className="mx-2">
            <Link to="/media"><NavbarText>Media</NavbarText></Link>
          </NavItem> */}
          <NavItem className="mx-2">
            <Link to="/titles"><NavbarText>All Titles</NavbarText></Link>
          </NavItem>
          <NavItem className="mx-2">
            <Link to="/editions"><NavbarText>All Editions</NavbarText></Link>
          </NavItem>
        </Nav>
      </Navbar>

      <Container className="bodyContainer mb-5">
      <Row>
      <Col xs="2">
        <Category />
        <Media />
      </Col>
      <Col xs="10">
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
      <Route exact path="/titles/:category" component={Titles} />
      <Route exact path="/title/:title" component={Title} />
      <Route exact path="/editions" component={Editions} />
      {/* <Route exact path="/editions/:title" component={Editions} /> */}
      <Route exact path="/editions/:media" component={Editions} />
      </Switch>
      </Col>
      </Row>
      </Container>

      </BrowserRouter>
  );
}

export default App;
