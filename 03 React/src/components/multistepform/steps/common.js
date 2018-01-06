import PropTypes from 'prop-types';
import { SignupDataType } from '../../../entities';

export const FormStepPropTypes = {
  title: PropTypes.string.isRequired,
  formData: SignupDataType,
  onChangeField: PropTypes.func.isRequired,
};
