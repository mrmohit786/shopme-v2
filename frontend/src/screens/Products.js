import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Rating from '../components/Rating';
import { PRICE } from '../utils/constants';
import { createProductReview, listProductDetails } from '../redux/actions/products';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CREATE_PRODUCT_REVIEW_RESET } from '../redux/actionTypes';

const Products = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [comments, setComments] = useState(0);
  const [rating, setRating] = useState('');

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = useSelector((state) => state.createProductReview);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitReviewHandler = () => {};
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Container>
                <Image src={product?.image} alt={product?.name} fluid />
              </Container>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price : {PRICE}
                  {product?.price}
                </ListGroup.Item>
                <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
              </ListGroup>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>
                          {PRICE}
                          {product?.price}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>
                        <Button
                          onClick={handleAddToCart}
                          disabled={!product?.countInStock}
                          className="btn-block"
                          type="button"
                          variant="info"
                        >
                          <i className="fa fa-shopping-cart" aria-hidden="true" /> Add to Cart
                        </Button>
                      </Col>
                      <Col md={6}>
                        <Button
                          onClick={handleAddToCart}
                          disabled={!product?.countInStock}
                          className="btn-block"
                          type="button"
                          variant="warning"
                        >
                          <i className="fa fa-bolt" aria-hidden="true" /> Buy Now
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.review.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group>
                        <Form.Label>Rating</Form.Label>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link>to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

Products.propTypes = {
  match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

export default Products;
