import React from 'react';
import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a Credit Card System as the title', () => {
    const { getByText } = render(<App />);

    expect(getByText('Credit Card System')).toBeTruthy();
  });
});
