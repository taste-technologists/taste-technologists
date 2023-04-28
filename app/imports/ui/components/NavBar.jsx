import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image src="/images/taste-technologists-logo.png" width="180px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="favorites-nav" as={NavLink} to="/favorites" key="favorites">Favorites</Nav.Link>,
              <Nav.Link id="my-recipes-nav" as={NavLink} to="/my-recipes" key="my-recipes">My Recipes</Nav.Link>,
              <Nav.Link id="search-recipes-nav" as={NavLink} to="/search" key="search">Search Recipes</Nav.Link>,
              <Nav.Link id="my-reviews-nav" as={NavLink} to="/my-reviews" key="my-reviews">My Reviews</Nav.Link>,
              <Nav.Link id="add-nav" as={NavLink} to="/add" key="add">Add Recipe</Nav.Link>,
              <Nav.Link id="navbar-list-vendor" as={NavLink} to="/vendors" key="vendors">Vendors</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {Roles.userIsInRole(Meteor.userId(), ['admin', 'superadmin']) ? (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
