import * as React from 'react';
import { FormStep } from './steps/common';
import { Button } from '../common';
const styles: any = require('./multistepform.scss');

interface Props {
  heading: string;
}

interface State {
  currentStep: number;
}

export class MultiStepForm extends React.PureComponent<Props, State>  {
  state: State = {
    currentStep: 0,
  };

  render() {
    const children = React.Children.toArray(this.props.children);
    const child = children[this.state.currentStep] as React.ReactElement<FormStep>;

    return (
      <form role="form" className={styles.form}>
        <h1 className={styles.heading}>{this.props.heading}</h1>
        <div className={styles.formTop}>
          <div className={styles.formTopLeft}>
            <h3 className={styles.step}>Step {this.state.currentStep + 1} / {children.length}</h3>
            <p>{child.props.title}</p>
          </div>
          <div className={styles.formTopRight}>
            <i className="fa fa-user" />
          </div>
        </div>
        <div className={styles.formBottom}>
          {child}
          {this.renderButtons(children.length)}
        </div>
      </form>
    );
  }

  goPreviousStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({
      currentStep: this.state.currentStep - 1,
    });
  }

  goNextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({
      currentStep: this.state.currentStep + 1,
    });
  }

  onSubmit = () => {

  }

  renderButtons(childrenLength: number) {
    const { currentStep } = this.state;
    let content: string;
    let type: string;
    const isLastStep = currentStep + 1 === childrenLength;
    if (isLastStep) {
      content = 'Submit';
      type = 'submit';
    } else {
      content = 'Next';
      type = 'button';
    }

    return (
      <>
      {currentStep !== 0 &&
        <Button
          content="Previous"
          onClick={this.goPreviousStep}
        />
      }
      <Button
        content={content}
        type={type}
        onClick={isLastStep ? this.onSubmit : this.goNextStep}
      />
      </>
    );
  }
}
