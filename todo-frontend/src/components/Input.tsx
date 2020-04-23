import * as React from 'react';
import styled from 'styled-components';
import { useInputValidate } from '../lib/hooks/useInputValidate';
const InputBlock = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: space-between;
  input {
    transition: all 0.125s ease-in;
    font-size: 0.875rem;
    flex: 1;
    display: block;
    line-height: 1rem;
    height: 3rem;
    padding: 0;
    border: none;
    outline: 0;
    text-indent: 1rem;
    border: 1px solid #dee2e6;
    min-width: 0;
  }
  /* input {
    outline: none;
    border: none;
    flex: 1;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border: 1px solid #dee2e6;
  } */
  button {
    background: #20c997;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    border: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 5rem;
    height: 3rem;
    cursor: pointer;
    &:hover,
    &:focus {
      background: #6147ad;
    }
  }
`;
interface InputProps {}

const Input: React.FC<InputProps> = props => {
  const [val, setVal, isError, isEmpty] = useInputValidate();

  const onChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setVal(target.value);
  };

  const onClickSubmit = () => {
    if (isEmpty || isError) {
      return;
    }
    console.log('aaaa');
    setVal('');
  };

  return (
    <InputBlock>
      <input onChange={onChangeInput} value={val} placeholder="TODO LIST APP" />
      <input
        className="add-reference"
        placeholder="참조ID"
        type="number"
        min="1"
        value={1}
        onChange={() => {}}
      />
      <button onClick={onClickSubmit}>Submit</button>
    </InputBlock>
  );
};

export default Input;
