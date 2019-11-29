export interface ICreditCard {
  name: string;
  number: number;
  limit: number;
  balance?: number;
}

export interface ICreditCardValidation {
  valid: boolean;
  reason?: string;
}

export interface IFormField {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  options: IFormValidationOptions;
}

export interface IFormValidationOptions {
  type: string;
  required?: boolean;
}
