import React from 'react';
import { debounce } from 'lodash';
import { IFormField } from '@test-workspace/model';
import { FormInputType } from '@test-workspace/common';
import './input.scss';

/* eslint-disable-next-line */
export interface IInputProps {
  options: IFormField;
  valid: boolean;
  errorMessage?: string;
  input?: FormInputType;
  //onClick: () => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChangeComplete: (id: string, input: FormInputType) => void;
}

interface IState {
  input: FormInputType;
}

export class ControlledInput extends React.Component<IInputProps, IState> {
  constructor(props: IInputProps) {
    super(props);
    this.state = { input: props.input };

    this._onChange = this._onChange.bind(this);
    this._onChangeComplete = debounce(this._onChangeComplete.bind(this), 500);
  }

  async _onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    await this.setState(() => ({ input }));
    this._onChangeComplete();
  }

  _onChangeComplete() {
    this.props.onChangeComplete(this.props.options.id, this.state.input);
  }

  render() {
    const opt: IFormField = this.props.options;
    const cn = `${this.props.valid ? 'valid' : 'error'}`;
    const errorMessage = this.props.errorMessage;

    return (
      <div>
        <input
          className={cn}
          type={opt.type}
          id={opt.id}
          name={opt.id}
          placeholder={opt.placeholder}
          required={opt.options.required ? true : false}
          value={this.state.input}
          aria-required={opt.options.required ? true : false}
          aria-invalid={!this.props.valid ? true : false}
          onChange={this._onChange}
          onBlur={this.props.onBlur}
          //onClick={this.props.onClick}
        />
        {errorMessage && (
          <label id={`${opt.id}-error`} className="error" htmlFor={opt.id}>
            {errorMessage}
          </label>
        )}
      </div>
    );
  }
}
