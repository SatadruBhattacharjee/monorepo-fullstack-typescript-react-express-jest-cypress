import React from 'react';
import { render } from '@testing-library/react';
import { ICreditCard } from '@test-workspace/model';
import { Table, TableProps } from './table';

describe(' Table', () => {
  const mockCreditCards: ICreditCard[] = [
    {
      name: 'satadru',
      number: 1234567890,
      limit: 100,
      balance: 10
    }
  ];

  it('should render successfully', () => {
    const { baseElement } = render(<Table data={mockCreditCards} />);
    expect(baseElement).toBeTruthy();
  });
});
