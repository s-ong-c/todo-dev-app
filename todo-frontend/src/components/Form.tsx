import * as React from 'react';
import styled from 'styled-components';

const FormBlock = styled.div`
  z-index: 40;
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
interface FormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  value: string;
  refNum: number;
}

const Form: React.FC<FormProps> = ({ onChange, onSubmit, value, children }) => {
  return (
    <FormBlock>
      <input onChange={onChange} value={value} placeholder="TODO LIST APP" />
      {children}
      <button onClick={onSubmit}>Submit</button>
    </FormBlock>
  );
};

export default Form;
