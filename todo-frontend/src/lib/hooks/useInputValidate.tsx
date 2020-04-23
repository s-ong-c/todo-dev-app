import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { isValidateInput } from '../utils';

export const useInputValidate = (
  intialValue = '',
): [string, Dispatch<SetStateAction<string>>, boolean, boolean] => {
  const [val, setVal] = useState(intialValue);
  const [isError, setError] = useState(false);
  const isEmpty = val.trim() === '';

  useEffect(() => {
    setError(!isValidateInput(val));
  }, [val]);

  return [val, setVal, isError, isEmpty];
};
