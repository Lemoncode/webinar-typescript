import { Value, SignupData } from '../../../entities';

export interface FormStep {
  title: string;
  formData: SignupData;
  onChangeField(field: keyof SignupData, value: Value): void;
}
