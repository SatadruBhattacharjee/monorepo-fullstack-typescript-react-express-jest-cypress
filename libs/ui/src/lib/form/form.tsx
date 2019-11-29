import React, { Component } from 'react';
import { ControlledInput } from './../input/input';
import { ICreditCard, IFormField } from '@test-workspace/model';
import { ICreditCardValidation } from '@test-workspace/model';
import { CreditCardValidator } from '@test-workspace/common';
import { FormInputType } from '@test-workspace/common';
import './form.scss';

const creditCardValidator: CreditCardValidator = new CreditCardValidator();
const success: ICreditCardValidation = { valid: true };

function validate(
  value: FormInputType,
  options: IFormField
): ICreditCardValidation {
  if (options.type === 'cardName')
    return creditCardValidator.validateCardName(value);
  if (options.type === 'cardNumber')
    return creditCardValidator.validateCardNumber(parseInt(value));
  if (options.type === 'cardLimit')
    return creditCardValidator.validateCardLimit(parseInt(value));

  return success;
}

export interface ICardFormProps {
  fields: IFormField[];
  submitText: string;
  onFormSubmit: (card: ICreditCard) => void;
}

interface IState {}

export class CardForm extends Component<ICardFormProps, IState> {
  constructor(props: ICardFormProps) {
    super(props);
    this.state = {};

    this._onChangeComplete = this._onChangeComplete.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._resetValidation = this._resetValidation.bind(this);
    this._submit = this._submit.bind(this);
    props.fields.map(n => {
      this.state[n.id] = { value: '', valid: true, options: n.options };
    });
  }

  _validateInput(
    value: FormInputType,
    options: IFormField
  ): ICreditCardValidation {
    const cardValidation: ICreditCardValidation = validate(value, options);
    return cardValidation;
  }

  _validateCard(): boolean {
    // loop through all keys
    const keys = Object.keys(this.state);
    const valid = keys.reduce((memo, n) => {
      if (!memo) return memo;
      if (!this.state[n].valid) memo = false;
      return memo;
    }, true);

    return valid;
  }

  _onChangeComplete(id: string, value: FormInputType) {
    const cardValidation: ICreditCardValidation = this._validateInput(
      value,
      this.state[id].options
    );
    this._validateCard();

    this.setState(state => {
      state[id].value = value;
      state[id].valid = cardValidation.valid;
      state[id].errorMessage = cardValidation.reason;
      return state;
    });
  }

  async _onBlur(e: React.FocusEvent<HTMLInputElement>) {
    //console.log(e.target.id, e.target.value);
    const { id, value } = e.target;
    const cardValidation: ICreditCardValidation = this._validateInput(
      value,
      this.state[id].options
    );
    this._validateCard();

    await this.setState(state => {
      state[id].valid = cardValidation.valid;
      state[id].errorMessage = cardValidation.reason;
      return state;
    });
  }

  async _resetValidation(e) {
    const { id } = e.target;

    await this.setState(state => {
      state[id].valid = true;
      return state;
    });
  }

  _submit(e) {
    e.preventDefault();
    // loop through all keys
    const keys = Object.keys(this.state);
    const card: ICreditCard = {} as ICreditCard;

    keys.forEach(key => (card[key] = this.state[key].value));
    this.props.onFormSubmit(card);
  }

  render() {
    const submitDisabled: boolean = this._validateCard();
    return (
      <div>
        <h2>Credit Card System</h2>
        <form noValidate>
          {this.props.fields.map(n => (
            <div key={n.id} className="form-row">
              <label htmlFor={n.id}>{n.label}</label>
              <ControlledInput
                options={n}
                input={this.state[n.id].value}
                valid={this.state[n.id].valid}
                errorMessage={this.state[n.id].errorMessage}
                onBlur={this._onBlur}
                //onClick={this._resetValidation}
                onChangeComplete={this._onChangeComplete}
              />
            </div>
          ))}

          <button
            type="submit"
            onClick={this._submit}
            disabled={!submitDisabled}
          >
            {this.props.submitText}
          </button>
        </form>
      </div>
    );
  }
}
