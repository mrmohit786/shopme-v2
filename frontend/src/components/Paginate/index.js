import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin, keyword }) =>
  pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((count) => (
        <LinkContainer
          key={count + 1}
          to={keyword ? `/search/${keyword}/page/${count + 1}` : `/page/${count + 1}`}
        >
          <Pagination.Item active={count + 1 === page}>{count + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );

Paginate.propTypes = {
  isAdmin: PropTypes.bool,
  pages: PropTypes.any.isRequired,
  page: PropTypes.any.isRequired,
  keyword: PropTypes.string.isRequired,
};

Paginate.defaultProps = {
  isAdmin: false,
};

export default Paginate;
