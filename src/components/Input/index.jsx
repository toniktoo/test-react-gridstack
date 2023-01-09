import React from 'react';
import { Input, InputNumber } from 'antd';

export const AppInput = ({ isNumber = false }) => {
  return isNumber ? <InputNumber /> : <Input />;
};
