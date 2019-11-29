import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { Table } from './table';

export default { title: 'Table' };

const mockTableDate = [
  {
    name: 'satadru',
    number: 1234567890,
    limit: 100,
    balance: 10
  }
];

export const table = () => <Table data={mockTableDate} />;
