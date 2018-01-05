import React from 'react';
import PropTypes from 'prop-types';
import styles from './checkbox.scss';

export const Checkbox = (props) => (
  <div className="checkbox">
    <label htmlFor={props.id} className={styles.checkbox}>
      <input
        id={props.id}
        name={props.name}
        checked={props.checked}
        onChange={onChange(props)}
        type="checkbox"
        className={styles.checkbox}
      />
      <span>Accept <a href="#">license agreement</a></span>
    </label>
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

const onChange = (props) => ({ target: { name, checked } }) => {
  props.onChange(name, checked);
};
