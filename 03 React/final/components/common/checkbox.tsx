import * as React from 'react';
import { Value, SignupData } from '../../entities';
const styles: any = require('./checkbox.scss');

interface Props {
  id: string;
  name: keyof SignupData;
  checked: boolean;
  onChange(field: keyof SignupData, value: Value): void;
}

export const Checkbox: React.StatelessComponent<Props> = (props) => (
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

const onChange = (props: Props) => ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
  props.onChange(name as keyof SignupData, checked);
};
