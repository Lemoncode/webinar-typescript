# 03 React

In this sample we'll transform a JavaScript React app to TypeScript and we'll see some nice features it provide us.

The first step is change our entry point in webpack to point to `index.tsx`:

### _config/webpack/app/base.js_

```diff
  module.exports = merge(common, {
    context: helpers.resolveFromRootPath('src'),
    entry: {
      app: [
-       './index.jsx',
+       './index.tsx',
      ],
      vendor: [
```

Next we'll rename our `index.jsx` to `index.tsx` and apply some TypeScript changes on imports:

### ~~_src/index.jsx_~~ → _src/index.tsx_

```diff
- import React from 'react';
- import ReactDOM from 'react-dom';
+ import * as React from 'react';
+ import * as ReactDOM from 'react-dom';
  import { AppContainer } from 'react-hot-loader';
  import { App } from './app';
```

Next file is `app.jsx`. Let's change imports and type state and methods:

### ~~_src/app.jsx_~~ → _src/app.tsx_

```diff
- import React, { PureComponent } from 'react';
+ import * as React from 'react';
  import { MultiStepForm, FirstStep, SecondStep, ThirdStep } from './components';
- import styles from './app.scss';
+ const styles: any = require('./app.scss');
+
+ interface State {
+   formData: {
+     agreement: boolean;
+     confirmPassword: string;
+     firstName: string;
+     lastName: string;
+     password: string;
+     phone: string;
+     username: string;
+   };
+ }

- export class App extends PureComponent {
+ export class App extends React.PureComponent<{}, State> {
  ...

-   onChangeField = (field, value) => {
+   onChangeField = (field: string, value: any) => {

  ...

    onSubmit = () => {
+     // tslint:disable-next-line:no-console
      console.log(JSON.stringify(this.state.formData));
    }
```

Now it's time to refactor `MultiStepForm`:

### ~~_src/components/multistepform/multistepform.jsx_~~ → _src/components/multistepform/multistepform.tsx_

First we'll refactor imports section

```diff
+ import * as React from 'react';
- import React, { PureComponent, Fragment } from 'react';
- import PropTypes from 'prop-types';
  import { Button } from '../common';
- import styles from './multistepform.scss';
+ const styles: any = require('./multistepform.scss');
```

Next we'll define `Props` based on propTypes and `State` interfaces:

```diff
+ interface Props {
+   heading: string;
+   onSubmit(): void;
+ }
+
+ interface State {
+   currentStep: number;
+ }
+
- export class MultiStepForm extends PureComponent  {
+ export class MultiStepForm extends React.PureComponent<Props, State>  {
-
-    static propTypes = {
-      heading: PropTypes.string.isRequired,
-      onSubmit: PropTypes.func.isRequired,
-    }

    state = {
      currentStep: 0,
    };
```

Now we'll add some types on methods and variables:

```diff
  render() {
    const children = React.Children.toArray(this.props.children);
-   const child = children[this.state.currentStep];
+   const child = children[this.state.currentStep] as React.ReactElement<any>;

    ...

  }

- goPreviousStep = (event) => {
+ goPreviousStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    ...
  }

- goNextStep = (event) => {
+ goNextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    ...
  }

- onSubmit = (event) => {
+ onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    ...
  }

  renderButtons(childrenLength) {
    const { currentStep } = this.state;
-   let content, type;
+   let content: string;
+   let type: string;
    ...

    return (
-     <Fragment>
+     <>
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
-     </Fragment>
+     </>
    );
```

Now we'll refactor `Button`. Rename its extension to `.tsx` and make next changes:

### ~~_src/components/common/button.jsx_~~ → _src/components/common/button.tsx_

