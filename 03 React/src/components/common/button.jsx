import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.scss';

export const Button = ({ onClick, type, content }) => (
  <button
    className={`btn ${styles.button}`}
    onClick={onClick}
    type={type}
  >
    {content}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  content: PropTypes.string.isRequired,
}

Button.defaultProps = {
  type: 'button',
};
