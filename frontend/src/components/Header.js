import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Search } from 'components';
import { getAllCategories } from 'redux/actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, categories } = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="info" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>EMart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <Search history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg="primary" variant="dark" collapseOnSelect expand="lg">
        <Container>
          {error && <h3>Problem in loading categories</h3>}
          {loading ? (
            <p>Fetching Categories</p>
          ) : (
            categories?.map((category) => (
              <LinkContainer to="/">
                <Navbar.Brand>{category.name}</Navbar.Brand>
              </LinkContainer>
            ))
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
