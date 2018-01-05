import React from 'react';
import { Input, Checkbox } from '../../common';
import { FormStepPropTypes } from './common';
import styles from './stepStyles.scss';

export const ThirdStep = (props) => (
  <fieldset>
    <div className={styles.container}>
      <Checkbox
        id="agreement"
        name="agreement"
        checked={props.formData.agreement}
        onChange={props.onChangeField}
      >
        Accept <a href="#">license agreement</a>
      </Checkbox>
    </div>
  </fieldset>
);

ThirdStep.propTypes = FormStepPropTypes;
