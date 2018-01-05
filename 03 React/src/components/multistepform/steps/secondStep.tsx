import * as React from 'react';
import { Input } from '../../common';
import { FormStep } from './common';

export const SecondStep: React.StatelessComponent<FormStep> = (props) => (
  <fieldset>
    <Input
      label="First name"
      onChange={console.log}
      value={null}
      id="first-name"
      name="first-name"
    />
    <Input
      label="Last name"
      onChange={console.log}
      value={null}
      id="last-name"
      name="last-name"
    />
    <Input
      label="Phone"
      onChange={console.log}
      value={null}
      id="phone"
      name="phone"
      type="text"
    />
  </fieldset>
);
