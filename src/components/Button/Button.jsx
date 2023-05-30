import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button className={css.Button} type="button" onClick={() => onClick()}>
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};
