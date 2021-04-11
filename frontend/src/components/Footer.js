import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer>
    <Container style={{ background: '#f1f1f1' }} fluid>
      <Row>
        <Col className="text-center py-3">About Us</Col>
        <Col className="text-center py-3">Contact Us</Col>
        <Col className="text-center py-3">
          Social |
          <i className="fa fa-instagram" aria-hidden="true" />
          <i className="fa fa-twitter" aria-hidden="true" />
        </Col>
      </Row>
      <Row>
        <Col className="text-center py-3">&copy; 2021 ShopME</Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
