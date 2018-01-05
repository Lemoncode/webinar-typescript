import * as React from 'react';
import { Input, Button } from '../../common';
import { FormStep } from './common';

export const FirstStep: React.StatelessComponent<FormStep> = (props) => (
  <fieldset>
    <Input
      label="Username or email"
      onChange={props.onChangeField}
      value={props.formData.username}
      id="username"
      name="username"
    />
    <Input
      label="Password"
      onChange={props.onChangeField}
      value={props.formData.password}
      id="password"
      name="password"
      type="password"
    />
    <Input
      label="Confirm password"
      onChange={props.onChangeField}
      value={props.formData.confirmPassword}
      id="confirm-password"
      name="confirm-password"
      type="password"
    />
  </fieldset>
);
