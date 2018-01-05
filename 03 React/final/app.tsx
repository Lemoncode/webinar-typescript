import * as React from 'react';
import { MultiStepForm, FirstStep, SecondStep, ThirdStep } from './components';
import { Value, SignupData } from './entities';
const styles: any = require('./app.scss');

interface State {
  formData: SignupData;
}

export class App extends React.PureComponent<{}, State> {
  state: State = {
    formData: {
      agreement: false,
      confirmPassword: '',
      firstName: '',
      lastName: '',
      password: '',
      phone: '',
      username: '',
    },
  };

  render() {
    return (
      <div className={styles.container}>
        <MultiStepForm
          heading="Create your account"
          onSubmit={this.onSubmit}
        >
          <FirstStep
            formData={this.state.formData}
            title="Login information"
            onChangeField={this.onChangeField}
          />
          <SecondStep
            formData={this.state.formData}
            title="Personal details (optional)"
            onChangeField={this.onChangeField}
          />
          <ThirdStep
            formData={this.state.formData}
            title="License agreement"
            onChangeField={this.onChangeField}
          />
        </MultiStepForm>
      </div>
    );
  }

  onChangeField = (field: keyof SignupData, value: Value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: value,
      },
    });
  }

  onSubmit = () => {
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(this.state.formData));
  }
}
