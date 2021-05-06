import React, { useEffect, useState } from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import { Rating, Modal, Message, Loader } from 'components';
import { PRICE, RATING_MESSAGE } from 'utils/constants';
import { createProductReview, listProductDetails } from 'redux/actions/products';
import { CREATE_PRODUCT_REVIEW_RESET } from 'redux/actionTypes';
import { LinkContainer } from 'react-router-bootstrap';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const Products = ({ history, match }) => {
  const productId = match.params.id;
  const { loading, error, product } = useSelector((state) => state.productDetails);
  const [qty, setQty] = useState(1);
  const [comment, setComments] = useState(0);
  const [rating, setRating] = useState(0);
  const [openReviewModal, setReviewModal] = React.useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = useSelector((state) => state.createProductReview);

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComments('');
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  const handleAddToCart = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const NotPurchasedProductComponent = (
    <div>
      <h2>Haven't Purchased this product?</h2>
      <p>Sorry! You are not allowed to review this product since you haven't bought it on ShopMe</p>
    </div>
  );

  const RatingModalComponent = (
    <Form onSubmit={submitReviewHandler}>
      <h2>Rate this product</h2>
      <Form.Group controlId="comment">
        <Ratings
          rating={rating}
          widgetRatedColors="yellow"
          changeRating={(newRating) => setRating(newRating)}
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
      </Form.Group>
      <p style={{ color: `${RATING_MESSAGE[rating]?.color}` }}>{RATING_MESSAGE[rating]?.message}</p>
      <Form.Group controlId="comment">
        <h2>Review this product</h2>
        <Form.Control as="textarea" row="3" onChange={(e) => setComments(e.target.value)} />
        <input type="file" id="file-input" name="ImageStyle" />
        <Button type="submit" variant="info">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Breadcrumb>
            <LinkContainer to="/" exact>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to="/" exact>
              <Breadcrumb.Item>{product?.category?.name}</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to="/" exact>
              <Breadcrumb.Item>{product?.subCategory?.name}</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to="/" exact>
              <Breadcrumb.Item>{product?.productType?.name}</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to="/" exact>
              <Breadcrumb.Item active>{product?.name}</Breadcrumb.Item>
            </LinkContainer>
          </Breadcrumb>
          <Row>
            <Col md={6}>
              <Container>
                <Image src={product?.image} alt={product?.name} fluid />
              </Container>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.brand?.toUpperCase()}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Badge variant="dark">
                    {Number(product?.rating)} <i className="fas fa-star" />
                  </Badge>{' '}
                  {`${product?.numReviews} reviews`}
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
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={Number(review.rating)} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                  {userInfo ? (
                    <>
                      <Button variant="primary" onClick={() => setReviewModal(true)}>
                        Add Review
                      </Button>
                      <Modal
                        isOpen={openReviewModal}
                        title="Add Review"
                        onAfterOpen={afterOpenModal}
                        onRequestClose={() => setReviewModal(false)}
                        style={customStyles}
                        contentLabel="add review"
                        component={RatingModalComponent}
                      />
                    </>
                  ) : (
                    <Message>
                      Please <Link to="/login">login</Link> to write a review.
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
