import React from 'react';
import './table.scss';
import { ICreditCard } from '@test-workspace/model';

/* eslint-disable-next-line */
export interface TableProps {
  data: ICreditCard[];
}

export class Table extends React.Component<TableProps> {
  constructor(props: TableProps) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  getKeys = () => {
    return (
      (this.props && this.props.data && Object.keys(this.props.data[0])) || []
    );
  };

  getHeader = () => {
    const keys = this.getKeys();
    return keys.map((key: string, index: number) => {
      return <th key={key}>{key.toUpperCase()}</th>;
    });
  };

  getRowsData = () => {
    const items = this.props.data;
    const keys = this.getKeys();
    return items.map((row: string, index: number) => {
      return (
        <tr key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="table-wrapper">
        <h2>Existing Cards</h2>
        <table>
          <thead>
            <tr>{this.props.data && this.getHeader()}</tr>
          </thead>
          <tbody>{this.props.data && this.getRowsData()}</tbody>
        </table>
      </div>
    );
  }
}

const RenderRow = props => {
  return props.keys.map((key, index) => {
    const prefix: string = key === 'limit' || key === 'balance' ? '£' : '';
    return (
      <td key={props.data[key]}>
        {prefix}
        {props.data[key]}
      </td>
    );
  });
};
