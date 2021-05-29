import React from 'react';
import PropTypes from 'prop-types';
import { RATING_DEFAULT_COLOR } from 'utils/constants';

const Rating = ({ value, text, color }) => (
  <>
    {value && (
      <div style={{ display: 'flex', justifyContent: 'space-between' }} className="rating">
        <div>
          {' '}
          <span>
            <i
              style={{ color }}
              className={
                // eslint-disable-next-line no-nested-ternary
                value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              style={{ color }}
              className={
                // eslint-disable-next-line no-nested-ternary
                value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              style={{ color }}
              className={
                // eslint-disable-next-line no-nested-ternary
                value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              style={{ color }}
              className={
                // eslint-disable-next-line no-nested-ternary
                value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              style={{ color }}
              className={
                // eslint-disable-next-line no-nested-ternary
                value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'
              }
            />
          </span>
        </div>
        <div>
          <span>{text && text}</span>
        </div>
      </div>
    )}
  </>
);

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

Rating.defaultProps = {
  color: RATING_DEFAULT_COLOR,
  value: 0,
  text: '',
};

export default Rating;
