import * as React from 'react';
import { MultiStepForm } from './components';
import { FirstStep, SecondStep, ThirdStep } from './components/multistepform';
const styles: any = require('./app.scss');

export const App: React.StatelessComponent = (props) => (
  <div className={styles.container}>
    <MultiStepForm heading="Create your account">
      <FirstStep title="Login information" />
      <SecondStep title="Personal details (optional)" />
      <ThirdStep title="License agreement" />
    </MultiStepForm>
  </div>
);
