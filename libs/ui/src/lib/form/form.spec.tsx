import React from 'react';
import { render } from '@testing-library/react';
import { ICreditCard, IFormField } from '@test-workspace/model';
import { CardForm, ICardFormProps } from './form';

describe(' Form', () => {
  const mockCardFields: IFormField[] = [
    {
      label: 'Name',
      id: 'name',
      placeholder: 'Name on Card',
      type: 'text',
      options: {
        required: true,
        type: 'cardName'
      }
    }
  ];
  const mockFromProps: ICardFormProps = {
    fields: mockCardFields,
    submitText: 'OK',
    onFormSubmit: () => {
      return;
    }
  };

  it('should render successfully', () => {
    const { baseElement } = render(<CardForm {...mockFromProps} />);
    expect(baseElement).toBeTruthy();
  });
});
