import * as React from 'react';
const styles: any = require('./button.scss');

interface Props {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  type?: string;
  content: string;
}

export const Button: React.StatelessComponent<Props> = ({ onClick, type, content }) => (
  <button
    className={`btn ${styles.button}`}
    onClick={onClick}
    type={type}
  >
    {content}
  </button>
);

Button.defaultProps = {
  type: 'button',
};
