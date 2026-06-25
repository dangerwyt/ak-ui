import { isNumber, isString } from 'lodash-es';
import { debugWarn } from './error';

const SCOPE = 'utils/style' as const;

const isStringNumber = (value: string) => {
  if (!isString(value)) {
    return false;
  }
  return !Number.isNaN(Number(value));
};

export function addUtils(value: string | number, defaultUnit = 'px') {
  if (!value) {
    return '';
  }
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  }
  if (isString(value)) {
    return value;
  }
  debugWarn(SCOPE, 'binding value must be a string or number');
}