```diff
- import React from 'react';
+ import * as React from 'react';
- import PropTypes from 'prop-types';
- import styles from './button.scss';
+ const styles: any = require('./button.scss');
+
+ interface Props {
+   onClick(event: React.MouseEvent<HTMLButtonElement>): void;
+   type?: string;
+   content: string;
+ }

- export const Button = ({ onClick, type, content }) => (
+ export const Button: React.StatelessComponent<Props> = ({ onClick, type, content }) => (
    ...
  );

- Button.propTypes = {
-   onClick: PropTypes.func.isRequired,
-   type: PropTypes.string,
-   content: PropTypes.string.isRequired,
- };
```

Let's refactor more `MultiStepForm` childs. We'll start with `FirstStep`. If you look at the component definition it's using a shared entity under `common.js` and this is using another shared entity inside `entities` so let's take that file as our entry point to refactor. Rename `entities.js` to `entities.ts` and make next change to export an interface instead of propType:

### ~~_src/entities.js_~~ → _src/entities.ts_

```diff
- import PropTypes from 'prop-types';
-
- export const SignupDataType = PropTypes.shape({
-   agreement: PropTypes.bool.isRequired,
-   username: PropTypes.string.isRequired,
-   password: PropTypes.string.isRequired,
-   confirmPassword: PropTypes.string.isRequired,
-   firstName: PropTypes.string.isRequired,
-   lastName: PropTypes.string.isRequired,
-   phone: PropTypes.string.isRequired,
- });
+ export interface SignupData {
+   agreement: boolean;
+   username: string;
+   password: string;
+   confirmPassword: string;
+   firstName: string;
+   lastName: string;
+   phone: string;
+ }
```

Maybe you've noted down something. This is the same entity as the App's `formData` state. With this change we can use it directly in `App` so let's use it:

### _src/app.tsx_

```diff
  import * as React from 'react';
  import { MultiStepForm, FirstStep, SecondStep, ThirdStep } from './components';
+ import { SignupData } from './entities';
  const styles: any = require('./app.scss');

  interface State {
-    formData: {
-      agreement: boolean;
-      confirmPassword: string;
-      firstName: string;
-      lastName: string;
-      password: string;
-      phone: string;
-      username: string;
-    };
+    formData: SignupData;
   }
```

Let's now refactor `common.js` by changing its extension to `ts` and changing the exporter propType to another interface:

### ~~_src/components/steps/multistepform/common.js_~~ → _src/components/steps/multistepform/common.ts_

```diff
- import PropTypes from 'prop-types';
- import { SignupDataType } from '../../../entities';
  import { SignupData } from '../../../entities';

- export const FormStepPropTypes = {
-   title: PropTypes.string.isRequired,
-   formData: SignupDataType,
-   onChangeField: PropTypes.func.isRequired,
- };
+ export interface FormStep  {
+   title: string;
+   formData: SignupData;
+   onChangeField(field: string, value: any);
+ }
```

This propType (now an interface) is used by every _step_ component. We can type now our `child` in `MultiStepForm`:

### _src/components/steps/multistepform/multistepform.tsx_

```diff
  import * as React from 'react';
  import { Button } from '../common';
+ import { FormStep } from './steps/common';
  const styles: any = require('./multistepform.scss');

  ...

    render() {
      const children = React.Children.toArray(this.props.children);
+     const child = children[this.state.currentStep] as React.ReactElement<any>;
-     const child = children[this.state.currentStep] as React.ReactElement<FormStep>;
```

Now we have ready step component's propTypes let's type `FirstStep`:

### ~~_src/components/multistepform/firstStep.jsx_~~ → _src/components/multistepform/firstStep.tsx_

```diff
- import React from 'react';
+ import * as React from 'react';
  import { Input, Button } from '../../common';
- import { FormStepPropTypes } from './common';
+ import { FormStep } from './common';

- export const FirstStep = (props) => (
+ export const FirstStep: React.StatelessComponent<FormStep> = (props) => (
    ...
  );

- FirstStep.propTypes = FormStepPropTypes;
```

Since `FirstStep` is using `Input` let's refactor it too:

### ~~_src/components/common/input.jsx_~~ → _src/components/common/input.tsx_

