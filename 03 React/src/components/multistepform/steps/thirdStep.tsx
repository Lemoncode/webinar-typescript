import * as React from 'react';
import { Input, Checkbox } from '../../common';
import { FormStep } from './common';
const styles: any = require('./stepStyles.scss');

export const ThirdStep: React.StatelessComponent<FormStep> = (props) => (
  <fieldset>
    <div className={styles.container}>
      <Checkbox
        id="agreement"
        name="agreement"
        checked={false}
        onChange={console.log}
      >
        Accept <a href="#">license agreement</a>
      </Checkbox>
    </div>
  </fieldset>
);
