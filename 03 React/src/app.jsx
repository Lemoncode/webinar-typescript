import React, { PureComponent } from 'react';
import { MultiStepForm, FirstStep, SecondStep, ThirdStep } from './components';
import styles from './app.scss';


export class App extends React.PureComponent {
  state = {
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

  onChangeField = (field, value) => {
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
