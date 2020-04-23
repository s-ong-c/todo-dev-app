import * as React from 'react';
import styled from 'styled-components';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

const NavigateButtonGroup = styled.div`
  display: flex;
  margin-left: 1.125rem;
`;

const NavigateButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: black;
  background: white;
  padding: 0;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
  & + & {
    margin-left: 0.375rem;
  }
  &:disabled {
    cursor: default;
    background: gray;
    color: white;
  }
`;
const PaginationBlock = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  .page-number {
    font-size: 0.875rem;
  }
`;
export interface PaginationProps {
  page: number;
  totalCount: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalCount,
}) => {
  const Prev = () => {
    setPage(page - 1);
  };

  const Next = () => {
    setPage(page + 1);
  };
  console.log(Math.ceil(totalCount / 5));
  return (
    <PaginationBlock>
      <div className="page-number">
        {page}/{Math.ceil(totalCount / 5)}
      </div>
      <NavigateButtonGroup>
        <NavigateButton disabled={page === 1} onClick={Prev}>
          <MdChevronLeft />
        </NavigateButton>
        <NavigateButton
          disabled={page === Math.ceil(totalCount / 5)}
          onClick={Next}
        >
          <MdChevronRight />
        </NavigateButton>
      </NavigateButtonGroup>
    </PaginationBlock>
  );
};

export default Pagination;