```diff
- import React from 'react';
+ import * as React from 'react';
- import PropTypes from 'prop-types';
- import styles from './input.scss';
+ const styles: any = require('./input.scss');
+
+ interface Props {
+   value: string | number;
+   onChange(field: string, value: any);
+   label: string;
+   id: string;
+   name: string;
+   type?: string;
+ }

- export const Input = (props) => (
+ export const Input: React.StatelessComponent<Props> = (props) => (
    ...
  );

-  Input.propTypes = {
-    value: PropTypes.oneOfType([
-      PropTypes.string,
-      PropTypes.number,
-    ]).isRequired,
-    onChange: PropTypes.func.isRequired,
-    label: PropTypes.string.isRequired,
-    id: PropTypes.string.isRequired,
-    name: PropTypes.string.isRequired,
-    type: PropTypes.string,
-  }

  Input.defaultProps = {
    type: 'text',
  };

- const onChange = (props) => ({ target: { value, name } }) => {
+ const onChange = (props: Props) => ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(name, value);
  };
```

It's `SecondStep` component's turn to refactor:

### ~~_src/components/multistepform/secondStep.jsx_~~ → _src/components/multistepform/secondStep.tsx_

```diff
- import React from 'react';
+ import * as React from 'react';
  import { Input } from '../../common';
- import { FormStepPropTypes } from './common';
+ import { FormStep } from './common';

- export const SecondStep = (props) => (
+ export const SecondStep: React.StatelessComponent<FormStep> = (props) => (
    ...
  );

- SecondStep.propTypes = FormStepPropTypes;
```

Next we'll refactor `ThirdStep` component:

### ~~_src/components/multistepform/thirdStep.jsx_~~ → _src/components/multistepform/thirdStep.tsx_

```diff
- import React from 'react';
+ import * as React from 'react';
  import { Input, Checkbox } from '../../common';
- import { FormStepPropTypes } from './common';
+ import { FormStep } from './common';
- import styles from './stepStyles.scss';
+ const styles: any = require('./stepStyles.scss');

- export const ThirdStep = (props) => (
+ export const ThirdStep: React.StatelessComponent<FormStep> = (props) => (
    ...
  );

- ThirdStep.propTypes = FormStepPropTypes;
```

Since `ThirdStep` component is using `Checkbox` let's refactor it:

### ~~_src/components/common/checkbox.jsx_~~ → _src/components/common/checkbox.tsx_

```diff
- import React from 'react';
+ import * as React from 'react';
- import PropTypes from 'prop-types';
+ import styles from './checkbox.scss';
+
+  interface Props {
+    id: string;
+    name: string;
+    checked: boolean;
+    onChange(field: string, value: any): void;
+  }

- export const Checkbox = (props) => (
+ export const Checkbox: React.StatelessComponent<Props> = (props) => (
    ...
  );

-  Checkbox.propTypes = {
-    id: PropTypes.string.isRequired,
-    name: PropTypes.string.isRequired,
-    checked: PropTypes.bool.isRequired,
-    onChange: PropTypes.func.isRequired,
-  }

- const onChange = (props) => ({ target: { name, checked } }) => {
+ const onChange = (props: Props) => ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(name, checked);
  };
```

Now we have all components refactored to TypeScript. Our remaining task it's to refactor all `index.js` to `index.ts`:

- ~~_src/components/common/index.js_~~ → _src/components/common/index.ts_
- ~~_src/components/index.js_~~ → _src/components/index.ts_
- ~~_src/components/multistepform/index.js_~~ → _src/components/multistepform/index.ts_
- ~~_src/components/multistepform/steps/index.js_~~ → _src/components/multistepform/steps/index.ts_

Finally let's make two refactors to improve typechecking.

First we'll refactor the `value: any` from `onChangeField` method in `app.tsx` to a better type. Let's create a common `Value` entity with type `string | number | boolean`:

