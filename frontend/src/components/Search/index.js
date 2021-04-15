import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="search..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="primary" className="p-2">
        Search
      </Button>
    </Form>
  );
};

SearchBox.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SearchBox;
