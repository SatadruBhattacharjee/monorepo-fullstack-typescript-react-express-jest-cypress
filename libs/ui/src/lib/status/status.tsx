import React from 'react';
import './status.scss';

/* eslint-disable-next-line */
export interface IStatusProps {
  message: string;
  type: string;
}

export const Status = (props: IStatusProps) => {
  return <div className={'box ' + (props.type || '')}>{props.message}</div>;
};
