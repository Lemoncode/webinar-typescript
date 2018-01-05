import * as React from 'react';
import { Input, Button } from '../../common';
import { FormStep } from './common';

export const FirstStep: React.StatelessComponent<FormStep> = (props) => (
  <fieldset>
    <Input
      label="Username or email"
      onChange={console.log}
      value={null}
      id="username"
      name="username"
    />
    <Input
      label="Password"
      onChange={console.log}
      value={null}
      id="password"
      name="password"
      type="password"
    />
    <Input
      label="Confirm password"
      onChange={console.log}
      value={null}
      id="confirm-password"
      name="confirm-password"
      type="password"
    />
  </fieldset>
);
