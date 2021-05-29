import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Search } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/actions/user';
import { APPLICATION_NAME } from 'utils/constants';
import { getCategories } from 'services/categoryService';
import { toast } from 'react-toastify';

const Header = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    listCategories();
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const listCategories = async () => {
    const res = await getCategories().catch((e) => {
      debugger;
      toast.error(e?.data?.error);
    });
    if (res) {
      setCategories(res.data);
    }
  };

  return (
    <header>
      <Navbar bg="info" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>{APPLICATION_NAME}</Navbar.Brand>
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
      {/* <div className="d-flex justify-content-around">
        {categories?.map((category) => (
          <Link to={`/category/${category._id}`}>
            <i className="fas fa-shopping-cart" />
            <p>{category.name}</p>
          </Link>
        ))}
      </div> */}
    </header>
  );
};

export default Header;
