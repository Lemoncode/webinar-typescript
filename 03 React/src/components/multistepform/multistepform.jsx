import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common';
import styles from './multistepform.scss';

export class MultiStepForm extends PureComponent  {

  static propTypes = {
    heading: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    currentStep: 0,
  };

  render() {
    const children = React.Children.toArray(this.props.children);
    const child = children[this.state.currentStep];

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

  goPreviousStep = (event) => {
    event.preventDefault();
    this.setState({
      currentStep: this.state.currentStep - 1,
    });
  }

  goNextStep = (event) => {
    event.preventDefault();
    this.setState({
      currentStep: this.state.currentStep + 1,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  renderButtons(childrenLength) {
    const { currentStep } = this.state;
    let content, type;
    const isLastStep = currentStep + 1 === childrenLength;
    if (isLastStep) {
      content = 'Submit';
      type = 'submit';
    } else {
      content = 'Next';
      type = 'button';
    }

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
