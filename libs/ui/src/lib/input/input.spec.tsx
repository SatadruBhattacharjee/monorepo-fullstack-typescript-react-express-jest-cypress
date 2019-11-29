import React from 'react';
import { render } from '@testing-library/react';
import { IFormField } from '@test-workspace/model';

import { ControlledInput, IInputProps } from './input';

describe(' Input', () => {
  const mockFormField: IFormField = {
    label: 'Limit (£)',
    id: 'limit',
    placeholder: 'Card Limit (£)',
    type: 'number',
    options: {
      required: true,
      type: 'cardLimit'
    }
  };

  const mockInputProps: IInputProps = {
    options: mockFormField,
    valid: true,
    input: '20',
    onBlur: () => {
      return;
    },
    onChangeComplete: (id: string, input: '20') => {
      return;
    }
  };

  it('should render successfully', () => {
    const { baseElement } = render(<ControlledInput {...mockInputProps} />);
    expect(baseElement).toBeTruthy();
  });
});
