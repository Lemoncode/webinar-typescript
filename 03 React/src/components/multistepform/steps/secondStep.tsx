import * as React from 'react';
import { Input } from '../../common';
import { FormStep } from './common';

export const SecondStep: React.StatelessComponent<FormStep> = (props) => (
  <fieldset>
    <Input
      label="First name"
      onChange={props.onChangeField}
      value={props.formData.firstName}
      id="firstName"
      name="firstName"
    />
    <Input
      label="Last name"
      onChange={props.onChangeField}
      value={props.formData.lastName}
      id="lastName"
      name="lastName"
    />
    <Input
      label="Phone"
      onChange={props.onChangeField}
      value={props.formData.phone}
      id="phone"
      name="phone"
      type="text"
    />
  </fieldset>
);
