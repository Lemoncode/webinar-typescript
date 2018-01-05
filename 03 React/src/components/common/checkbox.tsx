import * as React from 'react';
const styles: any = require('./checkbox.scss');

interface Props {
  id: string;
  name: string;
  checked: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const Checkbox: React.StatelessComponent<Props> = (props) => (
  <div className="checkbox">
    <label htmlFor={props.id} className={styles.checkbox}>
      <input
        id={props.id}
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        type="checkbox"
        className={styles.checkbox}
      />
      <span>Accept <a href="#">license agreement</a></span>
    </label>
  </div>
);