### _src/entities.ts_

```diff
+ export type Value = string | number | boolean;
+
  export interface SignupData {
    ...
  }
```

Next use it in `app.tsx`, `checkbox.tsx`, `input.tsx` and `common.ts`:

### _src/app.tsx_

```diff
  import * as React from 'react';
  import { MultiStepForm, FirstStep, SecondStep, ThirdStep } from './components';
- import { SignupData } from './entities';
+ import { Value, SignupData } from './entities';
  const styles: any = require('./app.scss');

  ...

-   onChangeField = (field: string, value: any) => {
+   onChangeField = (field: string, value: Value) => {
      ...
    }
```

### _src/components/common/input.tsx_

```diff
  import * as React from 'react';
+ import { Value } from '../../entities';
  const styles: any = require('./input.scss');

  interface Props {
    value: string | number;
-   onChange(field: string, value: any): void;
+   onChange(field: string, value: Value): void;
    label: string;
    id: string;
    name: string;
    type?: string;
  }
```

### _src/components/common/checkbox.tsx_

```diff
  import * as React from 'react';
+ import { Value } from '../../entities';
  const styles: any = require('./checkbox.scss');

  interface Props {
    id: string;
    name: string;
    checked: boolean;
-   onChange(field: string, value: any): void;
+   onChange(field: string, value: Value): void;
  }
```

### _src/components/multistepform/steps/common.tsx_

```diff
- import { SignupData } from '../../../entities';
+ import { Value, SignupData } from '../../../entities';
  import { SignupData } from '../../../entities';

  export interface FormStep {
    title: string;
    formData: SignupData;
-   onChangeField(field: string, value: any): void;
    onChangeField(field: string, value: Value): void;
  }
```

Last but not less important, we can remove some babel plugins and presets like `babel-preset-react`, `babel-preset-stage-*` and `babel-plugin-transform-class-properties` (even `babel-loader` if you're using `awesome-typescript-loader`) if you use it because `tsc` (TypeScript) compiler will be take care of it.

## **(Optional)**

If you look carefully at `Input` and `Checkbox` onChange method, we're using the `name` as `field`. What if we make a typo there? We can type it using `keyof SignupData` **taking the assumption those common components are tightly linked to `App` state**:

### _src/app.tsx_

```diff
- onChangeField = (field: string, value: Value) => {
+ onChangeField = (field: keyof SignupData, value: Value) => {
```

### _src/components/multistepform/steps/common.ts

```diff
  export interface FormStep {
    title: string;
    formData: SignupData;
-   onChangeField(field: string, value: Value): void;
+   onChangeField(field: keyof SignupData, value: Value): void;
  }
```

### _src/components/common/input.tsx

```diff
  import * as React from 'react';
- import { Value } from '../../entities';
+ import { Value, SignupData } from '../../entities';
  const styles: any = require('./input.scss');

  interface Props {
    value: string | number;
-   onChange(field: string, value: Value): void;
+   onChange(field: keyof SignupData, value: Value): void;
    label: string;
    id: string;
    name: keyof SignupData;
    type?: string;
  }

  ...

  const onChange = (props: Props) => ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
-   props.onChange(name, value);
+   props.onChange(name as keyof SignupData, value);
};
```

### _src/components/common/checkbox.tsx

```diff
  import * as React from 'react';
- import { Value } from '../../entities';
+ import { Value, SignupData } from '../../entities';
  const styles: any = require('./checkbox.scss');

  interface Props {
    id: string;
    name: keyof SignupData;
    checked: boolean;
-   onChange(field: string, value: Value): void;
+   onChange(field: keyof SignupData, value: Value): void;
  }

  ...

  const onChange = (props: Props) => ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
-   props.onChange(name, checked);
    props.onChange(name as keyof SignupData, checked);
  };
```

Now if we try to pass a `name="confirm-password"` instead of `name="confirmPassword" in `FirstStep` component we get an error.

---

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
