import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { Status, IStatusProps } from './status';

export default { title: 'Status' };

export const error = () => <Status type="error" message="error" />;
export const success = () => <Status type="success" message="success" />;
export const info = () => <Status type="info" message="info" />;
export const warning = () => <Status type="warning" message="warning" />;
