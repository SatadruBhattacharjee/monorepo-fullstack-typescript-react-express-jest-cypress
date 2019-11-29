import React from 'react';
import { render } from '@testing-library/react';

import { Status, IStatusProps } from './status';

const mockStatusProps: IStatusProps = {
  type: 'error',
  message: 'error'
};

describe(' Status', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Status {...mockStatusProps} />);
    expect(baseElement).toBeTruthy();
  });
});
