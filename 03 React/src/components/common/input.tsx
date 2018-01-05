import * as React from 'react';
const styles: any = require('./input.scss');

interface Props {
  value: string | number;
  onChange(field: string, value: string | number): void;
  label: string;
  id: string;
  name: string;
  type?: string;
}

export const Input: React.StatelessComponent<Props> = (props) => (
  <div className="form-group">
    <label htmlFor={props.id} className="sr-only">{props.label}</label>
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      onChange={onChange(props)}
      placeholder={props.label}
      className={`form-control ${styles.input}`}
    />
  </div>
);

Input.defaultProps = {
  type: 'text',
};

const onChange = (props: Props) => ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
  props.onChange(name, value);
};
