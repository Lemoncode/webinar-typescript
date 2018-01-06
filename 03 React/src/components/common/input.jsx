import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.scss';

export const Input = (props) => (
  <div className="form-group">
    <label htmlFor={props.id} className="sr-only">{props.label}</label>
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      onChange={onChange(props)}
      placeholder={props.label}
      className={`form-control ${styles.input}`}
      value={props.value}
    />
  </div>
);

Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
};

const onChange = (props) => ({ target: { value, name } }) => {
  props.onChange(name, value);
};
