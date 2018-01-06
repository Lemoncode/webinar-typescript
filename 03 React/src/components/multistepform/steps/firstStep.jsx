import React from 'react';
import { Input, Button } from '../../common';
import { FormStepPropTypes } from './common';

export const FirstStep = (props) => (
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
      id="confirmPassword"
      name="confirmPassword"
      type="password"
    />
  </fieldset>
);

FirstStep.propTypes = FormStepPropTypes;
