import * as React from 'react';
import styled from 'styled-components';
import { MdArrowDropDown } from 'react-icons/md';

const RefSectionBlock = styled.div`
  cursor: pointer;
  background: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  width: 10rem;
  height: 3rem;
  display: flex;
  align-items: center;
  text-align: left;
  .text {
    font-size: 0.875rem;
    text-indent: 1rem;
    flex-basis: 80%;
    color: black;
  }

  svg {
    display: flex;
    justify-content: flex-end;
    font-size: 1.5rem;
    margin-left: 0.25rem;
    color: gray;
    transition: 0.125s all ease-in;
  }
  justify-content: flex-end;
  align-items: center;
  &:hover {
    img {
      box-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
    }
    svg {
      color: gray;
    }
  }
`;
export interface RefSectionProps {
  status: number;
  onClick: () => void;
}

const RefSection: React.FC<RefSectionProps> = ({ onClick, status }) => {
  return (
    <RefSectionBlock onClick={onClick}>
      <div className="text">{status === 0 ? '참조선택' : ` ${status}`}</div>
      <MdArrowDropDown />
    </RefSectionBlock>
  );
};

export default RefSection;
